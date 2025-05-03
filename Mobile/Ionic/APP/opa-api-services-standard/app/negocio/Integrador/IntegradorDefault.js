class IntegradorDefault {
    // identificacion asociado
    id = ''

    identificacion = ''

    integration = ''

    constructor(integration) {
      this.integration = `${integration}-${Math.random().toString(36).substring(2, 15)}`;
    }

    showInfo() {
      // eslint-disable-next-line no-console
      console.log(`I'm ${this.integration}`);
    }

    showId() {
      // eslint-disable-next-line no-console
      console.log(`I'm id number ${this.id}`);
    }

    estadoCuentas() {
      // eslint-disable-next-line no-console
      console.log(`Not Implement in intregation: ${this.integration}`);
    }

    SimuladorCDATBuscarLineas() {
      // eslint-disable-next-line no-console
      console.log(`No esta implementado SimuladorCDATBuscarLineas ${this.integration}`);
    }

    SimuladorCreditosBuscarLineas() {
      // eslint-disable-next-line no-console
      console.log(`No esta implementado SimuladorCreditosBuscarLineas ${this.integration}`);
    }

    SimuladorCreditosBuscarDestinos() {
      // eslint-disable-next-line no-console
      console.log(`No esta implementado SimuladorCreditosBuscarDestinos: ${this.integration}`);
    }

    CertificadoAfiliacion() {
      // eslint-disable-next-line no-console
      console.log(`Not Implement in intregation: ${this.integration}`);
    }

    SimuladorCreditosPDF() {
      // eslint-disable-next-line no-console
      console.log(`Not Implement in intregation: ${this.integration}`);
    }

    SimuladorAhorrosPDF() {
      // eslint-disable-next-line no-console
      console.log(`Not Implement in intregation: ${this.integration}`);
    }

    SimuladorCreditosCalcular() {
      // eslint-disable-next-line no-console
      console.log(`No esta implementado SimuladorCreditosCalcular: ${this.integration}`);
    }

    obtenerPerfilUsuario() {
      // eslint-disable-next-line no-console
      console.log(`Not Implement in intregation: ${this.integration}`);
    }

    async descuentosDeNomina() {
      // eslint-disable-next-line no-console
      console.log(`Not Implement in intregation: ${this.integration}`);
    }

    async imprimirEstadoCuentas() {
      // eslint-disable-next-line no-console
      console.log(`imprimirEstadoCuentas Not Implement in intregation: ${this.integration}`);
    }
}

module.exports = IntegradorDefault;
