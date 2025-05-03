const sql = require('../../model/mssql');
const { model } = require('../database.services');
const { Encryptarsolodato } = require('../../negocio/Helpers/encrypt');

const parametrosnovedadesService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'pa_mantenimiento_parametros_novedades')
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

const SolicitudNovedad = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'PA_AlmacenarSolicitudesNovedades')
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

module.exports = { parametrosnovedadesService, SolicitudNovedad };
