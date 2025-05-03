const moment = require('moment');
const DescuentosNomina = require('../../interfaces/productos/DescuentosNomina');

function descuentosNominaFechasAdapter(fechas) {
  const fechasResult = [];

  fechas.map((item) => {
    const fechaYMD = moment(item.fechaAsiento, 'YYYY/MM/DD').format('YYYYMMDD');
    fechasResult.push({ '': fechaYMD });
    return item;
  });

  return [fechasResult];
}

function tipoDescuentoV2(tipoV2) {
  switch (tipoV2.trim()) {
    case 'CR':
      return 'CRED';
    case 'AP':
      return 'APOOR';
    case 'PE':
      return 'APER';
    case 'AV':
      return 'AVIST';
    case 'AC':
      return 'ACONT';
    default:
      return '';
  }
}

function descuentosNominaDatosAdapter(descuentos) {
  const resultDescuentosNomina = [];

  descuentos.map((descuento) => {
    const tempDescuento = new DescuentosNomina();

    tempDescuento.n = descuento.linea;
    tempDescuento.cedula = descuento.identificacionCliente;
    tempDescuento.valor = descuento.valorAsentado;
    tempDescuento.codlinea = descuento.codigoLinea;
    tempDescuento.codcuenta = descuento.numeroCuenta;
    tempDescuento.numerocuenta = descuento.numeroCuenta;
    tempDescuento.tiponovedad = tipoDescuentoV2(descuento.tipoProducto);
    tempDescuento.codempresa = descuento.codigoEmpresaPagadora;
    tempDescuento.periodo = 'NaN'; // periodo discriminacion
    tempDescuento.nroperido = descuento.numeroPeriodo;
    tempDescuento.nroperidodeduce = descuento.numeroPeriodo;
    tempDescuento.agencia = descuento.codigoAgencia;
    // tempDescuento.pertenece: string;
    // tempDescuento.coddestino: string;
    // tempDescuento.fechatrabajo: string;
    tempDescuento.fechasistema = moment(descuento.fechaAiento, 'YYYY/MM/DD').format();
    // tempDescuento.documentonota: string;
    // tempDescuento.consecutivonovedad: number;
    // tempDescuento.tipoingreso: string;
    // tempDescuento.interescalculado: number;
    // tempDescuento.abonocapital: number;
    // tempDescuento.valorentidad: number;
    // tempDescuento.formapago: string;
    tempDescuento.valorasentado = descuento.valorAsentado;
    // tempDescuento.idempresasanterior: number;
    // tempDescuento.valorrecibido: number;
    // tempDescuento.documentoreferencia: string;
    tempDescuento.fecharecibopago = moment(descuento.fechaAiento, 'YYYY/MM/DD').format();

    resultDescuentosNomina.push(tempDescuento);
    return descuento;
  });

  return [resultDescuentosNomina];
}

module.exports = {
  descuentosNominaFechasAdapter,
  descuentosNominaDatosAdapter,
};
