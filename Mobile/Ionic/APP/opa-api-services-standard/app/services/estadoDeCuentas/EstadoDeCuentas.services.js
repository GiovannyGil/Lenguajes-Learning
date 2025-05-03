const { model } = require('../database.services');
const { Encryptarsolodato } = require('../../negocio/Helpers/encrypt');
const sql = require('../../model/mssql');

const estadoCuentasService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'pa_estadocuentasMovil')
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (recordsets[0][0]) {
        recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
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

const seguimientoAhorroService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'pa_seguimientoahorrosmovil')
    .then((recordsetsllega) => ({ data: recordsetsllega, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const seguimientoCreditoService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'Pa_seguimientocredito')
    .then((recordsetsllega) => ({ data: recordsetsllega, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const seguimientoNovedadService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'pa_SeguimientoNovedades')
    .then((recordsetsllega) => ({ data: recordsetsllega, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

module.exports = {
  seguimientoAhorroService,
  seguimientoCreditoService,
  seguimientoNovedadService,
  estadoCuentasService,
};
