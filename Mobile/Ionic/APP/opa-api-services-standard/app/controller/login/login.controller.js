const {
  validarProcesosService, publicidadService, consultaCedulaUsuarioService, validarUUIDService,
  validarUsuarioService, validarRegistroUUIDService, guardarUUIDService, loginService,
  validacionesrecuperacionService,
  recuperarClaveService, validarmodulosService, actualizarClaveService,
  BancoImagenesService, guardarImagenesService,
  GuardaPoliticatratadatosService,
  preguntasseguridadService,
  SegundaClaveService,
  ValidarsegundaClaveService,
  cargarDatosInicioService,
} = require('../../services/login/login.services');
const { respuestasemailSinparametrosenvio } = require('../common/functions');
const {
  makespService, makesimplequeryService,
} = require('../../services/common/common.services');
const { DEncryptarsolodato, Encryptarsolodato } = require('../../negocio/Helpers/encrypt');
const config = require('../../../config.json');

const numeroEntidad = (req, res) => {
  const numeroentidad = [config.entidad.codigo];
  res.json(numeroentidad);
};

const validarmodulos = async (req, res) => {
  const donde = req.body.dedonde ? req.body.dedonde : 'A';
  const cadena = ` select dbo.Func_Validar_Modulos_Instalados('${req.body.modulo}','${donde}')  as modulo `;
  const response = await validarmodulosService(cadena);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const validarProcesos = async (req, res) => {
  const numeroentidad = config.entidad.codigo;
  try {
    req.body.Proceso = DEncryptarsolodato(req.body.Proceso);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const cadena = `select dbo.Fn_VerificarProcesoActivo('${numeroentidad}', '${req.body.Proceso}') as procesoactivo`;
  const response = await validarProcesosService(cadena);
  if (response.error) return res.send(response.data);
  return res.json(response.data[0]);
};

const publicidad = async (req, res) => {
  const response = await publicidadService(req.body);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const consultaCedulaUsuario = async (req, res) => {
  try {
    req.body.nuevousuario = DEncryptarsolodato(req.body.nuevousuario);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  req.body.numeroentidad = config.entidad.codigo;
  const response = await consultaCedulaUsuarioService(req.body);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const validarUUID = async (req, res) => {
  let cadena = '';
  try {
    req.body.uuid = DEncryptarsolodato(req.body.uuid);
    if (req.body.esoperador === 'N') {
      req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
      cadena = `select CedulaAsociado from logDispositivoMovilUUID where CedulaAsociado='${req.body.CedulaAsociado}'`;
    } else {
      req.body.operador = DEncryptarsolodato(req.body.operador);
      cadena = `select codoperador from logDispositivoMovilUUID_SucursalMovil where codoperador='${req.body.operador}'`;
    }
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await validarUUIDService(cadena, req);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const validarRegistroUUID = async (req, res) => {
  try {
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
    req.body.Operador = DEncryptarsolodato(req.body.Operador);
    req.body.codigo = DEncryptarsolodato(req.body.codigo);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await validarRegistroUUIDService(req.body);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const guardarUUID = async (req, res) => {
  let consulta = '';
  try {
    req.body.uuid = DEncryptarsolodato(req.body.uuid);
    if (req.body.esoperador === 'S') {
      req.body.operador = DEncryptarsolodato(req.body.operador);
      consulta = `select codoperador from logDispositivoMovilUUID_SucursalMovil where codoperador='${req.body.operador}'`;
    } else {
      req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
      consulta = `select CedulaAsociado from logDispositivoMovilUUID where CedulaAsociado=${req.body.CedulaAsociado}`;
    }
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await guardarUUIDService(consulta, req);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const validarUsuario = async (req, res) => {
  try {
    req.body.operador = DEncryptarsolodato(req.body.operador);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await validarUsuarioService(req.body);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const login = async (req, res) => {
  try {
    req.body.codigo = DEncryptarsolodato(req.body.codigo);
    req.body.operador = DEncryptarsolodato(req.body.operador);
    req.body.PassWord = DEncryptarsolodato(req.body.PassWord);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await loginService(req.body, req.query);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};
// eslint-disable-next-line
const cargarDatosInicio = async (req, res) => {
  try {
    req.body.codcajero = DEncryptarsolodato(req.body.codcajero);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await cargarDatosInicioService(req.body, req.query);
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

const validacionesrecuperacion = async (req, res) => {
  try {
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
    req.body.Operador = DEncryptarsolodato(req.body.Operador);
    req.body.codigo = DEncryptarsolodato(req.body.codigo);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await validacionesrecuperacionService(req.body);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const recuperaclave = async (req, res) => {
  try {
    req.body.USUARIO = DEncryptarsolodato(req.body.USUARIO);
    req.body.CLAVE = DEncryptarsolodato(req.body.CLAVE);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await recuperarClaveService(req.body);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const actualizarClave = async (req, res) => {
  try {
    req.body.usuario = DEncryptarsolodato(req.body.usuario);
    req.body.clavenueva = DEncryptarsolodato(req.body.clavenueva);
    req.body.claveanterior = DEncryptarsolodato(req.body.claveanterior);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await actualizarClaveService(req.body);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const BancoImagenes = async (req, res) => {
  try {
    req.body.Operador = DEncryptarsolodato(req.body.Operador);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await BancoImagenesService(req.body);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const guardarImagenes = async (req, res) => {
  try {
    req.body.Operador = DEncryptarsolodato(req.body.Operador);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await guardarImagenesService(req.body);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const Cerrarsession = async (req, res) => {
  const update = `update LogueoUsuarios set estado = 'A',intentos = 0,Ingreso = 'F' where usuario = '${req.body.usuario.toString()}'`;
  const select = "SELECT  CodigoError Codigo,  MensajeError Mensaje, clasificacion tipoMensaje FROM CodigoErrorPuntoAtencion0262  WHERE CodigoError = '860'";
  const response = await makesimplequeryService('', update);
  const recordsets = response.data;
  if (!response.error) {
    const response2 = await makesimplequeryService('', select);
    const recordsets2 = response2.data;
    if (!response2.error) {
      let dataR = [];
      if (recordsets2[0][0]) {
        recordsets2[0][0].Mensaje = Encryptarsolodato(recordsets2[0][0].Mensaje);
        dataR = [
          [
            {
              Mensaje: recordsets2[0][0].Mensaje,
              Codigo: recordsets2[0][0].Codigo,
              tipoMensaje: recordsets2[0][0].tipoMensaje,
            },
          ],
        ];
        return res.json(dataR);
      }
      return res.json(recordsets);
    }
  }
  return res.json(recordsets);
};

const GuardaPoliticatratadatos = async (req, res) => {
  try {
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  return GuardaPoliticatratadatosService(req.body);
};

const preguntasseguridad = async (req, res) => {
  try {
    req.body.operador = DEncryptarsolodato(req.body.operador);
    req.body.xml = DEncryptarsolodato(req.body.xml);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await preguntasseguridadService(req.body);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const SegundaClave = async (req, res) => {
  try {
    req.body.clavenueva = DEncryptarsolodato(req.body.clavenueva);
    req.body.usuario = DEncryptarsolodato(req.body.usuario);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await SegundaClaveService(req.body);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const ValidarsegundaClave = async (req, res) => {
  try {
    req.body.cedula = DEncryptarsolodato(req.body.cedula);
    req.body.clave = DEncryptarsolodato(req.body.clave);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await ValidarsegundaClaveService(req.body);
  if (response.error) return res.send(response.data);
  return res.json(response.data);
};

const Listausuarios = async (req, res) => {
  try {
    req.body.cedula = DEncryptarsolodato(req.body.cedula);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await makespService(req.body, 'pa_BusquedaAsociadosMovil');
  // console.log(response);
  if (!response.error) {
    if (response.data[0][0]) {
      response.data[0][0].Mensaje = Encryptarsolodato(response.data[0][0].Mensaje);
      let empieza = 0;
      const cuantos = response.data[0].length;
      while (empieza >= 0 && empieza < cuantos) {
        response.data[0][empieza].KEY = Encryptarsolodato(response.data[0][empieza].KEY);
        response.data[0][empieza].VALUE = Encryptarsolodato(response.data[0][empieza].VALUE);
        empieza += 1;
      }
    }
  }
  return res.json(response.data);
};

const DatosAsociados = async (req, res) => {
  try {
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await makespService(req.body, 'SucursalMovilDatosGenerales');
  if (!response.error) {
    if (response.data[1]) {
      const numeroError = response.data[1][0].Codigo.toString() === '416' ? 404 : 500;

      const responseError = [
        [
          {
            Mensaje: response.data[1][0].Mensaje,
            codigo: response.data[1][0].Codigo,
            tipoMensaje: 'E',
          },
        ],
      ];

      return res.status(numeroError).send(responseError);
    } if (response.data[0][0]) {
      response.data[0][0].Mensaje = Encryptarsolodato(response.data[0][0].Mensaje);
      response.data[0][0].codigoasociado = Encryptarsolodato(response.data[0][0].codigoasociado);
      response.data[0][0].direccion = Encryptarsolodato(response.data[0][0].direccion);
      response.data[0][0].email = Encryptarsolodato(response.data[0][0].email);
      response.data[0][0].nit = Encryptarsolodato(response.data[0][0].nit);
      response.data[0][0].nombreintegrado = Encryptarsolodato(response.data[0][0].nombreintegrado);
      response.data[0][0].nombreciudad = Encryptarsolodato(response.data[0][0].nombreciudad);
      response.data[0][0].telefono1 = Encryptarsolodato(response.data[0][0].telefono1);
      response.data[0][0].celular = Encryptarsolodato(response.data[0][0].celular);
      response.data[0][0].fechanacimiento = Encryptarsolodato(response.data[0][0].fechanacimiento);
    }
  }

  return res.json(response.data);
};

const NotasHistoricas = async (req, res) => {
  const { cedulasociado } = req.body;
  const cadena = `select historia from notashistoricas where cedulasociado=${cedulasociado}`;
  const response = await makesimplequeryService('', cadena);
  const recordsets = response.data;
  const datatiempo = [
    [
      {
        Mensaje: 'Error no se pudo realizar el proceso verifique con el administrador...',
        Codigo: '999',
        tipoMensaje: 'E',
      },
    ],
  ];
  if (!response.error) {
    if (recordsets[0]) {
      recordsets[0].historia = Encryptarsolodato(recordsets[0].historia);
    }
    return res.json(recordsets);
  }
  datatiempo[0][0].Mensaje = Encryptarsolodato(datatiempo[0][0].Mensaje);
  return res.send(datatiempo).end();
};

const ConsultarParentesco = async (req, res) => {
  const cadena = 'select codigo,nombre from parentesco';
  const response = await makesimplequeryService('', cadena);
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

const procesabeneficiarios = async (req, res) => {
  const response = await makespService(req.body, 'PA_ProcesarBeneficiariosSucursalMovil');
  const recordsets = response.data;
  if (!response.error) {
    if (recordsets[0][0]) {
      recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);

      if (recordsets[0][0].CedulaAsociado !== undefined) {
        for (let i = 0; i < recordsets[0].length; i += 1) {
          recordsets[0][i].CedulaAsociado = Encryptarsolodato(recordsets[0][i].CedulaAsociado);
          recordsets[0][i].CedulaBeneficiario = Encryptarsolodato(
            recordsets[0][i].CedulaBeneficiario.toString(),
          );
          recordsets[0][i].nombre = Encryptarsolodato(recordsets[0][i].nombre);
        }
      }
    }
  }
  return res.json(recordsets);
};

const recordarusuario = async (req, res) => {
  req.body.cedula = DEncryptarsolodato(req.body.cedula);
  req.body.celular = DEncryptarsolodato(req.body.celular);
  const response = await makespService(req.body, 'pa_recordarusuario');
  const recordsets = response.data;
  if (!response.error) {
    let data;
    if (recordsets[0][0].codigo !== '855') {
      await respuestasemailSinparametrosenvio(recordsets, 'recordarusuario');
      data = [
        [
          {
            Mensaje: recordsets[0][0].Mensaje,
            codigo: recordsets[0][0].codigo,
            tipoMensaje: recordsets[0][0].tipoMensaje,
          },
        ],
      ];
    } else {
      data = [
        [
          {
            Mensaje: Encryptarsolodato(recordsets[0][0].Mensaje),
            codigo: recordsets[0][0].codigo,
            tipoMensaje: recordsets[0][0].tipoMensaje,
          },
        ],
      ];
    }
    return res.json(data);
  }
  return res.json(recordsets);
};

const nuevousuario = async (req, res) => {
  try {
    req.body.cedula = DEncryptarsolodato(req.body.cedula);
    req.body.celular = DEncryptarsolodato(req.body.celular);
    req.body.codigo = DEncryptarsolodato(req.body.codigo);
    req.body.contrasena = DEncryptarsolodato(req.body.contrasena);
    req.body.nuevousuario = DEncryptarsolodato(req.body.nuevousuario);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  // console.log(req.body.contrasena) // para ver que datos trae

  const response = await makespService(req.body, 'pa_nuevousuario');
  const recordsets = response.data;
  if (!response.error) {
    let data;
    if (recordsets[0][0].codigo === 'GEN') {
      await respuestasemailSinparametrosenvio(recordsets, 'nuevousuario');
      data = [
        [
          {
            Mensaje: recordsets[0][0].Mensaje,
            codigo: recordsets[0][0].codigo,
            tipoMensaje: recordsets[0][0].tipoMensaje,
          },
        ],
      ];
    } else {
      data = [
        [
          {
            Mensaje: Encryptarsolodato(recordsets[0][0].Mensaje),
            codigo: recordsets[0][0].codigo,
            tipoMensaje: recordsets[0][0].tipoMensaje,
          },
        ],
      ];
    }
    return res.json(data);
  }
  return res.json(recordsets);
};

const operadores = async (req, res) => {
  const cadena = 'select COUNT(lu.idregistro) as operadores from operador o '
    + 'inner join LogueoUsuarios lu on lu.usuario=o.codoperador '
    + 'inner join OperadorBancaMovil opb on opb.Idoperador=o.idoperador '
    + "where lu.tipousuario='O' and lu.FechaultimoIngreso is not null";
  const response = await makesimplequeryService('', cadena);
  const recordsets = response.data;
  if (!response.error) {
    return res.json(recordsets);
  }
  const datatiempo = [
    [
      {
        Mensaje: 'Error de ejecución',
        Codigo: '999',
        tipoMensaje: 'E',
      },
    ],
  ];
  return res.send(datatiempo).end();
};

const rangos = async (req, res) => {
  const select = 'select Rango from Rangos';
  let cadena = '';
  const response = await makesimplequeryService('', select);
  const recordsets = response.data;
  if (!response.error) {
    if (recordsets[0]) {
      cadena = `update Rangos set Rango=${req.body.Rango} select @@ROWCOUNT resultado`;
    } else {
      cadena = `insert into Rangos values ((select codigo from compania), ${req.body.Rango}, 'A') select @@ROWCOUNT resultado`;
      const response2 = await makesimplequeryService('', cadena);
      const recordsets2 = response2.data;
      if (!response.error) {
        if (recordsets2[0].resultado === 1) {
          return res.send('Rangos Actualizados');
        }
      }
      return res.json(recordsets2);
    }
  }
  return res.json(recordsets);
};

const consultaoperador = async (req, res) => {
  try {
    req.body.operador = DEncryptarsolodato(req.body.operador);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const consulta = `${'select op.codoperador from OperadorBancaMovil ob'
    + ' inner join operador op on ob.Idoperador=op.idoperador'
    + " where op.codoperador='"}${req.body.operador}'`;
  const response = await makesimplequeryService('', consulta);
  let recordsets = response.data;
  if (!response.error) {
    if (recordsets[0].length > 0) {
      recordsets[0][0].codoperador = Encryptarsolodato(recordsets[0][0].codoperador);
    } else {
      recordsets = '0';
    }
    return res.json(recordsets[0]);
  }
  return res.json(recordsets);
};

module.exports = {
  numeroEntidad,
  validarProcesos,
  publicidad,
  consultaCedulaUsuario,
  validarUUID,
  validarUsuario,
  login,
  cargarDatosInicio,
  validarRegistroUUID,
  guardarUUID,
  validacionesrecuperacion,
  recuperaclave,
  validarmodulos,
  actualizarClave,
  BancoImagenes,
  guardarImagenes,
  Cerrarsession,
  GuardaPoliticatratadatos,
  preguntasseguridad,
  SegundaClave,
  ValidarsegundaClave,
  Listausuarios,
  DatosAsociados,
  NotasHistoricas,
  ConsultarParentesco,
  procesabeneficiarios,
  recordarusuario,
  nuevousuario,
  operadores,
  rangos,
  consultaoperador,
};
