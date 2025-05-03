const axios = require('axios');

class Configuration {
    baseURL = process.env.OPA_MOVIL__INTEGRADORSFCV2_URL;

    API = {};

    constructor(base, token, prefix) {
      if (base) this.baseURL = base;

      const baseURL = prefix ? this.baseURL + prefix : this.baseURL;
      this.API = axios.create({ baseURL });

      if (token) { this.API.defaults.headers.common.Authorization = `Bearer ${token}`; }
    }

    static handleResponseError(response) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }

    static handleError(error) {
      // eslint-disable-next-line no-console
      console.log(error.message);
    }
}

module.exports = Configuration;
