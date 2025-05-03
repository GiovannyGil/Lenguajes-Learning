const axios = require('axios');
const queryString = require('query-string');
const urljoin = require('url-join');
const config = require('./creditos-digitales-config.json');

const getToken = async () => {
  try {
    const body = {
      grant_type: 'client_credentials',
      client_id: config.client_id,
      client_secret: config.client_secret,
    };

    const response = await axios.post(
      urljoin(config.url_cd, 'connect/token'),
      queryString.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
};

const getConfiguration = () => config.routes;

const getAmount = async (token, id) => {
  try {
    const response = await axios.get(
      urljoin(config.routes.urlHost, `${config.routes.routeGetAmount}?id=${id}`),
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al consultar');
  }
};

exports.getToken = getToken;
exports.getConfiguration = getConfiguration;
exports.getAmount = getAmount;
