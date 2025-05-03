const moment = require('moment');
const { IntegradorFactory } = require('../Integrador');

const index = async (body) => {
  // create factory
  const integradorFactory = IntegradorFactory.create();
  integradorFactory.tipo = 'NC';
  integradorFactory.fechaDesde = moment(body.FechaInicial).format('DD/MM/YYYY');
  integradorFactory.fechaHasta = moment(body.FechaFinal).format('DD/MM/YYYY');
  integradorFactory.idProducto = 374;
  integradorFactory.body = body;
  try {
    return await integradorFactory.SeguimientoNovedades();
  } catch (error) {
    return error;
  }
};

module.exports = index;
