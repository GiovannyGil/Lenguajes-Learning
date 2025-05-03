const {
  origenAhorrosService, destinoPagoCreditosService, pagoCreditosService, movimientoTerceroService,
} = require('../../services/pagoCreditos/pagoCreditos.services');
const { DEncryptarsolodato, Encryptarsolodato } = require('../../negocio/Helpers/encrypt');
const {
  makespService,
} = require('../../services/common/common.services');
// eslint-disable-next-line
const origenAhorros = async (req, res) => {
  try {
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
    req.body.operador = DEncryptarsolodato(req.body.operador);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await origenAhorrosService(req.body);
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};
// eslint-disable-next-line
const destinoPagoCreditos = async (req, res) => {
  try {
    req.body.Cedula = DEncryptarsolodato(req.body.Cedula);
    req.body.operador = DEncryptarsolodato(req.body.operador);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await destinoPagoCreditosService(req.body);
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};
// eslint-disable-next-line
const pagoCreditos = async (req, res) => {
  try {
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
    req.body.operador = DEncryptarsolodato(req.body.operador);
    req.body.NumeroCuentaOrigenAhorro = DEncryptarsolodato(req.body.NumeroCuentaOrigenAhorro);
    req.body.Pagare = DEncryptarsolodato(req.body.Pagare);
    req.body.Valor = DEncryptarsolodato(req.body.Valor);
    req.body.LineaOrigenAhorro = DEncryptarsolodato(req.body.LineaOrigenAhorro);
    req.body.Linea = DEncryptarsolodato(req.body.Linea);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await pagoCreditosService(req.body);
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

const movimientoTercero = async (req, res) => {
  const response = await movimientoTerceroService(req.body);
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

const insertarSolicitudCreditos = async (req, res) => {
  try {
    req.body.Cedula = parseInt(DEncryptarsolodato(req.body.Cedula), 10);
    req.body.NombreRef = DEncryptarsolodato(req.body.NombreRef);
    req.body.Direccion = DEncryptarsolodato(req.body.Direccion);
    req.body.TelefonoFijo = DEncryptarsolodato(req.body.TelefonoFijo);
    req.body.Celular = DEncryptarsolodato(req.body.Celular);
    req.body.Celularasociado = DEncryptarsolodato(req.body.Celularasociado);
    req.body.Descripcion = DEncryptarsolodato(req.body.Descripcion);
    req.body.Operador = DEncryptarsolodato(req.body.Operador);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await makespService(req.body, 'pa_insertarsolicitudcredito');
  const recordsets = response.data;
  if (!response.error) {
    return res.json(recordsets);
  }
  const datatiempo = [
    [
      {
        Mensaje: 'Error no se pudo realizar el proceso verifique con el administrador...',
        Codigo: '999',
        tipoMensaje: 'E',
      },
    ],
  ];

  datatiempo[0][0].Mensaje = Encryptarsolodato(datatiempo[0][0].Mensaje);
  return res.send(datatiempo).end();
};

const misCodeudores = async (req, res) => {
  try {
    req.body.cedula = DEncryptarsolodato(req.body.cedula);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await makespService(req.body, 'web_nodejs_MisCodeudores');
  const recordsets = response.data;
  if (!response.error) {
    const recordsetsResponse = recordsets;
    if (recordsets[0][0]) {
      recordsetsResponse[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
    }
    return res.json(recordsetsResponse);
  }
  return res.json(recordsets);
};

const CodeudorDe = async (req, res) => {
  try {
    req.body.cedula = DEncryptarsolodato(req.body.cedula);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await makespService(req.body, 'web_nodejs_CodeudorDe');
  const recordsets = response.data;
  if (!response.error) {
    const recordsetsResponse = recordsets;
    if (recordsets[0][0]) {
      recordsetsResponse[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
    }
    return res.json(recordsetsResponse);
  }
  return res.json(recordsets);
};

const cifra = async (req, res) => {
  const params = {};
  Object.keys(req.body).forEach((key) => {
    params[key] = Encryptarsolodato(req.body[key]);
  });

  return res.send(params);
};

// eslint-disable-next-line
const cuentasDeBancos = async (req, res) => {
  try {
    req.body.cedula = DEncryptarsolodato(req.body.cedula);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await makespService(req.body, 'PA_CuentasBancariasDesembolso');
  const recordsets = response.data;
  if (!response.error) {
    return res.json(recordsets);
  }
  return res.json(recordsets);
};

module.exports = {
  origenAhorros,
  destinoPagoCreditos,
  pagoCreditos,
  movimientoTercero,
  insertarSolicitudCreditos,
  misCodeudores,
  CodeudorDe,
  cifra,
  cuentasDeBancos,
};
