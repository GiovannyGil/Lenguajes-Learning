const {
  parametrosnovedadesService, SolicitudNovedad,
} = require('../../services/parametronovedad/parametrosnovedades.services');
const { DEncryptarsolodato } = require('../../negocio/Helpers/encrypt');

const parametronovedades = async (req, res) => {
  const response = await parametrosnovedadesService(req.body);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const Novedadessolicitud = async (req, res) => {
  const fecha = new Date();
  const fechaFormateada = `${fecha.toLocaleDateString('zh-Hans-CN')} ${fecha.toLocaleTimeString('es-ES')}`;
  try {
    req.body.Codnovedad = DEncryptarsolodato(req.body.Codnovedad);
    req.body.Nit = DEncryptarsolodato(req.body.Nit);
    req.body.Cuota = DEncryptarsolodato(req.body.Cuota);
    req.body.origen = DEncryptarsolodato(req.body.origen);
    req.body.Plazo = DEncryptarsolodato(req.body.Plazo);
    req.body.SaldoTotal = DEncryptarsolodato(req.body.SaldoTotal);
    req.body.Formapago = DEncryptarsolodato(req.body.Formapago);
    req.body.estado = DEncryptarsolodato(req.body.estado);
    req.body.fecha = fechaFormateada;
    req.body.Metodo = null;
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await SolicitudNovedad(req.body);
  if (response.error) res.send(response.data);
  return res.json(response.data);
};

module.exports = {
  parametronovedades, Novedadessolicitud,
};
