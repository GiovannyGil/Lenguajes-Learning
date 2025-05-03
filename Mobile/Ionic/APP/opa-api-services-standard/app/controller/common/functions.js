const { enviarmail } = require('../../negocio/Helpers/enviarmail');
const { Encryptarsolodato } = require('../../negocio/Helpers/encrypt');
const config = require('../../../config.json');
const { enviarsms } = require('../../negocio/Helpers/enviarsms');

const enviarmailService = async (parameters) => ({ data: parameters, error: true });
// console.log(parameters, 'emailSERVIE');
// const model1 = await model;
// const data = await model1
//   .consulta('', parameters)
//   .then(() => {    })
//   .catch((err) => {
//     const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}
// \n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
//     sql.log("Error", message);
//     return { data: err, error: true };
//   });

const respuestasemail = async (recordsetsllega) => {
  const recordsets = recordsetsllega;
  if (!recordsets[0]) {
    return [];
  }

  const replaceAsterisco = /\*/g;
  const remplaceO = new RegExp('ó', 'gi');
  const remplacee = new RegExp('é', 'gi');

  //  console.log(recordsets[0][0].messageBody)
  if (recordsets[0][0].email === 'S') {
    if (recordsets[0][0].messageBody.indexOf(config.entidad.nombre) <= -1) {
      recordsets[0][0].messageBody
        .replace(replaceAsterisco, ' ')
        .replace(remplaceO, 'o');
      await enviarmail(
        recordsets[0][0].directionEmail,
        recordsets[0][0].subject
          .replace(replaceAsterisco, ' ')
          .replace(remplaceO, 'o'),
        recordsets[0][0].messageBody
          .replace(replaceAsterisco, ' ')
          .replace(remplaceO, 'o'),
      );
    } else {
      await enviarmail(
        recordsets[0][0].directionEmail,
        recordsets[0][0].subject
          .replace(replaceAsterisco, ' ')
          .replace(remplaceO, 'o'),
        recordsets[0][0].messageBody
          .replace(replaceAsterisco, ' ')
          .replace(remplaceO, 'o'),
      );
    }
  }
  if (recordsets[0][0].textMessage === 'S') {
    let MensajeSMMV = '';

    if (recordsets[0][0].messageBodySMS.indexOf(config.entidad.nombre) <= -1) {
      MensajeSMMV = `${config.entidad.nombre}:${recordsets[0][0].messageBodySMS}`
        .replace(replaceAsterisco, ' ')
        .replace(remplaceO, 'o')
        .replace(remplacee, 'e')
        .replace(/Ñ/g, 'N');
    } else {
      MensajeSMMV = recordsets[0][0].messageBodySMS
        .replace(replaceAsterisco, ' ')
        .replace(remplaceO, 'o')
        .replace(remplacee, 'e')
        .replace(/Ñ/g, 'N');
    }

    if (config.entidad.codigo !== '0180') {
      if (recordsets[0][0].number !== '') {
        await enviarsms(MensajeSMMV, recordsets[0][0].number);
      }
    }
  }
  if (
    recordsets[0][0].messageBody !== undefined
    && recordsets[0][0].messageBody.substr(0, 16) !== 'Número de recibo'
    && recordsets[0][0].messageBody.substr(0, 16) !== 'Numero de recibo'
  ) {
    recordsets[0][0].messageBody = '';
    recordsets[0][0].messageBodySMS = '';
  } else if (
    recordsets[0][0].messageBody !== undefined
    && recordsets[0][0].messageBody.substr(0, 16) === 'Número de recibo'
  ) {
    recordsets[0][0].Mensaje = recordsets[0][0].Mensaje.replace(/\*/g, '\n');
  }

  recordsets[0][0].directionEmail = '';
  if (recordsets[0][0]) {
    recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
  }
  return { data: recordsets, error: false };
};

