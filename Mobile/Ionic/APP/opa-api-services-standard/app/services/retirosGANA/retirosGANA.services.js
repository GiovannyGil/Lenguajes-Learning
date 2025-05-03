const nodeCryptojs = require('node-cryptojs-aes');
const sql = require('../../model/mssql');
const { model } = require('../database.services');
const { Encryptarsolodato } = require('../../negocio/Helpers/encrypt');
const { respuestasemail } = require('../../controller/common/functions');

const GANAconsultaAhorrosService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'pa_sucursalMovilSolicitudOrigenAhorros')
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (recordsets[0][0]) {
        if (recordsets[0][0].Mensaje !== null) {
          const { CryptoJS } = nodeCryptojs;
          const cip = recordsets[0][0].Mensaje;
          // console.log('data = ' + cip);
          const eNcrypted = CryptoJS.AES
            .encrypt(cip, 'opaApp')
            .toString();
          //  var datos = CryptoJS.enc.Utf8.stringify(eNcrypted);
          recordsets[0][0].Mensaje = eNcrypted;
        }

        recordsets[0][0].NumeroCuenta = Encryptarsolodato(recordsets[0][0].NumeroCuenta);
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

const GANAMsjService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'PA_CrearSolicitudRetiroAhorros')
    .then(async (recordsets) => {
      if (!recordsets[0]) {
        return { data: recordsets, error: false };
      }

      let respuesta = [];

      if (recordsets[0]) {
        const Respuesta = await respuestasemail(recordsets);

        respuesta = [
          [
            {
              Mensaje: Respuesta[0][0].Mensaje,
              Codigo: Respuesta[0][0].Codigo,
              tipoMensaje: Respuesta[0][0].tipoMensaje,
            },
          ],
        ];
      }
      return { data: respuesta, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

module.exports = {
  GANAconsultaAhorrosService,
  GANAMsjService,
};
