const nodeCryptojs = require('node-cryptojs-aes');

function Encryptarsolodato(recordsets) {
  const { CryptoJS } = nodeCryptojs;
  const cip = recordsets;

  // console.log('data = ' + cip);
  const eNcrypted = CryptoJS.AES.encrypt(cip, 'opaApp').toString();

  //  var datos = CryptoJS.enc.Utf8.stringify(eNcrypted);
  return eNcrypted;
}

function DEncryptarsolodato(recordsets) {
  const { CryptoJS } = nodeCryptojs;
  const cip = recordsets;
  const decrypted = CryptoJS.AES.decrypt(cip, 'opaApp');
  const datos = CryptoJS.enc.Utf8.stringify(decrypted);

  return datos;
}

function Encryptar(recordsetsllega) {
  const recordsets = recordsetsllega;
  const { CryptoJS } = nodeCryptojs;
  const cip = recordsets[0][0].Mensaje;
  const cip1 = recordsets[0][0].Codigo;
  const eNcrypted = CryptoJS.AES.encrypt(cip, 'opaApp').toString();
  const eNcrypted1 = CryptoJS.AES.encrypt(cip1, 'opaApp').toString();

  recordsets[0][0].Mensaje = eNcrypted;
  recordsets[0][0].Codigo = eNcrypted1;
}

module.exports = {
  Encryptarsolodato,
  DEncryptarsolodato,
  Encryptar,
};
