const { model } = require('../database.services');
const { Encryptarsolodato } = require('../../negocio/Helpers/encrypt');
const sql = require('../../model/mssql');
const { respuestasemail } = require('../../controller/common/functions');

const origenAhorrosService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'SucursalMovilTrasladoOrigenAhorros')
    .then((recordsets) => {
      const Ahorros = recordsets[0].map((item) => ({
        ...item,
        Mensaje: Encryptarsolodato(item.Mensaje),
        NumeroCuenta: Encryptarsolodato(item.NumeroCuenta),
        SaldoTotal: Encryptarsolodato(item.SaldoTotal),
      }));
      return { data: [Ahorros], error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const destinoPagoCreditosService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'SucursalMovilDestinoPermitidoPagoCreditos')
    .then((recordsets) => {
      const Creditos = recordsets[0].map((item) => ({
        ...item,
        Mensaje: Encryptarsolodato(item.Mensaje),
        PAGARE: Encryptarsolodato(item.PAGARE.toString()),
        saldoCapital: Encryptarsolodato(item.saldoCapital),
      }));
      return { data: [Creditos], error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const pagoCreditosService = async (parameters) => {
  const model1 = await model;
  let dataterror = [];
  const data = await model1
    .SP(parameters, 'PA_Movimientopagocreditos')
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

const movimientoTerceroService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'PAmovimientoTercero')
    .then(async (recordsets) => {
      if (recordsets[0][0]) {
        const Respuesta = await respuestasemail(recordsets);
        return Respuesta;
      }
      const dataterror = [
        [
          {
            Mensaje: 'Error al procesar la transaccion porfa vor verifique...',
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

module.exports = {
  origenAhorrosService,
  destinoPagoCreditosService,
  pagoCreditosService,
  movimientoTerceroService,
};
