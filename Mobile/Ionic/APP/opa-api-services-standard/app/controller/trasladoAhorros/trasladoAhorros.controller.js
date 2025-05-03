const { DEncryptarsolodato } = require('../../negocio/Helpers/encrypt');
const {
  destinoAhorroService, MovimientotrasladoahorrosService, InscripcionCuentaTrasladoService,
  parametrosAhorrosTrasladoService, AhorrosAVTrasladoService,
  ParametroTrasladoService, gmfProcedureService,
} = require('../../services/trasladoAhorros/trasladoAhorro.services');
const { makespService } = require('../../services/common/common.services');
const { Encryptarsolodato } = require('../../negocio/Helpers/encrypt');
const { respuestasemailSinparametrosenvio } = require('../common/functions');
const config = require('../../../config.json');
// eslint-disable-next-line
const DestinoDestinoahorros = async (req, res) => {
  try {
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
    req.body.operador = DEncryptarsolodato(req.body.operador);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await destinoAhorroService(req.body);
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};
// eslint-disable-next-line
const Movimientotrasladoahorros = async (req, res) => {
  try {
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
    req.body.operador = DEncryptarsolodato(req.body.operador);
    req.body.NumeroCuentaOrigenTraslado = DEncryptarsolodato(req.body.NumeroCuentaOrigenTraslado);
    req.body.NumeroCuentaDestinoTraslado = DEncryptarsolodato(req.body.NumeroCuentaDestinoTraslado);
    req.body.Valor = DEncryptarsolodato(req.body.Valor);
    req.body.LineaOrigenTraslado = DEncryptarsolodato(req.body.LineaOrigenTraslado);
    req.body.LineaDestinoTraslado = DEncryptarsolodato(req.body.LineaDestinoTraslado);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await MovimientotrasladoahorrosService(req.body);
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

const ConsultaAhorrosAVTraslado = async (req, res) => {
  try {
    req.body.cedula = DEncryptarsolodato(req.body.cedula);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await AhorrosAVTrasladoService(req.body);
  return res.json(response.data);
};

const ParametroTrasladoEntreAsociados = async (req, res) => {
  const parametros = {
    Metodo: 'READINIT',
    Identificador: 7,
    fuente: null,
    descripcion: null,
    esenlinea: null,
    Operador: null,
    Actualizaciondate: null,
  };
  const response = await ParametroTrasladoService(parametros);
  return res.json(response.data);
};

const BuscarCuentaTraslado = async (req, res) => {
  const response = await InscripcionCuentaTrasladoService(req.body);
  return res.json(response.data);
};

const InscripcionCuentaTraslado = async (req, res) => {
  let xml;
  try {
    if (req.body.accion === 'N') {
      req.body.cedulaorigen = DEncryptarsolodato(req.body.cedulaorigen);
      req.body.codLineaOrigen = DEncryptarsolodato(req.body.codLineaOrigen);
      req.body.cuentaOrigen = DEncryptarsolodato(req.body.cuentaOrigen);
      req.body.codLineaDestino = DEncryptarsolodato(req.body.codLineaDestino);
      req.body.cuentaDestino = DEncryptarsolodato(req.body.cuentaDestino);
      xml = `<variables>
              <codLineaOrigen>${req.body.codLineaOrigen}</codLineaOrigen>
              <cuentaOrigen>${req.body.cuentaOrigen.trim()}</cuentaOrigen>
              <cedulaDestino>${req.body.cedulaDestino}</cedulaDestino>
              <codLineaDestino>${req.body.codLineaDestino}</codLineaDestino>
              <cuentaDestino>${req.body.cuentaDestino.trim()}</cuentaDestino>
              <agencia>${req.body.agencia}</agencia>
              <canal>APP</canal>
            </variables>`;
    } else {
      req.body.cedulaorigen = DEncryptarsolodato(req.body.cedulaorigen);
      xml = req.body.xml;
    }
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const paramsInscripcion = {
    cedula: req.body.cedulaorigen,
    caso: req.body.caso,
    xml,
  };
  const response = await AhorrosAVTrasladoService(paramsInscripcion);
  return res.json(response.data);
};

const generarCodigoMatriculaAhorro = async (req, res) => {
  try {
    if (config.entidad.codigo === '0052') {
      req.body.operador = DEncryptarsolodato(req.body.cedulasociado);
    }
    req.body.cedulasociado = DEncryptarsolodato(req.body.cedulasociado);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await makespService(req.body, 'pa_crear_codigo');
  const recordsets = response.data;
  if (!response.error) {
    if (!recordsets[0]) {
      return res.json(recordsets);
    }
    const Respuesta = await respuestasemailSinparametrosenvio(recordsets, 'matriculahorro');
    return res.json(Respuesta.data);
  }
  return res.json(recordsets);
};

const parametrosAhorrosTraslado = async (req, res) => {
  const consulta = `select * from parameahorroAlaVista where codlinea='${req.body.codlinea}'`;
  const response = await parametrosAhorrosTrasladoService(consulta);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const ConsultarLineasRetiroahorros = async (req, res) => {
  const datatiempo = [
    [
      {
        Mensaje: 'Error no se pudo realizar el proceso verifique con el administrador...',
        Codigo: '999',
        tipoMensaje: 'E',
      },
    ],
  ];
  const response = await makespService(req.body, 'pa_traerdatosparasolicitud');
  const recordsets = response.data;
  if (!response.error) {
    return res.json(recordsets);
  }
  datatiempo[0][0].Mensaje = Encryptarsolodato(datatiempo[0][0].Mensaje);
  return res.send(datatiempo).end();
};

const insertarSolicitudRetiroAhorros = async (req, res) => {
  const datatiempo = [
    [
      {
        Mensaje: 'Error no se pudo realizar el proceso verifique con el administrador...',
        Codigo: '999',
        tipoMensaje: 'E',
      },
    ],
  ];
  const response = await makespService(req.body, 'pa_insertarsolicitud');
  const recordsets = response.data;
  if (!response.error) {
    recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);

    return res.json(recordsets);
  }
  datatiempo[0][0].Mensaje = Encryptarsolodato(datatiempo[0][0].Mensaje);
  return res.send(datatiempo).end();
};

const TrasladoAhorroNoEsEnLinea = async (req, res) => {
  const fecha = new Date();
  const fechaFormateada = `${fecha.toLocaleDateString('zh-Hans-CN')} ${fecha.toLocaleTimeString('es-ES')}`;
  try {
    req.body.cedulaOrigen = DEncryptarsolodato(req.body.cedulaOrigen);
    req.body.codLineaOrigen = DEncryptarsolodato(req.body.codLineaOrigen);
    req.body.cuentaOrigen = DEncryptarsolodato(req.body.cuentaOrigen);
    req.body.cedulaDestino = DEncryptarsolodato(req.body.cedulaDestino);
    req.body.codLineaDestino = DEncryptarsolodato(req.body.codLineaDestino);
    req.body.cuentaDestino = DEncryptarsolodato(req.body.cuentaDestino);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const xml = `<variables>
                <cedulaOrigen>${req.body.cedulaOrigen}</cedulaOrigen>
                <codLineaOrigen>${req.body.codLineaOrigen}</codLineaOrigen>
                <cuentaOrigen>${req.body.cuentaOrigen}</cuentaOrigen>
                <agenciaOrigen>${req.body.agenciacuentaAVO}</agenciaOrigen>
                <cedulaDestino>${req.body.cedulaDestino}</cedulaDestino>
                <codLineaDestino>${req.body.codLineaDestino}</codLineaDestino>
                <cuentaDestino>${req.body.cuentaDestino}</cuentaDestino>
                <agenciaDestino>${req.body.agenciacuentaAVD}</agenciaDestino>
                <valor>${req.body.valTransferir}</valor>
                <fecha>${fechaFormateada}</fecha>
                <canal>APP</canal>
                <estado>P</estado>
              </variables>`;
  const paramsTransa = {
    cedula: req.body.cedulaOrigen,
    caso: 7,
    xml,
  };
  const response = await AhorrosAVTrasladoService(paramsTransa);
  return res.json(response.data);
};

const calculoGMF = async (req, res) => {
  try {
    req.body.cedula = DEncryptarsolodato(req.body.cedula);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await AhorrosAVTrasladoService(req.body);
  return res.json(response.data);
};

const gmfProcedure = async (req, res) => {
  try {
    req.body.Cedula = DEncryptarsolodato(req.body.Cedula);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await gmfProcedureService(req.body);
  return res.json(response.data);
};

module.exports = {
  DestinoDestinoahorros,
  Movimientotrasladoahorros,
  ConsultarLineasRetiroahorros,
  insertarSolicitudRetiroAhorros,
  InscripcionCuentaTraslado,
  generarCodigoMatriculaAhorro,
  parametrosAhorrosTraslado,
  ConsultaAhorrosAVTraslado,
  ParametroTrasladoEntreAsociados,
  TrasladoAhorroNoEsEnLinea,
  BuscarCuentaTraslado,
  calculoGMF,
  gmfProcedure,
};
