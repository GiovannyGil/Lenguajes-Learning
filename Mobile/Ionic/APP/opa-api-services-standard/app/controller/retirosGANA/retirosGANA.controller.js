const { DEncryptarsolodato } = require('../../negocio/Helpers/encrypt');
const { GANAconsultaAhorrosService, GANAMsjService } = require('../../services/retirosGANA/retirosGANA.services');
const {
  makespService,
} = require('../../services/common/common.services');
// eslint-disable-next-line
const GANAconsultaAhorros = async (req, res) => {
  try {
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
    req.body.operador = DEncryptarsolodato(req.body.operador);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await GANAconsultaAhorrosService(req.body);
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};
// eslint-disable-next-line
const GANAMsj = async (req, res) => {
  try {
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
    req.body.operador = DEncryptarsolodato(req.body.operador);
    req.body.NumeroCuentaOrigenTraslado = DEncryptarsolodato(req.body.NumeroCuentaOrigenTraslado);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await GANAMsjService(req.body);
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

const AsientoTransaccionGANA = async (req, res) => {
  const array = [];
  Object.keys(req.body).forEach((key) => {
    array.push(key);
  });
  if (array.length > 0) {
    const response = await makespService(req.body, 'asentarTransaccionGana');
    const recordsets = response.data;
    if (response.error) return res.send({ Codigo: '111', Mensaje: 'Por favor verifique su inicio de sesión.', tipoMensaje: 'I' });
    if (!response.error) {
      return res.json(recordsets);
    }
  }
  return res.send({
    Codigo: '111',
    Mensaje: 'Por favor verifique su inicio de sesión.',
    tipoMensaje: 'I',
  });
};

const DevolucionTransaccionGANA = async (req, res) => {
  const array = [];
  Object.keys(req.body).forEach((key) => {
    array.push(key);
  });
  if (array.length > 0) {
    const response = await makespService(req.body, 'devolverTransaccionGana');
    const recordsets = response.data;
    if (response.error) return res.send({ Codigo: '111', Mensaje: 'Por favor verifique su inicio de sesión.', tipoMensaje: 'I' });
    if (!response.error) {
      return res.json(recordsets);
    }
  }
  return res.send({
    Codigo: '111',
    Mensaje: 'Por favor verifique su inicio de sesión.',
    tipoMensaje: 'I',
  });
};

const validacionCedula = async (req, res) => {
  const array = [];
  Object.keys(req.body).forEach((key) => {
    array.push(key);
  });
  if (array.length > 0) {
    const response = await makespService(req.body, 'ConsultaCedulaGANA');
    const recordsets = response.data;
    if (response.error) return res.send({ Codigo: '111', Mensaje: 'Por favor verifique su inicio de sesión.', tipoMensaje: 'I' });
    if (!response.error) {
      return res.json(recordsets);
    }
  }
  return res.send({
    Codigo: '111',
    Mensaje: 'Por favor verifique su inicio de sesión.',
    tipoMensaje: 'I',
  });
};

module.exports = {
  GANAconsultaAhorros,
  GANAMsj,
  AsientoTransaccionGANA,
  DevolucionTransaccionGANA,
  validacionCedula,
};
