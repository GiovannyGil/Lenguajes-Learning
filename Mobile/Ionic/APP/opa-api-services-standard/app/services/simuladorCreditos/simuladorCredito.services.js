const { model } = require('../database.services');
const sql = require('../../model/mssql');
const assetsEntidad = require('../../negocio/Helpers/assetsEntidad')();
const SimuladorCreditosImprimir = require('../../negocio/Simuladores/SimuladorCreditosImprimir');

const encabezadoCreditos = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'calculaPlanPagosCreditosApp')
    .then((recordsets) => ({ data: recordsets, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};
const detalleCreditos = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'calculaPlanPagosCreditosApp')
    .then((recordsets) => ({ data: recordsets, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const BuscarLineasService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'BuscardatossimuladorCreditos')
    .then((recordsets) => ({ data: recordsets, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const BuscarDestinosService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'BuscardatossimuladorCreditos')
    .then((recordsets) => ({ data: recordsets, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const CalcularCreditoService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'calculaPlanPagosCreditosApp')
    .then((recordsets) => ({ data: recordsets, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const imprimirCreditosService = async (params) => {
  const encabezado = await encabezadoCreditos(params);
  const detalle = await detalleCreditos({ ...params, Totales: 0 });

  const datosImprimir = {
    encabezado: encabezado.data[0][0],
    planDePagos: detalle.data[0],
    costos: detalle.data[1],
    NombresCostos: detalle.data[2],
    paraimpresion: params,
    logo: assetsEntidad.logo,
  };
  return SimuladorCreditosImprimir(datosImprimir);
};

module.exports = {
  BuscarLineasService,
  BuscarDestinosService,
  CalcularCreditoService,
  imprimirCreditosService,
};
