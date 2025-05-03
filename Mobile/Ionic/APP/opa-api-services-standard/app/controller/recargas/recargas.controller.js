const nodeCryptojs = require('node-cryptojs-aes');
const { makesimplequeryService, makespService } = require('../../services/common/common.services');

const Validarconexion = async (req, res) => {
  const { CryptoJS } = nodeCryptojs;
  const DatoEncrypta = req.query.datoencrypta;
  // var userencrypta = req.query.datoencrypta

  if (DatoEncrypta !== '' && DatoEncrypta !== undefined) {
    try {
      const Objects = {};
      let encrypted = CryptoJS.AES.encrypt(DatoEncrypta, 'opa');
      encrypted = encrypted.toString();

      res.send(encrypted);
      return Objects;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.message);
      return 0;
    }
  }

  return 0;
};

const consultaconexionparapagos = async (req, res) => {
  const cadena = 'select ltrim(rtrim(usuarioopa)) usuarioopa,ltrim(rtrim(CONVERT(VARCHAR(300), DECRYPTBYPASSPHRASE(DBO.Fc_ReturnSpecialKey(),contrasenaopa)))) as contrasenaopa,ltrim(rtrim(usuario)) as usuario,ltrim(rtrim(CONVERT(VARCHAR(300), DECRYPTBYPASSPHRASE(DBO.Fc_ReturnSpecialKey(),contrasena)))) as  contrasena from IIMONEYSALIENTEOPAMOVIL';
  const response = await makesimplequeryService('', cadena);
  const recordsets = response.data;
  return res.json(recordsets);
};

const consultaparapagos = async (req, res) => {
  const response = await makespService(req.body, 'pa_consultarproductosparaiimoney');
  const recordsets = response.data;
  return res.json(recordsets);
};

module.exports = {
  Validarconexion,
  consultaconexionparapagos,
  consultaparapagos,
};
