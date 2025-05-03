const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path'); // Corrección: usar el módulo path de Node.js
// const assetsEntidad = require('../../Helpers/assetsEntidad')();
const assetsEntidad = require('../app/negocio/Helpers/assetsEntidad')()

module.exports = function (config, cb) {
  let smtpConfig;

  if (config.esrele === "S") {
    smtpConfig = {
      host: config.smtpHost,
      port: config.port,
      secure: config.secure, // use SSL/TLS
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass
      },
      tls: { rejectUnauthorized: false },
      debug: true
    };
  } else {
    smtpConfig = {
      host: config.smtpHost,
      port: config.port,
      secure: config.secure, // use SSL/TLS
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass
      },
      tls: { rejectUnauthorized: false },
      debug: true
    };
  }

  const transporter = nodemailer.createTransport(smtpConfig);

  // se busca la carpeta
  const emailPath = path.join(__dirname, 'index.html');
  const emailTemplate = fs.readFileSync(emailPath, 'utf8'); // se hace la sincronizacion de arhcivo

  // se hace el renderizado con el template y mensaje
  const renderedHtml = ejs.render(emailTemplate, { htmlStr: config.htmlStr });

  // opciones del mensaje por correo
  const mailOptions = {
    from: config.from,
    to: config.to,
    cc: config.cc,
    subject: config.subject,
    html: renderedHtml,
    attachments: [
      {
        // configuracion de uso del logo
        filename: 'entidades.png',
        path: assetsEntidad.logo,
        cid: 'logo' // referencia del logo
      },
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('ERROR Send Error:', error);
      if (cb) cb(error);
    } else {
      console.log('Correo enviado:', info.response);
      if (cb) cb(null, info);
    }
  });
};
