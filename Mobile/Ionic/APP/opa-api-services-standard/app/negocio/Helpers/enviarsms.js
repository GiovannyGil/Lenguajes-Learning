const { XMLHttpRequest } = require('xmlhttprequest');
const config = require('../../../config.json');
const { empatiaMessage } = require('./enviarmail');
const { makesimplequeryService } = require('../../services/common/common.services');

const enviarmensaje = async (message, phone) => {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  let respuesta = '';
  const MensajeSMMV = message;
  const cadenaMensaje = `${config.enviarSmsDefault.url}&username=${config.enviarSmsDefault.username}&password=${config.enviarSmsDefault.password}&recipient=${phone}&messagedata=${MensajeSMMV}&longMessage=false`;
  const logEnvio = async () => {
    const insert = `insert into logenviosmsMovil (celularenviado,mensajeenviado,respuestaws,canalenvio ) values ( '${phone}','${MensajeSMMV}','${respuesta}','${cadenaMensaje}')`;
    await makesimplequeryService('', insert);
  };

  const loadF = async (url) => {
    xhr.onreadystatechange = async () => {
      if (xhr.readyState === 4) {
        respuesta = xhr.responseText.substring(38, 407);
        await logEnvio(respuesta);
      }
    };
    try {
      xhr.open('POST', url);
      xhr.send('');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
    }
  };
  await loadF(cadenaMensaje);
};

const enviarsms = async (messageBody, directionNumber) => {
  const config1 = [{
    message: messageBody,
    receiver: directionNumber,
    subject: '',
    // attachments: [
    //   {
    //     document: string,
    //     attachmentName: string,
    //     mediaType: string
    //   }
    // ],
    notificationType: 1,
  }];
  if (!config.empatiaApp.useIt) {
    // eslint-disable-next-line no-console
    try {
      await enviarmensaje(messageBody, directionNumber);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  } else {
    try {
      await empatiaMessage(config1);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};

module.exports = { enviarsms, enviarmensaje };
