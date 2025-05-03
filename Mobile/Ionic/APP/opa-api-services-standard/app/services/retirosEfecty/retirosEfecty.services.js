const sql = require('../../model/mssql');
const { model } = require('../database.services');

const retirosEfectyService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'pa_crear_codigo')
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (!recordsets[0]) {
        return { data: recordsets, error: false };
      }
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const rangosEfectyService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .consulta('', parameters)
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
  retirosEfectyService,
  rangosEfectyService,
};
