const { model } = require('../database.services');
const sql = require('../../model/mssql');
const { Encryptarsolodato } = require('../../negocio/Helpers/encrypt');

const sedesVacacionalesService = async () => {
  const model1 = await model;
  const data = await model1
    .SP('', 'pa_sedesVacacionales')
    .then((recordsetsllega) => ({ data: recordsetsllega, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify({}, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const traerAuxiliosService = async () => {
  const model1 = await model;
  const data = await model1
    .SP('', 'CONSULTARAUXILIOS_app')
    .then((recordsetsllega) => ({ data: recordsetsllega, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify({}, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const solicitudSegurosService = async (consulta, parameters) => {
  const model1 = await model;
  const data = await model1
    .consulta(parameters, consulta)
    .then((recordsetsllega) => ({ data: recordsetsllega, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const modificasegurosService = async (consulta, parameters) => {
  const model1 = await model;
  const data = await model1
    .consulta(parameters, consulta)
    .then((dataR) => {
      if (dataR[0].length > 0) {
        return { data: dataR, error: false };
      }
      const mensaje = 'el seguro no posee polizas, puede realizar su solicitud ingresando los datos en pantalla';

      const mensaje1 = Encryptarsolodato(mensaje);

      return {
        data: [[{
          Codigo: '000',
          Mensaje: mensaje1,
          tipoMensaje: 'I',
        }]],
        error: false,
      };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const pagoNominaService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .consulta('', parameters)
    .then((recordsetsllega) => ({ data: recordsetsllega, error: false }))
    .catch((err) => {
      const datatiempo = [
        [
          {
            Mensaje: 'Error no se pudo realizar el proceso verifique con el administrador...',
            Codigo: '999',
            tipoMensaje: 'E',
          },
        ],
      ];

      datatiempo[0][0].Mensaje = Encryptarsolodato(datatiempo[0][0].Mensaje);
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: datatiempo, error: true };
    });
  return data;
};

module.exports = {
  sedesVacacionalesService,
  traerAuxiliosService,
  solicitudSegurosService,
  modificasegurosService,
  pagoNominaService,
};
