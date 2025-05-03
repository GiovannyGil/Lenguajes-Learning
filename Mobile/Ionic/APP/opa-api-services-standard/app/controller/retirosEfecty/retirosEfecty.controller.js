const axios = require('axios');
const config = require('../../../config.json');
const { DEncryptarsolodato } = require('../../negocio/Helpers/encrypt');
const { retirosEfectyService, rangosEfectyService } = require('../../services/retirosEfecty/retirosEfecty.services');
const { respuestasemailSinparametrosenvio } = require('../common/functions');

const generarCodigoEfectyController = async (req, res) => {
  const params = {
    cedulasociado: req.cedulasociado,
    operador: req.operador,
  };
  if (req.envia) {
    const Respuesta = await respuestasemailSinparametrosenvio(req, 'generarcodigoefecty');
    return Respuesta;
  }
  const response = await retirosEfectyService(params);
  if (response.error) return res.send(response.data);
  return response.data;
};

const rangosEfectyController = async (req, res) => {
  const consulta = 'select * from parametrovalorcomision';
  const response = await rangosEfectyService(consulta);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const validarUsuarioEfecty = (params, token, envioSms, valor) => new Promise((resolve, reject) => {
  const paramsValid = { ...params };
  paramsValid.Valor = valor;
  const formatter = new Intl.NumberFormat('es-ES');
  const valorRetiro = formatter.format(valor);
  const dataSms = {
    dataenvia: envioSms,
    valorRetiro,
    envia: true,
    cedulasociado: paramsValid.Cedula,
    operador: paramsValid.Cedula,
  };

  const headersEfecty = {
    Authorization: `Bearer ${token}`,
  };

  axios.post(`${config.url.urlEfecty}/api/Efecty/ValidarCliente`, paramsValid, { headers: headersEfecty })
    .then(async (res) => {
      if (res.data.Resultado) {
        await generarCodigoEfectyController(dataSms);
        resolve([
          { message: 'Operacion exitosa', result: true, otp: paramsValid.OTP },
        ]);
      } else {
        resolve([
          { message: 'Error al momento de generar la solicitud, intente nuevamente', result: false },
        ]);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

const authEfectyController = async (req, res) => {
  try {
    const dataAuth = {
      userName: config.url.user,
      password: config.url.password,
    };
    const responseAuth = await axios.post(`${config.url.urlEfecty}/api/Authorization/Authorization`, dataAuth);

    const dataOtp = {
      cedulasociado: DEncryptarsolodato(req.body.cedula),
      operador: DEncryptarsolodato(req.body.operador),
      envia: false,
      valorRetiro: 0,
    };
    const respuestaOTP = await generarCodigoEfectyController(dataOtp);
    const dataValidate = {
      OTP: respuestaOTP[0][0].valorcodigo,
      Clave: DEncryptarsolodato(req.body.pass),
      Cedula: DEncryptarsolodato(req.body.operador),
      operador: DEncryptarsolodato(req.body.operador),
      Valor: '',
    };
    const resultadoValidacion = await validarUsuarioEfecty(dataValidate, responseAuth.data.token,
      respuestaOTP, req.body.valorRetiro);

    res.json(resultadoValidacion);
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  generarCodigoEfectyController,
  rangosEfectyController,
  authEfectyController,
  validarUsuarioEfecty,
};
