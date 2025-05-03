const nodemailer = require('nodemailer');

module.exports = (globalOp) => {
  const transporter = nodemailer.createTransport(globalOp);

  return {
    sendMail(optionsllega, fn) {
      const options = optionsllega;
      options.from = globalOp.auth.user;
      transporter.sendMail(options, fn);
    },
  };
};
