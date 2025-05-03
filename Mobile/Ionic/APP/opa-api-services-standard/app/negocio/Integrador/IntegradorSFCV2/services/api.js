const Configuration = require('./Configuration');
const IDPToken = require('./IDPToken');

class OpaIntegradorSFCV2Service {
  async init() {
    const token = await IDPToken();
    this.config = new Configuration(null, token.access_token, '/integraciones/api/');
  }

  /**
     * @method productos consultar todos los productos para el estado de cuenta
     * @param id id del cliente que se desea consultar en el estado de cuenta
     * @return {Promise} result object
     */
  async productos(id) {
    await this.init();

    return this.config.API.get(`productos/ALL?id=${id}`).then((response) => {
      if (response.status !== 200) {
        return this.config.handleResponseError(response);
      }
      return response.data;
    });
  }

  async traerRecursos(tipo) {
    await this.init();

    return this.config.API.get(`recursos?tipo=${tipo}`).then((response) => {
      if (response.status !== 200) {
        return this.config.handleResponseError(response);
      }
      return response.data;
    });
  }

  async simulacion(body) {
    await this.init();
    return this.config.API.post('productos/simulacion', body).then((response) => {
      if (response.status !== 200) {
        return this.config.handleResponseError(response);
      }

      return response.data;
    });
  }

  async seguimientos(cadena) {
    await this.init();

    return this.config.API.get(`productos/detalle/${cadena}`).then((response) => {
      if (response.status !== 200) {
        return this.config.handleResponseError(response);
      }
      return response.data;
    });
  }

  async asociados(identificacion) {
    await this.init();

    return this.config.API.get(`asociados?identificacion=${identificacion}`).then((response) => {
      if (response.status !== 200) {
        return this.config.handleResponseError(response);
      }
      return response.data;
    });
  }

  async certificados(id, tipoCertificado, ano) {
    await this.init();

    return this.config.API.get(`certificados/${tipoCertificado}?clienteId=${id}&anio=${ano}`).then((response) => {
      if (response.status !== 200) {
        return this.config.handleResponseError(response);
      }
      return response.data;
    });
  }

  async productosRecaudoEmpresarial(proceso, tipoInfo, clientesId, fechaRecaudo) {
    await this.init();

    const params = {
      proceso,
      tipoInfo,
      clientesId,
      fechaRecaudo,
    };

    return this.config.API.post('productos/recaudoEmpresarial', params).then((response) => {
      if (response.status !== 200) {
        return this.config.handleResponseError(response);
      }
      return response.data;
    });
  }
}

module.exports = {
  OpaIntegradorSFCV2Service,
};
