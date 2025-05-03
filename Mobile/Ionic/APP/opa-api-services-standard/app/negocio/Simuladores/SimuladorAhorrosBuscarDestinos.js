const { IntegradorFactory } = require('../Integrador');

const index = async () => {
  // create factory
  const integradorFactory = IntegradorFactory.create();
  try {
    return await integradorFactory.SimuladorAhorrosBuscarDestinos();
  } catch (error) {
    return error;
  }
};

module.exports = index;
