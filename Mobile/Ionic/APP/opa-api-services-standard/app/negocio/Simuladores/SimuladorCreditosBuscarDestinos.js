const { IntegradorFactory } = require('../Integrador');

const index = async (body) => {
  // create factory
  const integradorFactory = IntegradorFactory.create();
  integradorFactory.body = body;
  try {
    return await integradorFactory.SimuladorCreditosBuscarDestinos();
  } catch (error) {
    return error;
  }
};

module.exports = index;
