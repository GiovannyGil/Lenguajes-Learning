const axios = require('axios');
const queryString = require('query-string');

const IDPToken = async () => {
  const body = {
    grant_type: 'client_credentials',
    client_id: process.env.OPA_MOVIL__IDP_OPA_CLIENT_ID,
    client_secret: process.env.OPA_MOVIL__IDP_OPA_CLIENT_SECRET,
  };

  try {
    const response = await axios.post(process.env.OPA_MOVIL__IDP_OPA_URL,
      queryString.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

    return response.data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    throw e;
  }
};

module.exports = IDPToken;
