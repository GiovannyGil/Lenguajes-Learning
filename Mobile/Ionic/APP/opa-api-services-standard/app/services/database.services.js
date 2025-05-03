const { IntegradorFactory } = require('../negocio/Integrador');
const sql = require('../model/mssql');

const database = sql.connect().then((model) => {
  const integradorFactory = IntegradorFactory.create();
  integradorFactory.db = model;
  return model;
});

module.exports = {
  model: database,
};
