const { IntegradorFactory } = require('../Integrador');

const index = async (body) => {
  // create factory
  const integradorFactory = IntegradorFactory.create();
  integradorFactory.creditosDestinosId = body.CodDestino;
  try {
    return await integradorFactory.SimuladorCreditosBuscarPeriodicidad();
  } catch (error) {
    return error;
  }
};

module.exports = index;
