const axios = require('axios');
const email = require('../../../smpt-mail');
const config = require('../../../config.json');

const empatiaMessage = async (config1) => {
  try {
    let headersList = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    let bodyContent = `client_secret=${config.empatiaApp.clientSecret}&client_id=${config.empatiaApp.clientId}&grant_type=client_credentials`;
    let reqOptions = {
      url: config.empatiaApp.oAuthUrl,
      method: 'POST',
      headers: headersList,
      data: bodyContent,
    };
    const response = await axios.request(reqOptions);
    const token = response.data.access_token;
    headersList = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    bodyContent = JSON.stringify(config1);

    reqOptions = {
      url: config.empatiaApp.messageApiUrl,
      method: 'POST',
      headers: headersList,
      data: bodyContent,
    };

    await axios.request(reqOptions);
    return { success: 'Se envio el correo correctamente' };
  } catch (error) {
    throw new Error('error al enviar desde empatia app');
  }
};

async function enviarmail(directionEmail, subject2, messageBody, Archivo) {
  if (config.entidad.codigo === '0193') {
    config.emailConfig.Remitente = 'Fecom@fecom.com.co';
    config.emailConfig.esrele = 'S';
  } else if (config.entidad.codigo === '0015') { // Banafe
    config.emailConfig.Remitente = config.emailConfig.user;
    config.emailConfig.esrele = 'N';
  } else if (config.entidad.codigo === '0432') { // Semillas Fec
    config.emailConfig.Remitente = config.emailConfig.user;
    config.emailConfig.esrele = 'S';
  } else {
    config.emailConfig.Remitente = config.emailConfig.user;
    config.emailConfig.esrele = 'N';
  }
  let config1 = {
    smtpHost: config.emailConfig.host,
    smtpUser: config.emailConfig.user,
    smtpPass: config.emailConfig.pass,
    from: config.emailConfig.Remitente,
    to: directionEmail,
    subject: subject2,
    htmlStr: messageBody,
    port: config.emailConfig.port,
    secure: config.emailConfig.secure,
    esrele: config.emailConfig.esrele,
    htmlContext: {
      user: {
        name: 'tsq',
      },
    },
  };
  if (Archivo !== undefined) {
    config1.attachments = {
      path: Archivo,
    };
  }
  if (!config.empatiaApp.useIt) {
    email(config1);
  } else {
    config1 = [{
      message: messageBody,
      receiver: directionEmail,
      subject: subject2,
      notificationType: 0,
    }];
    if (Archivo !== undefined) {
      config1[0].attachments = [
        {
          document: Archivo.base,
          attachmentName: Archivo.name,
          mediaType: 'application/pdf',
        },
      ];
    }
    try {
      await empatiaMessage(config1);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

module.exports = { enviarmail, empatiaMessage };
