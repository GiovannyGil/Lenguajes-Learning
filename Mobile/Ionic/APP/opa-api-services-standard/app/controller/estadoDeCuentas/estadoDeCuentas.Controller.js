// const moment = require('moment');
const axios = require('axios');
const { DEncryptarsolodato } = require('../../negocio/Helpers/encrypt');
const {
  estadoCuentasService, seguimientoAhorroService,
  seguimientoCreditoService, seguimientoNovedadService,
} = require('../../services/estadoDeCuentas/EstadoDeCuentas.services');
const sql = require('../../model/mssql');
const config = require('../../../config.json');

// eslint-disable-next-line
const estadoCuentas = async (req, res) => {
  try {
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
    req.body.operador = DEncryptarsolodato(req.body.operador);
    req.body.Tipo = DEncryptarsolodato(req.body.Tipo);
    req.body.pagare = parseInt(DEncryptarsolodato(req.body.pagare), 10);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }

  const response = await estadoCuentasService(req.body);
  if (response.error) return res.send(response.data);
  if (!response.error) return res.json(response.data);
};
// eslint-disable-next-line
const seguimientoAhorro = async (req, res) => {
  try {
    req.body.esoperador = DEncryptarsolodato(req.body.esoperador);
    // req.body.FechaInicial = moment(req.body.FechaInicial).format('YYYYMMDD');
    // req.body.FechaFinal = moment(req.body.FechaFinal).format('YYYYMMDD');
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
    req.body.operador = DEncryptarsolodato(req.body.operador);
    req.body.Tipo = DEncryptarsolodato(req.body.Tipo);
    req.body.NumeroCuenta = DEncryptarsolodato(req.body.NumeroCuenta);
    req.body.Linea = DEncryptarsolodato(req.body.Linea);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await seguimientoAhorroService(req.body);
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};
// eslint-disable-next-line
const seguimientoCredito = async (req, res) => {
  try {
    req.body.Pagare = DEncryptarsolodato(req.body.Pagare);
    req.body.operador = DEncryptarsolodato(req.body.operador);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await seguimientoCreditoService({
    ...req.body,
    Pagare: parseInt(req.body.Pagare, 10),
    // FechaInicial: moment(req.body.FechaInicial).format('YYYYMMDD'),
    // FechaFinal: moment(req.body.FechaFinal).format('YYYYMMDD'),
    operador: req.body.operador,
    esoperador: req.body.esoperador,
  });
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};
// eslint-disable-next-line
const seguimientoNovedad = async (req, res) => {
  try {
    req.body.cedulasociado = DEncryptarsolodato(req.body.cedulasociado);
    req.body.Linea = DEncryptarsolodato(req.body.Linea);
    req.body.operador = DEncryptarsolodato(req.body.operador);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await seguimientoNovedadService({
    ...req.body,
    cedulasociado: req.body.cedulasociado,
    Linea: req.body.Linea,
    // FechaInicial: moment(req.body.FechaInicial).format('YYYYMMDD'),
    // FechaFinal: moment(req.body.FechaFinal).format('YYYYMMDD'),
    operador: req.body.operador,
    esoperador: req.body.esoperador,
  });
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};
// eslint-disable-next-line
const estadoCuentasCompleto = async (req, res, integrador) => {
  try {
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
    req.body.pagare = DEncryptarsolodato(req.body.pagare);
    req.body.operador = DEncryptarsolodato(req.body.operador);
    req.body.id = DEncryptarsolodato(req.body.id);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const interadorFactory = integrador;
  interadorFactory.id = req.body.id;
  interadorFactory.body = req.body;
  interadorFactory.estadoCuentas().then((data) => res.send(data)).catch((e) => {
    res.status(500);
    res.send(e);
  });
};
// eslint-disable-next-line
const estadoCuentasCompletoPrint = async (req, res, integrador) => {
  try {
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
    req.body.pagare = DEncryptarsolodato(req.body.pagare);
    req.body.operador = DEncryptarsolodato(req.body.operador);
    req.body.id = DEncryptarsolodato(req.body.id);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const interadorFactory = integrador;
  interadorFactory.id = req.body.id;
  interadorFactory.body = req.body;
  interadorFactory.imprimirEstadoCuentas().then((data) => {
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
    });
    data.pipe(res);
  }).catch((e) => {
    res.status(500);
    res.send(e);
  });
};
// eslint-disable-next-line
const descuentosNomina = async (req, res, integrador) => {
  try {
    req.body.cedula = DEncryptarsolodato(req.body.cedula);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const interadorFactory = integrador;
  interadorFactory.body = req.body;
  interadorFactory.descuentosDeNomina()
    .then((recordsets) => {
      res.json(recordsets);
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(req.body, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
    });
};

const solicitarPlanDePagos = async (req, res) => {
  const data = {
    pagare: req.body.Pagare,
    canal: req.body.canal,
  };
  axios.post(`${config.url.urlPlanDePagos}/api/loanReport/SolicitarPlanPagos`, data).then((response) => {
    res.json(response.data.results);
  }).catch((err) => res.json(err));
};

module.exports = {
  seguimientoAhorro,
  seguimientoCredito,
  seguimientoNovedad,
  estadoCuentas,
  estadoCuentasCompleto,
  estadoCuentasCompletoPrint,
  descuentosNomina,
  solicitarPlanDePagos,
};
