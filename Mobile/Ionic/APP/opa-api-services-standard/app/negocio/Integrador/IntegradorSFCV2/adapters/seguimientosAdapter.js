const SeguimientoAhorroBase = require('../../interfaces/productos/SeguimientoAhorroBase');
const SeguimientoCreditoBase = require('../../interfaces/productos/SeguimientoCreditoBase');
const SeguimientoNovedadBase = require('../../interfaces/productos/SeguimientoNovedadBase');

// tranform seguimientos
const seguimientoAhorrosAdapter = (sAhorros) => {
  const seguimientosAhorrosResult = [];

  sAhorros.map((item) => {
    const newSeguimientoItem = new SeguimientoAhorroBase();
    newSeguimientoItem.Mensaje = '';
    newSeguimientoItem.Codigo = '';
    newSeguimientoItem.fechaTrabajo = item.Fecha.split('/').reverse().join('/');
    newSeguimientoItem.fechaTrabajo2 = '';
    newSeguimientoItem.ValorTransaccion = item.Valor;
    newSeguimientoItem.Naturaleza = item.Naturaleza;
    newSeguimientoItem.positivo = item.positivo;
    newSeguimientoItem.Documento = item.Documento;
    newSeguimientoItem.Numero = item.numero;
    newSeguimientoItem.npaginas = item.npaginas;
    newSeguimientoItem.fechai = '';
    newSeguimientoItem.fechaf = '';

    seguimientosAhorrosResult.push(newSeguimientoItem);
    return item;
  });

  return seguimientosAhorrosResult;
};

const seguimientoCreditosAdapter = (sCreditos) => {
  const seguimientosCreditosResult = [];

  sCreditos[0].map((item) => {
    const newSeguimientoItem = new SeguimientoCreditoBase();
    newSeguimientoItem.Mensaje = '';
    newSeguimientoItem.Codigo = '';
    newSeguimientoItem.fechaTrabajo = item.Fecha.split('/').reverse().join('/');
    newSeguimientoItem.ValorTransaccion = item.Valor;
    newSeguimientoItem.Documento = item.Documento;
    newSeguimientoItem.AbonoCosto = '';
    newSeguimientoItem.InterésMora = '';
    newSeguimientoItem.AbonoInterés = '';
    newSeguimientoItem.AbonoCapital = '';
    newSeguimientoItem.ConsignacionTotal = '';
    newSeguimientoItem.Numero = item.Numero;
    newSeguimientoItem.npaginas = '';
    newSeguimientoItem.esrotativo = '';

    seguimientosCreditosResult.push(newSeguimientoItem);
    return item;
  });
  return seguimientosCreditosResult;
};

const seguimientoNovedadAdapter = (sNovedades) => {
  const seguimientosNovedadResult = [];
  sNovedades.map((item) => {
    const newSeguimientoNov = new SeguimientoNovedadBase();
    newSeguimientoNov.cedulasociado = '';
    newSeguimientoNov.codnovedad = item.codigoConcepto;
    newSeguimientoNov.valor = Number(item.Valor.split('.').join('').replace(',', '.'));
    newSeguimientoNov.agenciatransaccion = '';
    newSeguimientoNov.fechapago = item.Fecha.split('/').reverse().join('/');
    newSeguimientoNov.recibopago = '';
    newSeguimientoNov.documento = item.Documento;
    newSeguimientoNov.naturaleza = item.Naturaleza;
    newSeguimientoNov.operador = '';
    newSeguimientoNov.Numero = '';
    newSeguimientoNov.npaginas = '';
    newSeguimientoNov.positivo = '';

    seguimientosNovedadResult.push(newSeguimientoNov);
    return item;
  });
  return seguimientosNovedadResult;
};

module.exports = {
  seguimientoAhorrosAdapter,
  seguimientoCreditosAdapter,
  seguimientoNovedadAdapter,
};
