const { model } = require('../database.services');
const sql = require('../../model/mssql');
const SimuladorAhorrosImprimir = require('../../negocio/Simuladores/SimuladorAhorrosImprimir');
const assetsEntidad = require('../../negocio/Helpers/assetsEntidad')();

const dataFront = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'CalculacdatMovil')
    .then((recordsets) => ({ data: recordsets, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const planDePagosFront = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'CalculacdatMovil')
    .then((recordsets) => ({ data: recordsets, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const buscarDestinosAhorrosService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'BuscarDestinosAhorros')
    .then((recordsets) => ({ data: recordsets, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const buscarPlazoAhorrosService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'BuscarDestinosAhorros')
    .then((recordsets) => ({ data: recordsets, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const comboPeriodoLiquidaService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'BuscarDestinosAhorros')
    .then((recordsets) => ({ data: recordsets, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const calcularAhorroService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'CalculacdatMovil')
    .then((recordsets) => ({ data: recordsets, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const imprimirFrontService = async (params, dataImpresion) => {
  const datos = await dataFront({
    Destino: params.Destino,
    Capital: params.Capital,
    plazo: params.plazo,
    periodoDias: params.periodoDias,
    capitalizacion: params.capitalizacion,
    totales: 1,
  });

  const planDePagos = await planDePagosFront({
    Destino: params.Destino,
    Capital: params.Capital,
    plazo: params.plazo,
    periodoDias: params.periodoDias,
    capitalizacion: params.capitalizacion,
    totales: 0,
  });

  const parametros = {
    data: datos.data[0][0],
    planDePagos: planDePagos.data,
    paraimpresion: dataImpresion,
    logo: assetsEntidad.logo,
    fax: assetsEntidad.fax,
    web: assetsEntidad.web,
  };
  return SimuladorAhorrosImprimir(parametros);
};

module.exports = {
  buscarDestinosAhorrosService,
  buscarPlazoAhorrosService,
  comboPeriodoLiquidaService,
  calcularAhorroService,
  imprimirFrontService,
};