const respuestasemailSinparametrosenvio = async (objllega, dedonde) => {
  let obj = objllega;
  if (objllega.dataenvia !== undefined) {
    obj = objllega.dataenvia;
  }
  let { correoasociado } = obj[0][0];
  let { celularasociado } = obj[0][0];
  const compania = config.entidad.nombre;
  let datares = [];

  let cabeceraEmailJD = '';
  let cuerpoemailJD = '';
  let MensajeSMMV = '';
  let messageBodySMS = '';
  const replaceAsterisco = /\*/g;
  const remplaceO = new RegExp('ó', 'gi');

  if (dedonde === 'ReservasVAcasionales') {
    await enviarmail(
      obj[0][0].correoReceptor,
      'NOTIFICACION: SOLICITUD DE RESERVA SEDES VACACIONALES ',
      obj[0][0].mensajeasesor,
    );

    correoasociado = obj[0][0].emailasociado;
    MensajeSMMV = obj[0][0].Mensajeasociado;
    cabeceraEmailJD = '"NOTIFICACION: SOLICITUD DE RESERVA SEDES VACACIONALES"';
    cuerpoemailJD = MensajeSMMV;

    obj[0][0].directionEmail = '';

    datares = obj;
  }

  if (dedonde === 'recordarusuario') {
    MensajeSMMV = `${compania
    }: Realizaste una solicitud para recordar tu usuario. Su Usuario es :  ${obj[0][0].nuevousuario}`;

    cabeceraEmailJD = '"RECUPERACION DE USUARIO"';
    cuerpoemailJD = MensajeSMMV;

    obj[0][0].directionEmail = '';
    if (obj[0][0]) {
      obj[0][0].Mensaje = Encryptarsolodato(obj[0][0].Mensaje);
    }
    datares = obj;
  }

  if (dedonde === 'nuevousuario') {
    MensajeSMMV = `${compania
    }: Su codigo de seguridad de Creacion de Usuario es :  ${obj[0][0].codigoGenerado}`;

    cabeceraEmailJD = '"CREACION DE USUARIO"';
    cuerpoemailJD = MensajeSMMV;

    obj[0][0].directionEmail = '';
    if (obj[0][0]) {
      obj[0][0].Mensaje = Encryptarsolodato(obj[0][0].Mensaje);
    }
    datares = obj;
  }

  if (dedonde === 'validausuario') {
    correoasociado = obj[0][0].directionEmail;
    celularasociado = obj[0][0].number;
    cabeceraEmailJD = obj[0][0].subject
      .replace(replaceAsterisco, ' ')
      .replace(remplaceO, 'o');
    messageBodySMS = obj[0][0].messageBodySMS
      .replace(replaceAsterisco, ' ')
      .replace(remplaceO, 'o');

    MensajeSMMV = messageBodySMS;
    cuerpoemailJD = messageBodySMS;
    obj[0][0].directionEmail = '';
    if (obj[0][0]) {
      obj[0][0].Mensaje = Encryptarsolodato(obj[0][0].Mensaje);
    }
    datares = obj;
  }

  if (dedonde === 'generarcodigotran') {
    MensajeSMMV = `${compania}: Su codigo de transaccion es :  ${obj[0][0].valorcodigo}`;
    cabeceraEmailJD = '"CODIGO TRANSACCION ASOCIADO"';
    cuerpoemailJD = `Su código de transacción es :  ${obj[0][0].valorcodigo}`;

    datares = {
      Codigo: '000',
      Mensaje: 'Codigo Generado',
      tipoMensaje: 'I',
    };
  }

  if (dedonde === 'matriculahorro') {
    MensajeSMMV = `${compania}: Su codigo para el proceso de ahorro es :  ${obj[0][0].valorcodigo}`;
    cabeceraEmailJD = '"CODIGO MATRICULA AHORRO"';
    cuerpoemailJD = `Su codigo para el proceso de ahorro es :  ${obj[0][0].valorcodigo}`;

    datares = {
      Codigo: '000',
      Mensaje: 'Codigo Generado',
      tipoMensaje: 'I',
      data: obj[0][0],
    };
  }

  if (dedonde === 'UUID') {
    MensajeSMMV = `${compania}: Usted ha realizado el registro de su dispositivo satisfactoriamente.`;

    cabeceraEmailJD = 'REGISTRO DE DISPOSITIVO';
    cuerpoemailJD = MensajeSMMV;

    obj[0][0].correoasociado = '';
    obj[0][0].celularasociado = '';
    if (obj[0][0]) {
      obj[0][0].Mensaje = Encryptarsolodato(obj[0][0].Mensaje);
    }
    datares = obj;
  }

  if (dedonde === 'generarcodigoefecty') {
    MensajeSMMV = `${compania}: Su codigo de transaccion efecty es : ${obj[0][0].valorcodigo} con valor de $ ${objllega.valorRetiro}`;
    cabeceraEmailJD = 'CODIGO RETIRO EFECTY';
    cuerpoemailJD = `Su código de efecty es : ${obj[0][0].valorcodigo} con valor de $ ${objllega.valorRetiro}`;

    datares = {
      Codigo: '000',
      Mensaje: 'Código Generado',
      tipoMensaje: 'I',
      OTP: obj[0][0].valorcodigo,
    };
  }

  if (dedonde === 'registroUUID') {
    correoasociado = obj[0][0].directionEmail;
    celularasociado = obj[0][0].number;
    cabeceraEmailJD = obj[0][0].subject
      .replace(replaceAsterisco, ' ')
      .replace(remplaceO, 'o');
    messageBodySMS = obj[0][0].messageBodySMS
      .replace(replaceAsterisco, ' ')
      .replace(remplaceO, 'o')
      .replace(/Ñ/g, 'N');
    MensajeSMMV = messageBodySMS;
    cuerpoemailJD = messageBodySMS;
    obj[0][0].directionEmail = '';
    if (obj[0][0]) {
      obj[0][0].Mensaje = Encryptarsolodato(obj[0][0].Mensaje);
    }
    datares = obj;
  }

  if (config.entidad.codigo !== '01800') {
    if (celularasociado !== '') {
      await enviarsms(MensajeSMMV, celularasociado);
    }
  }

  if (dedonde !== 'matriculahorro') {
    await enviarmail(
      correoasociado,
      cabeceraEmailJD,
      cuerpoemailJD,
    );
  }
  return { data: datares, error: false };
};

module.exports = {
  respuestasemail,
  respuestasemailSinparametrosenvio,
  enviarmailService,
};
