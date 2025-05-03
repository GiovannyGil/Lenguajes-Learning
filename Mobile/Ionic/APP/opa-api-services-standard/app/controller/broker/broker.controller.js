const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const config = require('../../../config.json');
const { enviarmail } = require('../../negocio/Helpers/enviarmail');
const { DEncryptarsolodato } = require('../../negocio/Helpers/encrypt');

const transaccionesBroker = async (req, res) => {
  axios.post(`${config.url.urlBroker}/api`, config.configBroker).then((respons) => {
    const headersBrok = {
      Authorization: `Bearer ${respons.data.token}`,
      'Content-Type': 'application/json',
    };
    const fecha = new Date();
    const fechaFormateada = `${fecha.toLocaleDateString('zh-Hans-CN')} ${fecha.toLocaleTimeString('es-ES')}`;
    const idTransaccion = uuidv4();
    const dataBrokerRetiro = {
      clientId: DEncryptarsolodato(req.body.retiro.clientId), // CEDULA ASOCIADO
      productReference: DEncryptarsolodato(req.body.retiro.productReference), // NUMERO DE CUENTA
      productCode: DEncryptarsolodato(req.body.retiro.productCode), //
      cash: req.body.retiro.cash, // VALOR TRANSACCION
      transactionGroupId: idTransaccion,
      channel: '2',
      product: 'Saving',
      operation: '0', // CONSIGNACION = 1 RETIRO = 0
      productType: 'AhorroVista', // TIPO PRODUCTO
      transactionDate: fechaFormateada, // TRANSACCION date
      check: 0,
    };
    const dataBrokerConsig = {
      clientId: DEncryptarsolodato(req.body.consigna.clientId), // CEDULA ASOCIADO
      productReference: DEncryptarsolodato(req.body.consigna.productReference), // NUMERO DE CUENTA
      productCode: DEncryptarsolodato(req.body.consigna.productCode), //
      cash: req.body.consigna.cash, // VALOR TRANSACCION
      transactionGroupId: idTransaccion,
      channel: '2',
      product: 'Saving',
      operation: '1', // CONSIGNACION = 1 RETIRO = 0
      productType: 'AhorroVista', // TIPO PRODUCTO
      transactionDate: fechaFormateada, // TRANSACCION
      check: 0,
    };
    const url = `${config.url.urlBroker}/api/transactions/PaySingleProduct`;
    const postToBroker = (data) => {
      const resBrok = axios.post(url, data, { headers: headersBrok });
      return resBrok;
    };
    // Crear un array de promesas
    const promises = [
      postToBroker(dataBrokerRetiro),
      postToBroker(dataBrokerConsig),
    ];

    Promise.all(promises)
      .then(async (responses) => {
      // responses es un array con las respuestas de cada solicitud
        const responseDataArray = responses.map(
          (respuestasTransacciones) => respuestasTransacciones.data,
        );
        await enviarmail(
          req.body.mail.correoasociado,
          'TRASLADO AHORROS EN LINEA',
          'Señor asociado se realizó el traslado por valor <br>'
          + ` de $ ${req.body.consigna.cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} desde su cuenta, <br>`
          + ` ${dataBrokerRetiro.productReference}, a la cuenta ${dataBrokerConsig.productReference} <br>`
          + ` del asociado ${DEncryptarsolodato(req.body.consigna.nombre)} `,
        );
        res.json(responseDataArray); // Envía los datos al cliente
      })
      .catch((errors) => {
        // Manejar errores si al menos una de las solicitudes falla
        res.send(errors);
      });
  }).catch(
    (err) => res.send(err),
  );
};

module.exports = {
  transaccionesBroker,
};
