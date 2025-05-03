const fs = require('fs');
const moment = require('moment');
const { makePdf, base64Encode, numberFormat } = require('../../Helpers/PDFHtmlGenerator');

const decimalSeparator = '.';
const mileansSeparator = ',';

const EstadoDeCuentasPDF = ({
  data,
  asociado,
  logo,
}) => {
  const html = fs.readFileSync(`${process.cwd()}/app/negocio/vistas/plantillas/estadoDeCuentas.html`, 'utf8');
  const logoBase64 = base64Encode(logo);

  const totalesAhorros = { cuota: 0, saldo: 0, interes: 0 };
  const totalesCreditos = { cuota: 0, saldo: 0 };
  const totalesNovedades = { cuota: 0, saldo: 0 };

  const formatAhorros = data.AHORRO.map((ahorroBase) => {
    const ahorro = ahorroBase;
    ahorro.FechaAperturaCuenta = moment.utc(ahorro.FechaAperturaCuenta).format('YYYY/MM/DD');
    ahorro.FechaVenceCuenta = moment.utc(ahorro.FechaVenceCuenta).format('YYYY/MM/DD');

    ahorro.FechaAperturaCuenta = ahorro.FechaAperturaCuenta === '1900/01/01' ? '----' : ahorro.FechaAperturaCuenta;
    ahorro.FechaVenceCuenta = ahorro.FechaVenceCuenta === '1900/01/01' ? '----' : ahorro.FechaVenceCuenta;

    totalesAhorros.cuota += Number(ahorro.ValorCuotaAhorro.replace(/,/g, '') || 0);
    totalesAhorros.saldo += Number(ahorro.SaldoTotalCuenta.replace(/,/g, '') || 0);
    totalesAhorros.interes += Number(ahorro.InteresDisponibleCuenta.replace(/,/g, '') || 0);

    return ahorro;
  });

  const formatCreditos = data.CREDIT.map((creditoBase) => {
    const credito = creditoBase;
    credito.Fecha = moment.utc(credito.Fecha).format('YYYY/MM/DD');
    credito.FechaVenceCuota = moment.utc(credito.FechaVenceCuota).format('YYYY/MM/DD');

    totalesCreditos.cuota += Number(credito.Anualidad.replace(/,/g, '') || 0);
    totalesCreditos.saldo += Number(credito.SaldoCapital.replace(/,/g, '') || 0);

    return credito;
  });

  const formatNovedades = data.ESTNOV.map((novedad) => {
    totalesNovedades.cuota += Number(novedad.CuotaNovedad.replace(/,/g, '') || 0);
    totalesNovedades.saldo += Number(novedad.SaldoNovedad.replace(/,/g, '') || 0);
    return novedad;
  });

  totalesAhorros.cuota = numberFormat(totalesAhorros.cuota, mileansSeparator, decimalSeparator);
  totalesAhorros.saldo = numberFormat(totalesAhorros.saldo, mileansSeparator, decimalSeparator);
  totalesAhorros.interes = numberFormat(totalesAhorros.interes, mileansSeparator, decimalSeparator);

  totalesCreditos.cuota = numberFormat(totalesCreditos.cuota, mileansSeparator, decimalSeparator);
  totalesCreditos.saldo = numberFormat(totalesCreditos.saldo, mileansSeparator, decimalSeparator);

  totalesNovedades.cuota = numberFormat(totalesNovedades.cuota, mileansSeparator, decimalSeparator);
  totalesNovedades.saldo = numberFormat(totalesNovedades.saldo, mileansSeparator, decimalSeparator);

  return makePdf({
    AHORRO: formatAhorros,
    CREDIT: formatCreditos,
    ESTNOV: formatNovedades,
    totalesAhorros,
    totalesCreditos,
    totalesNovedades,
    asociado,
    logoBase64,
  }, undefined, undefined, html);
};

module.exports = EstadoDeCuentasPDF;
