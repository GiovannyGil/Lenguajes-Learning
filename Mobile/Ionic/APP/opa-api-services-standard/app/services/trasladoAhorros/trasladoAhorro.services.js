const { model } = require('../database.services');
const { Encryptarsolodato } = require('../../negocio/Helpers/encrypt');
const sql = require('../../model/mssql');
const { respuestasemail } = require('../../controller/common/functions');

const destinoAhorroService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'SucursalMovilTrasladoDestinoAhorros')
    .then((recordsets) => {
      const Ahorros = recordsets[0].map((item) => {
        const itemTemp = item;
        itemTemp.Mensaje = Encryptarsolodato(item.Mensaje);
        itemTemp.NumeroCuenta = Encryptarsolodato(item.NumeroCuenta);
        itemTemp.SaldoTotal = Encryptarsolodato(item.SaldoTotal);
        return itemTemp;
      });
      return { data: [Ahorros], error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const MovimientotrasladoahorrosService = async (parameters) => {
  const model1 = await model;
  let dataterror = [];
  const data = await model1
    .SP(parameters, 'PA_MovimientoTrasladoahorros')
    .then(async (recordsets) => {
      if (recordsets[0][0]) {
        const Respuesta = await respuestasemail(recordsets);
        dataterror = [
          [
            {
              Mensaje: Respuesta.data[0][0].Mensaje,
              Codigo: Respuesta.data[0][0].codigo,
              tipoMensaje: Respuesta.data[0][0].tipoMensaje,
              datosEntidad: Encryptarsolodato(Respuesta.data[0][0].datosEntidad),
              messageBody: Encryptarsolodato(Respuesta.data[0][0].messageBody),
            },
          ],
        ];

        return { data: dataterror, error: false };
      }
      dataterror = [
        [
          {
            Mensaje: 'Error al procesar la transaccion porfavor verifique...',
            Codigo: '999',
            tipoMensaje: 'E',
          },
        ],
      ];
      dataterror[0][0].Mensaje = Encryptarsolodato(dataterror[0][0].Mensaje);
      return { data: dataterror, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const InscripcionCuentaTrasladoService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'PA_MatriculaAsociadosTrasladoAV')
    .then((recordsetsllega) => ({ data: recordsetsllega, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const ParametroTrasladoService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'PA_PARAMETROTRANSALDOAVENTREASOCIADOS')
    .then((recordsetsllega) => ({ data: recordsetsllega, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const AhorrosAVTrasladoService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'web_nodejs_ahorro_traslados')
    .then((recordsetsllega) => ({ data: recordsetsllega, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const parametrosAhorrosTrasladoService = async (parameters) => {
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

const gmfProcedureService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'pa_calculoGmf')
    .then((recordsetsllega) => ({ data: recordsetsllega, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

module.exports = {
  destinoAhorroService,
  MovimientotrasladoahorrosService,
  InscripcionCuentaTrasladoService,
  parametrosAhorrosTrasladoService,
  ParametroTrasladoService,
  AhorrosAVTrasladoService,
  gmfProcedureService,
};
