const { IntegradorFactory } = require('../Integrador');

const index = async (body) => {
  // create factory
  const integradorFactory = IntegradorFactory.create();
  integradorFactory.id = body.id;
  integradorFactory.body = body;
  try {
    return await integradorFactory.estadoCuentas();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return error;
  }
};

module.exports = index;
