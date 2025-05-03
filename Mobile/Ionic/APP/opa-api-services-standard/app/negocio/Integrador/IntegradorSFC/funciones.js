const sql = require('mssql');
const nodeCryptojs = require('node-cryptojs-aes');

function SP(params, SPname) {
  const request = new sql.Request();
  Object.keys(params).forEach((i) => {
    request.input(i, params[i]);
  });
  return request.execute(SPname).then((res) => res.recordsets);
}

function consulta(params, SPname) {
  const request = new sql.Request();
  Object.keys(params).forEach((i) => {
    request.input(i, params[i]);
  });
  return request.query(SPname).then((res) => res.recordsets);
}

function DEncryptarsolodato(recordsets) {
  const { CryptoJS } = nodeCryptojs;
  const cip = recordsets;
  const decrypted = CryptoJS.AES.decrypt(cip, 'opaApp');
  const datos = CryptoJS.enc.Utf8.stringify(decrypted);
  return datos;
}

module.exports.SP = SP;
module.exports.consulta = consulta;
module.exports.DEncryptarsolodato = DEncryptarsolodato;
