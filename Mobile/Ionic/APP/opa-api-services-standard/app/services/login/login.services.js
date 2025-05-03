const jwt = require('jwt-simple');
const moment = require('moment');
const sql = require('../../model/mssql');
const { model } = require('../database.services');
const { Encryptarsolodato } = require('../../negocio/Helpers/encrypt');
const { respuestasemail, respuestasemailSinparametrosenvio } = require('../../controller/common/functions');

const validarProcesosService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .consulta('', parameters)
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (recordsets[0][0]) {
        recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
      }
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const validarmodulosService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .consulta('', parameters)
    .then((recordsetsllega) => ({ data: recordsetsllega, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const publicidadService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'consultardatosinicio')
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (recordsets[0][0]) {
        recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
      }
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const consultaCedulaUsuarioService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'pa_consultacedulausuario')
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (recordsets[0][0]) {
        recordsets[0][0].cedula = Encryptarsolodato(recordsets[0][0].cedula);
      }
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const validarUUIDService = async (cadena, parameters) => {
  const model1 = await model;
  const data = await model1
    .consulta('', cadena)
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      let consultaUUID = '';
      let Mensaje = [];
      // para pruebas en las tiendas se comenta esto
      if (!recordsets[0].length > 0) {
        Mensaje = [
          {
            Mensaje: 'Para poder ingresar a la aplicación deberá registrar su dispositivo, ¿desea registrarlo?',
          },
        ];
        return { data: Mensaje, error: false };
      }
      // para pruebas en las tiendas se comenta esto
      if (parameters.body.esoperador === 'S') {
        consultaUUID = `select uuid from logDispositivoMovilUUID_SucursalMovil where uuid= '${parameters.body.uuid}' and codoperador='${parameters.body.operador}'`;
      } else {
        // para que valide normal hay que dejarlo tal cual este, este queda y es el de produccion
        // consultaUUID = `select uuid from logDispositivoMovilUUID where uuid=
        // '${parameters.body.uuid}' and CedulaAsociado=${parameters.body.CedulaAsociado}`;
        consultaUUID = `select uuid from logDispositivoMovilUUID where
        CedulaAsociado=${parameters.body.CedulaAsociado}`;
      }
      return model1
        .consulta('', consultaUUID)
        .then((recordsets1) => {
          // para pruebas en las tiendas se comenta esto
          if (!recordsets1[0].length > 0) {
            Mensaje = [
              {
                Mensaje: 'Actualmente, se encuentra ingresando desde un dispositivo diferente al ya registrado, ¿desea registrarlo?',
              },
            ];
            return { data: Mensaje, error: false };
          }
          // para pruebas en las tiendas se comenta esto

          Mensaje = [
            {
              Mensaje: '',
            },
          ];
          return { data: Mensaje, error: false };
        });
    });
  return data;
};

