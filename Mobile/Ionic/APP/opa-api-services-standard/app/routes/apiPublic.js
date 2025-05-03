const router = require('express').Router();
const request = require('request');
const sql = require('../model/mssql');
const { IntegradorFactory } = require('../negocio/Integrador');
const {
  descargarcursos,
} = require('../controller/cursos/cursos.controller');
const {
  validar,
} = require('../controller/sucursal/sucursal.controller');
const {
  validarProcesos, publicidad, consultaCedulaUsuario, validarUUID,
  validarUsuario, validarRegistroUUID, guardarUUID, login,
  numeroEntidad, validacionesrecuperacion,
  recuperaclave,
  GuardaPoliticatratadatos, preguntasseguridad,
  recordarusuario,
  nuevousuario,
  operadores,
  rangos,
  consultaoperador,
} = require('../controller/login/login.controller');
const {
  cifra,
} = require('../controller/Creditos/Creditos.controller');
const {
  upload,
} = require('../controller/modulosAdicionales/modulosAdicionales.controller');
const {
  GANAMsj, AsientoTransaccionGANA, DevolucionTransaccionGANA, validacionCedula,
} = require('../controller/retirosGANA/retirosGANA.controller');
const { certificados } = require('../controller/certificados/certificados.controller');
const { generarCodigoMatriculaAhorro } = require('../controller/trasladoAhorros/trasladoAhorros.controller');

sql.connect().then((model) => {
  const integradorFactory = IntegradorFactory.create();
  integradorFactory.db = model;

  router.post('/Publicidad', publicidad);
  router.post('/validarusuario', validarUsuario);
  router.post('/validarprocesos', validarProcesos);
  router.post('/consultacedulausuario', consultaCedulaUsuario);
  router.post('/validarUUID', validarUUID);
  router.post('/validacionregistroUUID', validarRegistroUUID);
  router.post('/guardarUUID', guardarUUID);
  router.post('/Login', login);
  router.post('/NumeroEntidad', numeroEntidad);
  router.post('/validacionesrecuperacion', validacionesrecuperacion);
  router.post('/Recuperaclave', recuperaclave);
  router.post('/GANAMsj', GANAMsj);
  router.post('/certificados', certificados);
  router.post('/GuardaPoliticatratadatos', GuardaPoliticatratadatos);
  router.post('/GenerarCodigoMatricula', generarCodigoMatriculaAhorro);
  router.post('/preguntasseguridad', preguntasseguridad);
  router.get('/prueba', async (_, res) => {
    res.send({
      Codigo: '000',
      Mensaje: 'Codigo Generado',
      tipoMensaje: 'I',
    });
  });
  router.post('/upload', upload);
  router.post('/validar', validar);
  router.post('/descargarcursos', descargarcursos);
  // TODO: Probar estas rutas hacia abajo que no están en la app o no se ve el path apra probar
  router.post('/validacionCedula', validacionCedula);
  router.post('/AsientoTransaccionGANA', AsientoTransaccionGANA);
  router.post('/DevolucionTransaccionGANA', DevolucionTransaccionGANA);
  router.post('/pruebarendimiento', () => {
    let empieza = 0;
    const cuantos = 1;
    while (empieza >= 0 && empieza < cuantos) {
      const headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const options = {
        url: 'http://localhost:3000/api/Login',
        method: 'POST',
        jar: true,
        headers,
        data: [
          {
            'content-type': 'application/json',
            body: JSON.stringify({ operador: 'AFSC', xml: '<root><parameters><Ip>0</Ip><Token>50663c613466261cbb7873522218c3da%d9c986808d2fe01c50ef267a295a1eed%0</Token><Tipo/><Linea/><Agencia/><NumeroCuenta/><FechaInicial/><FechaFinal/><RegistroEmpezar/><RegistroMostrar/><Pagare>0</Pagare><TipoOrigenTranslado/><LineaOrigenTranslado/><AgenciaOrigenTranslado/><NumeroCuentaOrigenTranslado/><TipoDestinoTranslado/><LineaDestinoTranslado/><AgenciaDestinoTranslado/><NumeroCuentaDestinoTranslado/><Valor>0</Valor><TipoOrigenAhorro/><LineaOrigenAhorro/><AgenciaOrigenAhorro/><NumeroCuentaOrigenAhorro/><CedulaAsociado></CedulaAsociado><claveIgreso/><claveparacambio/><Codnovedad/><Tiponovedad/><anoconsulta/><mesconsulta/><Plazo/><consecutivo/><codigo></codigo><Ingreso>57a83cd6174beb0684e407c7172379f4</Ingreso></parameters></root>' }),
          },
        ],
      };

      request(options, (error, response, body) => {
        if (!error && Number(response.statusCode) === 200) {
          // eslint-disable-next-line no-console
          console.log(body);
        }
      });

      empieza += 1;

      if (empieza >= 10000) {
        // eslint-disable-next-line no-console
        console.log('termino');
      }
    }
  });
  router.post('/recordarusuario', recordarusuario);
  router.post('/nuevousuario', nuevousuario);
  router.post('/rangos', rangos);
  router.post('/consultaoperador', consultaoperador);
  router.post('/cifra', cifra);
  router.get('/operadores', operadores);
}).catch(() => {
  process.exit(1);
});

module.exports = router;
