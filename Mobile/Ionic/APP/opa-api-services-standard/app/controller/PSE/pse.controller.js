const { DEncryptarsolodato } = require('../../negocio/Helpers/encrypt');
const {
  pseGeneralService, estadoCuentasPSEService, transaccionesPSEService, PseHistoricoService,
} = require('../../services/PSE/pse.services');
// eslint-disable-next-line
const Psegeneral = async (req, res) => {
  try {
    req.body.cedula = DEncryptarsolodato(req.body.cedula);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await pseGeneralService(req.body);
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};
// eslint-disable-next-line
const estadoCuentasPSE = async (req, res) => {
  try {
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
    req.body.operador = DEncryptarsolodato(req.body.operador);
    req.body.Tipo = DEncryptarsolodato(req.body.Tipo);
    req.body.pagare = parseInt(DEncryptarsolodato(req.body.pagare), 10);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await estadoCuentasPSEService(req.body);
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};
// eslint-disable-next-line
const transaccionesPse = async (req, res) => {
  try {
    req.body.cedula = DEncryptarsolodato(req.body.cedula);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const consulta = `select top 1 id_pago,fechagenero,isnull(CONVERT(varchar, CAST(total_con_iva AS money), 1),0) total_con_iva from pse_log where id_cliente= ${req.body.cedula} and (estado=888 or estado=999) order by id_pago desc`;
  await transaccionesPSEService(req.body, consulta, res);
  console.log(transaccionesPSEService(req.body, consulta, res))
};
// eslint-disable-next-line
const PseHistorico = async (req, res) => {
  try {
    req.body.cedula = DEncryptarsolodato(req.body.cedula);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await PseHistoricoService(req.body);
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

module.exports = {
  Psegeneral,
  estadoCuentasPSE,
  transaccionesPse,
  PseHistorico,
};
