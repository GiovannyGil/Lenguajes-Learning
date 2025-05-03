const sql = require('mssql');
const log = require('../negocio/Helpers/log');

const queryCorreo = 'select rtrim(ltrim(servidorsaliente)) as servidorsaliente,rtrim(ltrim(puerto)) as puerto,rtrim(ltrim(usuario)) as usuario,rtrim(ltrim(CONVERT(VARCHAR(300), DECRYPTBYPASSPHRASE(DBO.Fc_ReturnSpecialKey(),contrasena)))) as contrasena,rtrim(ltrim(ssl)) as ssl from CorreosalienteOpaMovil';
const config = require('../../config.json');

function connect() {
  return sql
    .connect(config)
    .then(() => {
      let request = new sql.Request();

      request
        .query('Select TOP 1 1 as Fine')
        .then(log.bind(null, 'Success'))
        .catch(log.bind(null, 'Error'));

      function SP(params, SPname) {
        request = new sql.Request();
        Object.keys(params).forEach((i) => {
          request.input(i, params[i]);
        });
        return request.execute(SPname).then((res) => res.recordsets);
      }

      function consulta(params, SPname) {
        request = new sql.Request();
        Object.keys(params).forEach((i) => {
          request.input(i, params[i]);
        });
        return request.query(SPname).then((res) => res.recordsets);
      }

      return request
        .query('SELECT ltrim(rtrim(codigo)) as codigo,ltrim(rtrim(numerocompañia)) as numerocompañia FROM COMPANIA')
        .then((res) => res.recordset)
        .then((dataset) => {
          if (dataset[0]) {
            config.entidad = {
              codigo: dataset[0].numerocompañia,
              nombre: dataset[0].codigo,
            };
          }

          return request
            .query(queryCorreo)
            .then((res) => res.recordset)
            .then((dataset2) => {
              if (dataset2[0]) {
                config.emailConfig = {
                  host: dataset2[0].servidorsaliente,
                  port: dataset2[0].puerto,
                  secure: dataset2[0].ssl === 'SI',
                  user: dataset2[0].usuario,
                  pass: dataset2[0].contrasena,
                };
              }

              return true;
            }).then(() => ({
              SP,
              consulta,
            }));
        });
    }).catch((err) => {
      log.bind(null, 'Error');
      throw err;
    });
}

module.exports = {
  connect,
  log,
};
