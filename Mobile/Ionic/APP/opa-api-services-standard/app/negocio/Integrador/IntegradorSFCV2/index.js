const { Duplex } = require('stream');
const IntegradorDefault = require('../IntegradorDefault');
const { OpaIntegradorSFCV2Service } = require('./services/api');
const estadoDeCuentasAdapter = require('./adapters/estadoDeCuentas');
const {
  SimuladorCDATLineasAdapter,
  simuladorCreditosLineasAdapter,
  simuladorCreditosDestinosAdapter,
  simuladorCreditosPeriodicidadAdapter,
  parametrosSimulacionCreditosAdapter,
  resultadoSimulacionCreditosAdapter,
  resultadoSimulacionAhorrosAdapter,
  transformarBodyCDATAdapter,
} = require('./adapters/simuladoresAdapter');
const {
  seguimientoCreditosAdapter,
  seguimientoNovedadAdapter,
  seguimientoAhorrosAdapter,
} = require('./adapters/seguimientosAdapter');
const {
  descuentosNominaFechasAdapter,
  descuentosNominaDatosAdapter,
} = require('./adapters/recaudoEmpresarial');

class IntegradorSFCV2 extends IntegradorDefault {
    token = ''

    constructor() {
      super('IntegradorSFCV2');
    }

    async estadoCuentas() {
      const api = new OpaIntegradorSFCV2Service();
      // find products
      const productos = await api.productos(this.id);
      // add transform data to standar model
      const result = estadoDeCuentasAdapter(productos);
      // return final value
      return result;
    }

    async SimuladorAhorrosBuscarDestinos() {
      const api = new OpaIntegradorSFCV2Service();
      // find products
      const lineas = await api.traerRecursos('ahorrosLineasApp&donde={"validacion":"ahorrosLineasApp"}');
      // add transform data to standar model
      const result = SimuladorCDATLineasAdapter(lineas);
      // return final value
      this.log = 'a';
      return [result];
    }

    async SimuladorAhorrosCalcular() {
      const api = new OpaIntegradorSFCV2Service();
      // Transform body
      const newBody = transformarBodyCDATAdapter(this.body);
      const lineas = await api.simulacion(newBody);
      // add transform data to standar model
      const result = resultadoSimulacionAhorrosAdapter(lineas);
      // return final value
      this.log = 'a';
      return [result];
    }

    async SimuladorCreditosBuscarLineas() {
      const api = new OpaIntegradorSFCV2Service();
      // find products
      const lineas = await api.traerRecursos('creditosLineasApp&donde={"validacion":"creditosLineasApp"}');
      // add transform data to standar model
      const result = simuladorCreditosLineasAdapter(lineas);
      // return final value
      this.log = 'a';
      return [result];
    }

    async SimuladorCreditosBuscarDestinos() {
      const api = new OpaIntegradorSFCV2Service();
      // find products
      const destinos = await api.traerRecursos('creditosDestinosApp');
      // add transform data to standar model
      const result = simuladorCreditosDestinosAdapter(destinos);
      // return final value
      this.log = 'a';
      return [result];
    }

    async SimuladorCreditosBuscarPeriodicidad() {
      const api = new OpaIntegradorSFCV2Service();
      const periodicidad = await api.traerRecursos(`creditosPeriodos&donde={"validacion":"periodosDestinos","creditosDestinosId":${this.creditosDestinosId}}`);
      const result = simuladorCreditosPeriodicidadAdapter(periodicidad);
      return [result];
    }

    async SimuladorCreditosCalcular() {
      const api = new OpaIntegradorSFCV2Service();
      const clienteId = await this.obtenerPerfilUsuario();
      const params = parametrosSimulacionCreditosAdapter(this.body, clienteId);
      const resultSimulacionCredito = await api.simulacion(params);
      resultSimulacionCredito.periodicidadO = this.body.periodicidad;
      // se pasa por el adaptador
      const result = resultadoSimulacionCreditosAdapter(resultSimulacionCredito);
      return [result];
    }

    async SeguimientoAhorros() {
      const api = new OpaIntegradorSFCV2Service();
      // tipoProducto, idProducto
      const seguimientosAhorros = await api.seguimientos(`${this.tipo}?id=${this.idProducto}&fechaDesde=${this.fechaDesde}&fechaHasta=${this.fechaHasta}`);
      // add transform data to standar model
      const result = seguimientoAhorrosAdapter(seguimientosAhorros);
      // return final value
      return [result];
    }

    async SeguimientoCreditos() {
      const api = new OpaIntegradorSFCV2Service();
      // tipoProducto, idProducto
      const seguimientosCreditos = await api.seguimientos(`${this.tipo}?id=${this.idProducto}&fechaDesde=${this.fechaDesde}&fechaHasta=${this.fechaHasta}`);
      // add transform data to standar model
      const result = seguimientoCreditosAdapter(seguimientosCreditos);
      // return final value
      return [result];
    }

    async SeguimientoNovedades() {
      const api = new OpaIntegradorSFCV2Service();
      // tipoProducto, idProducto
      const seguimientosNovedades = await api.seguimientos(`${this.tipo}?id=${this.idProducto}&fechaDesde=${this.fechaDesde}&fechaHasta=${this.fechaHasta}`);
      // add transform data to standar model
      const result = seguimientoNovedadAdapter(seguimientosNovedades);
      // return final value
      return [result];
    }

    async obtenerPerfilUsuario() {
      const api = new OpaIntegradorSFCV2Service();
      // obtener informacion general
      const respuesta = await api.asociados(this.identificacion);
      return { id: respuesta.generales[0].clientesId };
    }

    async CertificadoAfiliacion() {
      const api = new OpaIntegradorSFCV2Service();
      const tmp = new Duplex();
      // obtener informacion general
      try {
        let tipoCertificado;
        switch (this.body.Tipo) {
          case 'AFILIA':
            tipoCertificado = 'CA';
            break;
          case 'AFIDEU':
            tipoCertificado = 'CD';
            break;
          case 'INGRET':
            tipoCertificado = 'CR';
            break;
          default:
            tipoCertificado = 'CA';
            break;
        }
        const respuesta = await api.certificados(
          this.body.CedulaAsociado, tipoCertificado, this.body.ano,
        );
        const buf = Buffer.from(respuesta.archivo, 'base64');

        tmp.push(buf);
        tmp.push(null);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
      return tmp;
    }

    async descuentosDeNomina() {
      const api = new OpaIntegradorSFCV2Service();

      try {
        let caso = 1;

        if (Number(this.body.caso) === 3) {
          caso = 2;
        }

        const respuesta = await api.productosRecaudoEmpresarial('DN', caso, this.body.cedula, this.body.fechadevolver);

        if (caso === 1) {
          return descuentosNominaFechasAdapter(respuesta[0] || []);
        }
        return descuentosNominaDatosAdapter(respuesta[0] || []);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return [];
      }
    }
}

module.exports = IntegradorSFCV2;
