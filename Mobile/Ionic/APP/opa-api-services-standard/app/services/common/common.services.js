const sql = require('../../model/mssql');
const { model } = require('../database.services');

const makesimplequeryService = async (parameters, cadena) => {
  const model1 = await model;
  const data = await model1
    .consulta(parameters, cadena)
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const makespService = async (parameters, spname) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, spname)
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

module.exports = {
  makesimplequeryService, makespService,
};
