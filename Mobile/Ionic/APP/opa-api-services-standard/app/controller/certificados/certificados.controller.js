const { DEncryptarsolodato } = require('../../negocio/Helpers/encrypt');
const { certificadosService } = require('../../services/certificados/certificados.services');
// eslint-disable-next-line
const certificados = async (req, res) => {
  try {
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const params = {
    CedulaAsociado: req.body.CedulaAsociado,
    Tipo: req.body.Tipo,
    ano: req.body.ano,
  };
  const response = await certificadosService(params);
  res.set('Content-disposition', 'attachment; filename=certificado.pdf');
  res.set('Content-Type', 'application/pdf');
  response.pipe(res);
};
// se duplico el codigo porque desde la app asociados la cedula viene encriptada y desde sucursal no
const certificadosSucursal = async (req, res) => {
  const params = {
    CedulaAsociado: req.body.CedulaAsociado,
    Tipo: req.body.Tipo,
    ano: req.body.ano,
  };
  const response = await certificadosService(params);
  res.set('Content-disposition', 'attachment; filename=certificado.pdf');
  res.set('Content-Type', 'application/pdf');
  response.pipe(res);
};

module.exports = {
  certificados,
  certificadosSucursal,
};