const validarUsuarioService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'pa_validusuarios')
    .then(async (recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (!recordsets[0]) {
        return recordsets;
      }
      const Respuesta = await respuestasemail(recordsets);
      Respuesta.data[0][0].Codigo = Encryptarsolodato(Respuesta.data[0][0].Codigo);
      Respuesta.data[0][0].mensajeinicio = Encryptarsolodato(Respuesta.data[0][0].mensajeinicio);
      Respuesta.data[0][0].nombreusuario = Encryptarsolodato(Respuesta.data[0][0].nombreusuario);
      Respuesta.data[0][0].url = Encryptarsolodato(Respuesta.data[0][0].url);
      Respuesta.data[0][0].clavevacia = Encryptarsolodato(Respuesta.data[0][0].clavevacia);
      Respuesta.data[0][0].cedula = Encryptarsolodato(Respuesta.data[0][0].cedula);
      Respuesta.data[0][0].claveusuariovalida = Encryptarsolodato(
        Respuesta.data[0][0].claveusuariovalida,
      );
      Respuesta.data[0][0].politicatratadatos = Encryptarsolodato(
        Respuesta.data[0][0].politicatratadatos,
      );

      const dataR = [
        [
          {
            mensajeinicio: Respuesta.data[0][0].mensajeinicio,
            claveusuariovalida: Respuesta.data[0][0].claveusuariovalida,
            cedula: Respuesta.data[0][0].cedula,
            clavevacia: Respuesta.data[0][0].clavevacia,
            url: Respuesta.data[0][0].url,
            nombreusuario: Respuesta.data[0][0].nombreusuario,
            Mensaje: Respuesta.data[0][0].Mensaje,
            Codigo: Respuesta.data[0][0].Codigo,
            tipoMensaje: Respuesta.data[0][0].tipoMensaje,
            politicatratadatos: Respuesta.data[0][0].politicatratadatos,
          },
        ],
      ];

      return { data: dataR, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const validarRegistroUUIDService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'pa_validacionregistroUUID')
    .then(async (recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (Number(recordsets[0][0].Codigo) === 128) {
        await respuestasemailSinparametrosenvio(recordsets, 'registroUUID');
        const dataR = [
          [
            {
              Mensaje: recordsets[0][0].Mensaje,
              Codigo: recordsets[0][0].Codigo,
              tipoMensaje: 'I',
            },
          ],
        ];
        return { data: dataR, error: false };
      }
      recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const enviarMailSinParametros = async (envio) => {
  const model1 = await model;
  const data = await model1
    .consulta('', envio)
    .then(async (recordsets2) => {
      if (!recordsets2[0].length > 0) {
        return { data: recordsets2, error: false };
      }

      const datos = [
        [
          {
            correoasociado: recordsets2[0][0].correoasociado,
            celularasociado: recordsets2[0][0].celularasociado,
          },
        ],
      ];

      const Respuesta = await respuestasemailSinparametrosenvio(datos, 'UUID');
      return Respuesta;
    });
  return data;
};

const consultaAsociado = async (cadena, parameters) => {
  const model1 = await model;
  let envio = '';
  const data = await model1
    .consulta('', cadena)
    .then(async () => {
      if (parameters.body.esoperador === 'S') {
        envio = `${"select ltrim(rtrim(replace(celular, ' ',''))) celularasociado, ltrim(rtrim(Correo)) correoasociado from ParametrosSeguridadOperador "
          + "where IDOperador=(select idoperador from operador where codoperador='"}${parameters.body.operador}')`;
      } else {
        envio = `select ltrim(rtrim(replace(celular, ' ',''))) celularasociado, ltrim(rtrim(email)) correoasociado from nits where nit=${parameters.body.CedulaAsociado}`;
      }
      const response = await enviarMailSinParametros(envio);
      return response;
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const guardarUUIDService = async (cadena, parameters) => {
  const model1 = await model;
  const data = await model1
    .consulta('', cadena)
    .then((recordsets) => {
      let cadenaR = '';
      if (!recordsets[0].length > 0) {
        if (parameters.body.esoperador === 'S') {
          cadenaR = `insert into logDispositivoMovilUUID_SucursalMovil select '${parameters.body.operador}', '${parameters.body.uuid}', GETDATE()`;
        } else {
          cadenaR = `insert into logDispositivoMovilUUID select ${parameters.body.CedulaAsociado}, '${parameters.body.uuid}', GETDATE()`;
        }
      } else if (parameters.body.esoperador === 'S') {
        cadenaR = `update logDispositivoMovilUUID_SucursalMovil set uuid='${parameters.body.uuid}', fecha=GETDATE() where codoperador='${parameters.body.operador}'`;
      } else {
        cadenaR = `update logDispositivoMovilUUID set uuid='${parameters.body.uuid}', fecha=GETDATE() where CedulaAsociado=${parameters.body.CedulaAsociado}`;
      }
      return { data: cadenaR, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });

  const response = consultaAsociado(data.data, parameters);
  return response;
};

const loginService = async (parameters, query) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'pa_VALIDARCODIGOACCESOEIMAGEN')
    .then((recordsetsR) => {
      const recordsets = recordsetsR;
      if (recordsets[0][0].Codigo === null || recordsets[0][0].Codigo === '131') {
        const expires = moment().add(recordsets[0][0].TiempoSesion, 'minutes').valueOf();
        const scope = ['opa-accountstatus-api', 'opa-savings-api',
          'opa-credits-api', 'opa-simulators-api', 'opa-aid-api', 'opa-insurance-api',
          'opa-pse-api', 'opa-security-api', 'opa-vacationvenues-api', 'opa-gana-api',
          'opa-courses-api', 'opa-associates-api', 'opa-others-api', 'opa-cd-proxy-api', 'opa-branch-api',
          'opa-efecty-api',
        ];
        const aud = ['https://creditosdigitales.opa.com.co/auth/resources', 'opa-mobile-api'];
        const payload = {
          user: query.user,
          password: query.password,
          fecha: expires,
          scope,
          aud,
        };
        const token = jwt.encode(payload, 'Op4*5asAPP,.');
        recordsets[0][0].token = token;
      }

      if (recordsets[0][0] && recordsets[0][0].Codigo === null) {
        recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
        recordsets[0][0].Codigo = Encryptarsolodato(recordsets[0][0].Codigo);
        recordsets[0][0].codigooperador = Encryptarsolodato(recordsets[0][0].codigooperador);
        recordsets[0][0].nombreoperador = Encryptarsolodato(recordsets[0][0].nombreoperador);
        recordsets[0][0].nombreusuario = Encryptarsolodato(recordsets[0][0].nombreusuario);
        recordsets[0][0].mensajeinicio = Encryptarsolodato(recordsets[0][0].mensajeinicio);
        recordsets[0][0].codigopreguntas = Encryptarsolodato(recordsets[0][0].codigopreguntas);
        recordsets[0][0].enviacorreoomensaje = Encryptarsolodato(
          recordsets[0][0].enviacorreoomensaje,
        );
        recordsets[0][0].TiempoSesion = Encryptarsolodato(
          recordsets[0][0].TiempoSesion.toString(),
        );
      } else {
        recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
        recordsets[0][0].Codigo = Encryptarsolodato(recordsets[0][0].Codigo);
      }

      recordsets[0][0].id = Encryptarsolodato(parameters.operador);
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const cargarDatosInicioService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'PA_cargardatosinicio')
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (recordsets[0][0]) {
        recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
      }
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const validacionesrecuperacionService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'pa_validacionesrecuperacion')
    .then(async (recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (Number(recordsets[0][0].Codigo) === 128) {
        await respuestasemailSinparametrosenvio(recordsets, 'validausuario');

        const dataR = [
          [
            {
              Mensaje: recordsets[0][0].Mensaje,
              Codigo: recordsets[0][0].Codigo,
              tipoMensaje: 'I',
            },
          ],
        ];
        return { data: dataR, error: false };
      }
      recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const recuperarClaveService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'pa_Recuperaclave')
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (recordsets[0][0]) {
        recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
      }
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const actualizarClaveService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'Actualizaclave')
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (recordsets[0][0].Codigo) {
        recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
      }
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const BancoImagenesService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'CONSULTARBANCOIMAGENES')
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (recordsets[0][0]) {
        recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
      }
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const guardarImagenesService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'GUARDARIMAGENESUSUARIOS')
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (recordsets[0][0]) {
        recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
      }
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const CerrarsessionService = async (parameters, select) => {
  const model1 = await model;
  const data = await model1
    .consulta('', parameters)
    .then(() => {
      model1
        .consulta('', select)
        .then((recordsetsllega) => {
          const recordsets = recordsetsllega;
          let dataR = [];

          if (recordsets[0][0]) {
            recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
            dataR = [
              [
                {
                  Mensaje: recordsets[0][0].Mensaje,
                  Codigo: recordsets[0][0].Codigo,
                  tipoMensaje: recordsets[0][0].tipoMensaje,
                },
              ],
            ];
          }
          return { data: dataR, error: false };
        })
        .catch((err) => {
          const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
          sql.log('Error', message);
          return { data: err, error: true };
        });
    });
  return data;
};

const GuardaPoliticatratadatosService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'guardarlogappasociadotratamientodatos')
    .then(() => {

    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const preguntasseguridadService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'Pa_preguntasseguridad')
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (recordsets[0][0]) {
        recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
      }
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const SegundaClaveService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'pa_SegundaClave')
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (recordsets[0][0]) {
        recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
      }
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const ValidarsegundaClaveService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'ValidarsegundaClave')
    .then((recordsetsllega) => {
      const recordsets = recordsetsllega;
      if (recordsets[0][0]) {
        recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
      }
      return { data: recordsets, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

module.exports = {
  validarProcesosService,
  publicidadService,
  consultaCedulaUsuarioService,
  validarUUIDService,
  validarUsuarioService,
  validarRegistroUUIDService,
  guardarUUIDService,
  loginService,
  cargarDatosInicioService,
  validacionesrecuperacionService,
  recuperarClaveService,
  validarmodulosService,
  actualizarClaveService,
  BancoImagenesService,
  guardarImagenesService,
  CerrarsessionService,
  GuardaPoliticatratadatosService,
  preguntasseguridadService,
  SegundaClaveService,
  ValidarsegundaClaveService,
};
