const moment = require('moment');
const jwt = require('jwt-simple');
const nodeCryptojs = require('node-cryptojs-aes');
const config = require('../../../config.json');
const { DEncryptarsolodato, Encryptarsolodato, Encryptar } = require('../../negocio/Helpers/encrypt');
const { respuestasemail } = require('../common/functions');
const { respuestasemailSinparametrosenvio } = require('../common/functions');
const {
  makespService, makesimplequeryService,
} = require('../../services/common/common.services');
const { enviarmail } = require('../../negocio/Helpers/enviarmail');
// eslint-disable-next-line
const codigoscajaparaTransacciones = async (req, res) => {
  try {
    req.body.codoperador = DEncryptarsolodato(req.body.codoperador);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await makespService(req.body, 'BuscarProductosParaTransaccionesopamovil');
  if (!response.error) {
    if (response.data[0][0]) {
      response.data[0][0].Mensaje = Encryptarsolodato(response.data[0][0].Mensaje);
    }
  }
  res.json(response.data);
};

const transaccionproducto = async (req, res) => {
  try {
    req.body.CedulaAsociado = DEncryptarsolodato(req.body.CedulaAsociado);
    if (req.body.Linea !== undefined) {
      req.body.Linea = DEncryptarsolodato(req.body.Linea);
    }
    if (req.body.NumeroCuenta !== undefined) {
      req.body.NumeroCuenta = DEncryptarsolodato(req.body.NumeroCuenta);
    }
    req.body.operador = DEncryptarsolodato(req.body.operador);
    if (req.body.Pagare !== undefined) {
      req.body.Pagare = DEncryptarsolodato(req.body.Pagare);
    }
    req.body.Tipo = DEncryptarsolodato(req.body.Tipo);
    req.body.Tiporegistro = DEncryptarsolodato(req.body.Tiporegistro);
    req.body.Valor = DEncryptarsolodato(req.body.Valor);
    if (req.body.Codnovedad !== undefined) {
      req.body.Codnovedad = DEncryptarsolodato(req.body.Codnovedad);
      req.body.Tiponovedad = DEncryptarsolodato(req.body.Tiponovedad);
      req.body.consecutivo = DEncryptarsolodato(req.body.consecutivo);
    }
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }

  const response = await makespService(req.body, 'Pa_transaccionproducto');
  if (!response.error) {
    if (response.data[0][0]) {
      const Respuesta = await respuestasemail(response.data);
      const respuesta2 = Respuesta.data;
      respuesta2[0][0].Codigo = Encryptarsolodato(response.data[0][0].Codigo);
      respuesta2[0][0].datosEntidad = Encryptarsolodato(response.data[0][0].datosEntidad);
      respuesta2[0][0].messageBody = Encryptarsolodato(response.data[0][0].messageBody);

      const datadevuelve = [
        [
          {
            reimprime: respuesta2[0][0].reimprime,
            datosEntidad: respuesta2[0][0].datosEntidad,
            messageBody: respuesta2[0][0].messageBody,
            Mensaje: respuesta2[0][0].Mensaje,
            Codigo: respuesta2[0][0].Codigo,
            tipoMensaje: 'I',
          },
        ]];

      return res.json(datadevuelve);
    }
    const dataterror = [
      [
        {
          Mensaje: 'Error al procesar la transaccion porfa vor verifique...',
          Codigo: '999',
          tipoMensaje: 'E',
        },
      ],
    ];

    dataterror[0][0].Mensaje = Encryptarsolodato(dataterror[0][0].Mensaje);
    return res.send(dataterror);
  }
  return res.json(response.data);
};

const consultasvarias = async (req, res) => {
  const response = await makespService(req.body, 'pa_consultasvarias');
  if (!response.error) {
    if (response.data[0][0]) {
      response.data[0][0].Mensaje = Encryptarsolodato(response.data[0][0].Mensaje);
    }
  }
  res.json(response.data);
};
// eslint-disable-next-line
const CreacionProductos = async (req, res) => {
  let procedure = '';
  let parameters = {};
  try {
    req.body.Tipo = DEncryptarsolodato(req.body.Tipo);
    if (req.body.Tipo === 'APORTE') {
      procedure = 'CrearAporteSOpaMovil';
      parameters = {
        CedulaFBO: DEncryptarsolodato(req.body.CedulaAsociado),
        FechaTrabajoFBO: new Date(),
        OperadorFBO: DEncryptarsolodato(req.body.operador),
        formapagoaporte: DEncryptarsolodato(req.body.formapago),
        lineadelaporte: DEncryptarsolodato(req.body.Linea),
        valorcuotaJD: DEncryptarsolodato(req.body.Cuota),
      };
    }
    if (req.body.Tipo === 'AHORRO') {
      procedure = 'CrearAhorrosalavistasegunlineaOpaMovil';

      parameters = {
        CedulaAsociado: DEncryptarsolodato(req.body.CedulaAsociado),
        FechaActualizacion: new Date(),
        operadorFBO: DEncryptarsolodato(req.body.operador),
        LineaAhorros: DEncryptarsolodato(req.body.Linea),
        cuota: DEncryptarsolodato(req.body.Cuota),
        formapago: DEncryptarsolodato(req.body.formapago),
        Error: '000',
        dedondeviene: 'P',
        plazo: DEncryptarsolodato(req.body.Plazo),
        tipoahorro: DEncryptarsolodato(req.body.Tipoahorro),
      };
      if (parameters.tipoahorro !== 'AC') {
        parameters.plazo = 0;
      }
    }

    if (req.body.Tipo === 'NOVEDA') {
      req.body.fechainiciodeduccion = DEncryptarsolodato(req.body.fechainiciodeduccion);
      const date = moment(req.body.fechainiciodeduccion.toString()).format();
      procedure = 'PA_crearnovedadesOPaMovil';

      parameters = {
        Codoperador: DEncryptarsolodato(req.body.operador),
        cedulasociado: DEncryptarsolodato(req.body.CedulaAsociado),
        cuota: DEncryptarsolodato(req.body.Cuota),
        codnovedad: DEncryptarsolodato(req.body.codnovedad),
        fechainiciodeduccion: new Date(date),
        formapago: DEncryptarsolodato(req.body.formapago),
        estado: 'A',
        tiponovedad: DEncryptarsolodato(req.body.tiponovedad),
        quesehace: DEncryptarsolodato(req.body.quesehace),
        saldo: DEncryptarsolodato(req.body.saldo),
        consecutivo: '',
        saldoinicial: DEncryptarsolodato(req.body.saldo),

      };

      if (parameters.quesehace === 'Insert') {
        parameters.estado = 'A';
        parameters.fechainiciodeduccion = null;
      }
      if (parameters.quesehace === 'INSERT') {
        parameters.estado = 'A';
        parameters.fechainiciodeduccion = null;
      }
    }
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await makespService(parameters, procedure);
  if (!response.error) {
    if (response.data[0][0]) {
      response.data[0][0].Mensaje = Encryptarsolodato(response.data[0][0].Mensaje);
    }
  }
  res.json(response.data);
};
// eslint-disable-next-line
const Datosreimpresiontraopamovil = async (req, res) => {
  const date = moment(req.body.FechaFin.toString()).format();
  const date1 = moment(req.body.Fechaini.toString()).format();
  try {
    req.body.cedula = DEncryptarsolodato(req.body.cedula);
    req.body.operador = DEncryptarsolodato(req.body.operador);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const parameters = {
    cedula: req.body.cedula,
    FechaFin: new Date(date),
    Fechaini: new Date(date1),
    operador: req.body.operador,
    RegistroEmpezar: req.body.RegistroEmpezar,
    RegistroMostrar: req.body.RegistroMostrar,
  };
  const response = await makespService(parameters, 'pa_Datosreimpresiontraopamovil');
  if (!response.error) {
    if (response.data[0][0]) {
      response.data[0][0].Mensaje = Encryptarsolodato(response.data[0][0].Mensaje);
    }
  }
  res.json(response.data);
};
// eslint-disable-next-line
const Informecuadrecajero = async (req, res) => {
  try {
    req.body.fechafiltra = new Date(moment(req.body.fechafiltra.toString()).format());
    req.body.Operador = DEncryptarsolodato(req.body.Operador);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await makespService(req.body, 'PA_Informecuadrecajero');
  if (!response.error) {
    if (response.data[0][0]) {
      response.data[0][0].Mensaje = Encryptarsolodato(response.data[0][0].Mensaje);
    }
  }
  res.json(response.data);
};
// eslint-disable-next-line
const datosasociadosparaactualizar = async (req, res) => {
  try {
    req.body.cedula = DEncryptarsolodato(req.body.cedula);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await makespService(req.body, 'traerdatosasociados');
  if (!response.error) {
    if (response.data[0][0]) {
      response.data[0][0].Mensaje = Encryptarsolodato(response.data[0][0].Mensaje);
      response.data[0][0].celular = Encryptarsolodato(response.data[0][0].celular);
      response.data[0][0].direccion = Encryptarsolodato(response.data[0][0].direccion);
      response.data[0][0].email = Encryptarsolodato(response.data[0][0].email);
      response.data[0][0].enviocorrespondencia = Encryptarsolodato(
        response.data[0][0].enviocorrespondencia,
      );
      response.data[0][0].nit = Encryptarsolodato(response.data[0][0].nit);
      response.data[0][0].nombreintegrado = Encryptarsolodato(response.data[0][0].nombreintegrado);
      response.data[0][0].primerapellido = Encryptarsolodato(response.data[0][0].primerapellido);
      response.data[0][0].segundoapellido = Encryptarsolodato(response.data[0][0].segundoapellido);
      response.data[0][0].segundonombre = Encryptarsolodato(response.data[0][0].segundonombre);
      response.data[0][0].telefono1 = Encryptarsolodato(response.data[0][0].telefono1);
    }
  }
  res.json(response.data);
};
// eslint-disable-next-line
const procesarNitsVsAsociados = async (req, res) => {
  try {
    req.body.cedulaanterior = DEncryptarsolodato(req.body.cedulaanterior);
    req.body.ip = DEncryptarsolodato(req.body.ip);
    req.body.operador = DEncryptarsolodato(req.body.operador);
    req.body.Socios = DEncryptarsolodato(req.body.Socios);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await makespService(req.body, 'PA_procesarNitsVsAsociados');
  if (!response.error) {
    if (response.data[0][0]) {
      response.data[0][0].nit = Encryptarsolodato(response.data[0][0].nit);
      response.data[0][0].Mensaje = Encryptarsolodato(response.data[0][0].Mensaje);
    }
  }
  res.json(response.data);
};
// eslint-disable-next-line
const vervalidaciontran = async (req, res) => {
  try {
    req.body.cedulasociado = DEncryptarsolodato(req.body.cedulasociado);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const sc = req.body.sc || '';
  const codigo = req.body.codigo || '';
  let data = '';
  let datacodigo = '';
  let decrypted = '';
  let cip = '';
  const { CryptoJS } = nodeCryptojs;

  if (codigo !== '') {
    cip = codigo;
    decrypted = CryptoJS.AES.decrypt(cip, 'opaApp');
    datacodigo = CryptoJS.enc.Utf8.stringify(decrypted);
  }

  if (sc !== '') {
    cip = sc;
    decrypted = CryptoJS.AES.decrypt(cip, 'opaApp');
    data = CryptoJS.enc.Utf8.stringify(decrypted);
  }

  const cedulasociado = req.body.cedulasociado || '';
  const paso = req.body.paso || '';
  let cons = '';
  if (paso === '1') {
    cons = 'select ltrim(rtrim(ValidacionTran)) ValidacionTran ,ltrim(rtrim(ManejaSegundaClaveTranAsociado)) ManejaSegundaClaveTranAsociado,ltrim(rtrim(Controlahorros)) Controlahorros,ltrim(rtrim(Controlcreditos)) Controlcreditos,ltrim(rtrim(Controlnovedades)) Controlnovedades,ltrim(rtrim(ControlaRetiros)) ControlaRetiros,ltrim(rtrim(ControlaConsignaciones))  ControlaConsignaciones from SucursalVirtualmovilParametros';
  }
  if (paso === '2') {
    cons = `select cedulasociado from SegundaClaveTranAsociado where cedulasociado=${cedulasociado}`;
  }
  if (paso === '3') {
    cons = `select cedulasociado from SegundaClaveTranAsociado where CONVERT(VARCHAR(300),DECRYPTBYPASSPHRASE(DBO.Fc_ReturnSpecialKey(),segundaclaveTran))='${data}' and cedulasociado=${cedulasociado}`;
  }

  if (paso === '4') {
    if (config.entidad.codigo === '0052') {
      try {
        req.body.operador = DEncryptarsolodato(req.body.operador);
      } catch (error) {
        return res.status(500).json('Error en el cuerpo de la petición');
      }
      const { operador } = req.body;
      cons = `${'SELECT cedulasociado,DATEDIFF(SECOND, Fechageneracion, GETDATE()) - (select  vigenciaCodigotran from operador o '
        + "inner join ParametrosSeguridadOperador p on p.IDOperador = o.idoperador  where o.codoperador = '"}${operador}') segundos, `
        + `(select  vigenciaCodigotran from operador o inner join ParametrosSeguridadOperador p on p.IDOperador = o.idoperador  where o.codoperador = '${operador}') tiempoparametro `
        + `FROM CodigoTranAsociado where CONVERT(VARCHAR(300),DECRYPTBYPASSPHRASE(DBO.Fc_ReturnSpecialKey(),CodigoTran))='${datacodigo}' and cedulasociado=${cedulasociado}`;
    } else {
      cons = `SELECT cedulasociado FROM CodigoTranAsociado where CONVERT(VARCHAR(300),DECRYPTBYPASSPHRASE(DBO.Fc_ReturnSpecialKey(),CodigoTran))='${datacodigo}' and cedulasociado=${cedulasociado}`;
    }
  }

  if (paso === '10') {
    cons = 'SELECT cedulasociado,DATEDIFF(SECOND, Fechageneracion, GETDATE()) - (select TipoVencimiento from ParametroEfecty) segundos,'
    + `(select TipoVencimiento from ParametroEfecty) tiempoparametro FROM CodigoTranAsociado where  cedulasociado=${cedulasociado}`;
  }

  if (paso === '5') {
    cons = `SELECT cedulasociado FROM CodigoTranAsociado where cedulasociado=${cedulasociado}`;
  }

  if (paso === '6') {
    cons = `SELECT email,celular FROM nits where nit=${cedulasociado}`;
  }

  if (paso === '9') {
    cons = `select count(nit) as Personajuridica from personasjuridicas where nit=${cedulasociado}`;
  }

  const response = await makesimplequeryService(req.body, cons);
  const recordsets = response.data;
  if (!response.error) {
    if (recordsets.length > 0) {
      if (config.entidad.codigo === '0052') {
        if (paso === '4') {
          const recordsetsData = recordsets[0][0];
          if (recordsetsData === undefined) {
            return res.send({
              Codigo: '999',
              Mensaje: 'Codigo incorrecto, intente nuevamente',
              tipoMensaje: 'I',
            });
          }
          if (recordsetsData.tiempoparametro !== undefined) {
            if (recordsetsData.tiempoparametro !== 0 && recordsetsData.tiempoparametro != null) {
              recordsetsData.tiempoparametro *= 60;
              if (recordsetsData.segundos >= recordsetsData.tiempoparametro) {
                return res.send({
                  Codigo: '999',
                  Mensaje: 'Su código Expiro, por favor intente de nuevo realizar su transacción',
                  tipoMensaje: 'I',
                });
              }
            }
          } else {
            return res.send({
              Codigo: '999',
              Mensaje: 'Codigo incorrecto',
              tipoMensaje: 'I',
            });
          }
        }
      }
    }
    if (recordsets.lenghth > 0) {
      if (paso === '5' || paso === '4' || paso === '10') {
        const recordsetsData = recordsets[0][0];
        recordsetsData.cedulasociado = Encryptarsolodato(recordsetsData.cedulasociado);
      }
    }
  }
  res.json(recordsets[0]);
};

const generarcodigotran = async (req, res) => {
  const numeroentidad = config.entidad.codigo;
  try {
    req.body.cedulasociado = DEncryptarsolodato(req.body.cedulasociado);
    if (numeroentidad === '0052') {
      req.body.operador = DEncryptarsolodato(req.body.operador);
    }
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await makespService(req.body, 'pa_crear_codigo');
  const recordsets = response.data;
  if (!response.error) {
    if (!recordsets[0]) {
      return res.json(recordsets);
    }
    const Respuesta = await respuestasemailSinparametrosenvio(recordsets, 'generarcodigotran');
    return res.json(Respuesta.data);
  }
  return res.json(recordsets);
};

const validar = async (req, res) => {
  try {
    req.body.usuario = DEncryptarsolodato(req.body.usuario);
    req.body.clave = DEncryptarsolodato(req.body.clave);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
  const response = await makespService(req.body, 'pa_validarusuarios');
  const recordsets = response.data;
  if (!response.error) {
    const expires = moment()
      .add(999, 'minutes')
      .valueOf();
    const payload = expires;

    const token = jwt.encode(payload, 'Op4*5asAPP,.');
    recordsets[0][0].token = token;

    Encryptar(recordsets);
  }
  return res.json(recordsets);
};

const traerdatoscreacionahofecsa = async (req, res) => {
  const response = await makespService(req.body.params, 'Pa_traerdatoscreacionahofecsa');
  const recordsets = response.data;
  if (!response.error) {
    recordsets[0][0].Nombre = Encryptarsolodato(recordsets[0][0].Nombre);
    recordsets[0][0].tipo = Encryptarsolodato(recordsets[0][0].tipo);
    recordsets[0][0].correo = Encryptarsolodato(recordsets[0][0].correo);
    recordsets[1][0].nombreintegrado = Encryptarsolodato(recordsets[1][0].nombreintegrado);
    recordsets[1][0].email = Encryptarsolodato(recordsets[1][0].email);
    recordsets[1][0].celular = Encryptarsolodato(recordsets[1][0].celular);
    recordsets[1][0].nombreempresa = Encryptarsolodato(recordsets[1][0].nombreempresa);
    recordsets[1][0].nombreciudad = Encryptarsolodato(recordsets[1][0].nombreciudad);
    recordsets[1][0].cedula = Encryptarsolodato(recordsets[1][0].cedula);
    recordsets[2][0].numerocuenta = Encryptarsolodato(recordsets[2][0].numerocuenta);
    recordsets[2][0].formapago = Encryptarsolodato(recordsets[2][0].formapago);
    recordsets[2][0].tipoaporte = Encryptarsolodato(recordsets[2][0].tipoaporte);

    const data = [
      [
        {
          Nombre: recordsets[0][0].Nombre,
          tipo: recordsets[0][0].tipo,
          correo: recordsets[0][0].correo,
          codlinea: recordsets[0][0].codlinea,
        },
      ],
      [
        {
          nombreintegrado: recordsets[1][0].nombreintegrado,
          email: recordsets[1][0].email,
          celular: recordsets[1][0].celular,
          nombreempresa: recordsets[1][0].nombreempresa,
          nombreciudad: recordsets[1][0].nombreciudad,
          cedula: recordsets[1][0].cedula,
        },
      ],
      [
        {
          numerocuenta: recordsets[2][0].numerocuenta,
          formapago: recordsets[2][0].formapago,
          valorcuota: recordsets[2][0].valorcuota,
          plazo: recordsets[2][0].plazo,
          tipoaporte: recordsets[2][0].tipoaporte,
          idahorros: recordsets[2][0].idahorros,
          codigo: recordsets[2][0].codigo,
        },
      ],
    ];

    // se encripta el resto del Array y se inserta en la data, por eso se comienza con 1
    let empieza = 1;
    const cuantos = recordsets[2].length;
    while (empieza >= 0 && empieza < cuantos) {
      recordsets[2][empieza].numerocuenta = Encryptarsolodato(
        recordsets[2][empieza].numerocuenta,
      );
      recordsets[2][empieza].formapago = Encryptarsolodato(
        recordsets[2][empieza].formapago,
      );
      recordsets[2][empieza].tipoaporte = Encryptarsolodato(
        recordsets[2][empieza].tipoaporte,
      );
      let data2 = [];
      data2 = [
        {
          numerocuenta: recordsets[2][empieza].numerocuenta,
          formapago: recordsets[2][empieza].formapago,
          valorcuota: recordsets[2][empieza].valorcuota,
          plazo: recordsets[2][empieza].plazo,
          tipoaporte: recordsets[2][empieza].tipoaporte,
          idahorros: recordsets[2][empieza].idahorros,
          codigo: recordsets[2][empieza].codigo,
        },

      ];
      data[2].push(data2[0]);
      empieza += 1;
    }
    return res.json(data);
  }
  return res.json(recordsets);
};

const crearsolicitud = async (req, res) => {
  let NOTIFICACION = '';
  if (req.body.params.quehace === 'M') {
    req.body.params.quehace = 'Modificación';
    NOTIFICACION = 'SOLICITUD MODIFICACION DE AHORROS';
  } else {
    req.body.params.quehace = 'Apertura';
    NOTIFICACION = 'SOLICITUD CREACION DE AHORROS';
  }

  if (req.body.params.formapago === 'T') {
    req.body.params.formapago = 'Taquilla';
  } else {
    req.body.params.formapago = 'Nomina';
  }

  await enviarmail(
    req.body.params.email,
    NOTIFICACION,
    `El Asociado: ${req.body.params.nombreintegrado}, `
    + ` de numero de identificacion: ${req.body.params.cedula}, `
    + ' Realizo una solicitud del Auxilio.'
    + ` Hemos recibido exitosamente tu solicitud de creacion de ahorro ${req.body.params.codlinea.Nombre
    }. Proximamente te contactaremos!. `,
  );

  if (req.body.params.codlinea.tipo === 'AC') {
    await enviarmail(
      req.body.params.codlinea.correo,
      NOTIFICACION,
      ` Asociado: ${req.body.params.nombreintegrado}, `
      + ` Numero de identificacion: ${req.body.params.cedula}, `
      + ` correo: ${req.body.params.email}, `
      + ` celular: ${req.body.params.celular}, `
      + ` Empresa en la cual trabaja: ${req.body.params.nombreempresa}, `
      + ` Localidad: ${req.body.params.nombreciudad}, `
      + ` Solicitud: ${req.body.params.quehace}, `
      + ` Linea ${req.body.params.codlinea.Nombre}, `
      + ` Número de cuenta: ${req.body.params.numerocuenta}, `
      + ` Forma de pago: ${req.body.params.formapago}, `
      + ` Valor Mensual de la cuota: ${req.body.params.cuota}, `
      + ` Plazo ${req.body.params.Plazo}, `
      + ' Tipo de cuota: '
      + ' Fija ',
    );
  } else {
    await enviarmail(
      req.body.params.codlinea.correo,
      NOTIFICACION,
      ` Asociado: ${req.body.params.nombreintegrado}, `
      + ` Numero de identificacion: ${req.body.params.cedula}, `
      + ` correo: ${req.body.params.email}, `
      + ` celular: ${req.body.params.celular}, `
      + ` Empresa en la cual trabaja: ${req.body.params.nombreempresa}, `
      + ` Localidad: ${req.body.params.nombreciudad}, `
      + ` Solicitud: ${req.body.params.quehace}, `
      + ` Linea ${req.body.params.codlinea.Nombre}, `
      + ` Número de cuenta: ${req.body.params.numerocuenta}, `
      + ` Forma de pago: ${req.body.params.formapago}, `
      + ` Valor Mensual de la cuota: ${req.body.params.cuota}`,

    );
  }

  const mensaje = `Solicitud de ${req.body.params.quehace} enviada correctamente`;

  const mensaje1 = Encryptarsolodato(mensaje);

  res.send([[{
    Codigo: '000',
    Mensaje: mensaje1,
    tipoMensaje: 'I',
  }]]);
};

const ActiveRequests = async (req, res) => {
  try {
    const { identification } = req.body;
    const query = `select top 1 t2.sexo as gender from SucursalMovilLSolicitudesDeCreditos t1 
    inner join asociados t2 on t1.cedula = t2.cedulasociado 
    where t1.cedula = ${identification} and t1.estado not in ('AN','DB')`;
    const response = await makesimplequeryService(identification, query);
    if (response.error) return res.send(response.data);
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json('Error en el cuerpo de la petición');
  }
};

module.exports = {
  codigoscajaparaTransacciones,
  transaccionproducto,
  consultasvarias,
  CreacionProductos,
  Datosreimpresiontraopamovil,
  Informecuadrecajero,
  datosasociadosparaactualizar,
  procesarNitsVsAsociados,
  vervalidaciontran,
  generarcodigotran,
  validar,
  traerdatoscreacionahofecsa,
  crearsolicitud,
  ActiveRequests,
};
