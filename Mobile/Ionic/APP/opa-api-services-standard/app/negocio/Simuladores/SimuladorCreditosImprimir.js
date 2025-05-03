const fs = require('fs');
const {
  makePdf, base64Encode, numberFormat, numberFormatString,
} = require('../Helpers/PDFHtmlGenerator');

const SimuladorCreditosPDF = ({
  encabezado,
  planDePagos,
  costos,
  NombresCostos,
  paraimpresion,
  logo,
}) => {
  const html = fs.readFileSync(`${process.cwd()}/app/negocio/vistas/plantillas/simuladores/creditos.html`, 'utf8');
  const logoBase64 = base64Encode(logo);

  const encabezadosFormat = {
    SaldoCapital: numberFormat(encabezado.SaldoCapital),
    Cuota: numberFormat(encabezado.Cuota),
    TasaPeriodica: numberFormat(encabezado.TasaPeriodica),
    TotalInteresCorriente: numberFormat(encabezado.TotalInteresCorriente),
  };

  const planDePagosFormat = planDePagos.map((item) => ({
    ...item,
    CUOTA: numberFormat(item.CUOTA),
    ABONOCAPITAL: numberFormat(item.ABONOCAPITAL),
    ABONOINTERES: numberFormat(item.ABONOINTERES),
    TOTALINTERES: numberFormat(item.TOTALINTERES),
    TOTALCAPITAL: numberFormatString(item.TOTALCAPITAL),
  }));

  const costosTotales = [];
  for (let i = 0; i < 8; i += 1) {
    costosTotales.push({ nombre: NombresCostos[i] ? NombresCostos[i].Nombre : '' });
  }

  return makePdf({
    ...encabezado,
    ...paraimpresion,
    ...encabezadosFormat,
    planDePagos: planDePagosFormat,
    costos,
    costosTotales,
    logoBase64,
  }, undefined, undefined, html);
};

module.exports = SimuladorCreditosPDF;
