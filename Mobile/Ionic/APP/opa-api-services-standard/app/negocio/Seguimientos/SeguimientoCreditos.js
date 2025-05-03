const moment = require('moment');
const { IntegradorFactory } = require('../Integrador');
const funciones = require('../Integrador/IntegradorSFC/funciones');

const index = async (body) => {
  // create factory
  const integradorFactory = IntegradorFactory.create();
  integradorFactory.tipo = 'CR';
  integradorFactory.fechaDesde = moment(body.FechaInicial).format('DD/MM/YYYY');
  integradorFactory.fechaHasta = moment(body.FechaFinal).format('DD/MM/YYYY');
  integradorFactory.idProducto = funciones.DEncryptarsolodato(body.Pagare);
  integradorFactory.body = body;
  try {
    return await integradorFactory.SeguimientoCreditos();
  } catch (error) {
    return error;
  }
};

module.exports = index;
