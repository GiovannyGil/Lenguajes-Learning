const { IntegradorFactory } = require('../Integrador');

const index = async () => {
  // create factory
  const integradorFactory = IntegradorFactory.create();
  try {
    return await integradorFactory.SimuladorCreditosBuscarLineas();
  } catch (error) {
    return error;
  }
};

module.exports = index;
