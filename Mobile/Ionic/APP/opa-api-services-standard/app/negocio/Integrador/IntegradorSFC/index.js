const IntegradorDefault = require('../IntegradorDefault');
const funciones = require('./funciones');
const estadoDeCuentasAdapter = require('./adapters/estadoDeCuentas');
const GeneradorCertificados = require('../../Asociados/Certificados/Afiliacion');
const assetsEntidad = require('../../Helpers/assetsEntidad')();
const SimuladorCreditosImprimir = require('../../Simuladores/SimuladorCreditosImprimir');
const SimuladorAhorrosImprimir = require('../../Simuladores/SimuladorAhorrosImprimir');
const EstadoDeCuentasImprimir = require('../../Reportes/EstadoCuentas');
const config = require('../../../../config.json');

class IntegradorSFC extends IntegradorDefault {
    db;

    constructor() {
      super('IntegradorSFC');
    }

    async estadoCuentas() {
      const params = {
        CedulaAsociado: this.body.CedulaAsociado,
        operador: this.body.operador,
        pagare: Number(this.body.pagare) || 0,
        RegistroEmpezar: this.body.RegistroEmpezar,
        RegistroMostrar: this.body.RegistroMostrar,
        Tipo: 'ALL',
      };

      const productos = await this.db.SP(params, 'pa_estadocuentasMovil');

      // tranformar a la respuesta estandar
      const result = estadoDeCuentasAdapter(productos);
      return result;
    }

    async SeguimientoAhorros() {
      const params = {
        esoperador: this.body.esoperador,
        FechaInicial: this.body.FechaInicial,
        FechaFinal: this.body.FechaFinal,
        RegistroEmpezar: this.body.RegistroEmpezar,
        RegistroMostrar: this.body.RegistroMostrar,
        CedulaAsociado: funciones.DEncryptarsolodato(this.body.CedulaAsociado),
        operador: funciones.DEncryptarsolodato(this.body.operador),
        Tipo: funciones.DEncryptarsolodato(this.body.Tipo),
        NumeroCuenta: funciones.DEncryptarsolodato(this.body.NumeroCuenta),
        Linea: funciones.DEncryptarsolodato(this.body.Linea),
      };

      const seguimientoAhorros = await this.db.SP(params, 'pa_seguimientoahorrosmovil');
      return seguimientoAhorros;
    }

    async SeguimientoCreditos() {
      const params = {
        Pagare: parseInt(funciones.DEncryptarsolodato(this.body.Pagare), 10),
        FechaInicial: this.body.FechaInicial,
        FechaFinal: this.body.FechaFinal,
        RegistroEmpezar: this.body.RegistroEmpezar,
        RegistroMostrar: this.body.RegistroMostrar,
        operador: funciones.DEncryptarsolodato(this.body.operador),
        esoperador: this.body.esoperador,
      };

      const seguimientoCreditos = await this.db.SP(params, 'Pa_seguimientocredito');
      return seguimientoCreditos;
    }

    async SeguimientoNovedades() {
      const params = {
        cedulasociado: funciones.DEncryptarsolodato(this.body.cedulasociado),
        Linea: funciones.DEncryptarsolodato(this.body.Linea),
        RegistroEmpezar: this.body.RegistroEmpezar,
        RegistroMostrar: this.body.RegistroMostrar,
        FechaInicial: this.body.FechaInicial,
        FechaFinal: this.body.FechaFinal,
        operador: funciones.DEncryptarsolodato(this.body.operador),
        esoperador: this.body.esoperador,
      };

      const seguimientoNovedades = await this.db.SP(params, 'pa_SeguimientoNovedades');
      return seguimientoNovedades;
    }

    async SimuladorCreditosBuscarLineas() {
      const opcion = { opcion: '1' };
      const lineas = await this.db.SP(opcion, 'BuscardatossimuladorCreditos');
      return lineas;
    }

    async SimuladorCreditosBuscarDestinos() {
      const opcion = { opcion: '2', Codlinea: this.body.Codlinea };
      const lineas = await this.db.SP(opcion, 'BuscardatossimuladorCreditos');
      return lineas;
    }

    async SimuladorCreditosBuscarPeriodicidad() {
      let periodicidad = [];
      const Nentidad = config.entidad.codigo;
      if (Nentidad === '0091') {
        periodicidad = [
          { key: '30', value: 'Mensual' },
          { key: '15', value: 'Quincenal' },
        ];
      } else {
        periodicidad = [
          { key: '30', value: 'Mensual' },
          { key: '15', value: 'Quincenal' },
          { key: '14', value: 'Catorcenal' },
          { key: '10', value: 'Decadal' },
          { key: '7', value: 'Semanal' },
        ];
      }
      this.log = 'a';
      return [periodicidad];
    }

    async SimuladorCreditosCalcular() {
      const calcular = await this.db.SP(this.body, 'calculaPlanPagosCreditosApp');
      return calcular;
    }

    async SimuladorCreditosImprimir() {
      const imprimir = await this.db.SP(this.body, 'calculaPlanPagosCreditosApp');
      return imprimir;
    }

    async SimuladorAhorrosBuscarDestinos() {
      const opcion = { opcion: '1' };
      const destinos = await this.db.SP(opcion, 'BuscarDestinosAhorros');
      return destinos;
    }

    async SimuladorAhorrosBuscarPlazos() {
      const opcion = { opcion: '2', Codlinea: this.body.Destino };
      const plazos = await this.db.SP(opcion, 'BuscarDestinosAhorros');
      return plazos;
    }

    async SimuladorAhorrosPeriodoLiquida() {
      const opcion = { opcion: '3', Codlinea: this.body.Destino, PlazoSeleccionado: this.body.plazo };
      const periodo = await this.db.SP(opcion, 'BuscarDestinosAhorros');
      return periodo;
    }

    async SimuladorAhorrosCalcular() {
      const calcular = await this.db.SP(this.body, 'CalculacdatMovil');
      return calcular;
    }

    async SimuladorAhorrosImprimir() {
      const imprimir = await this.db.SP(this.body, 'CalculacdatMovil');
      return imprimir;
    }

    async CertificadoAfiliacion() {
      const datos = await this.db.SP(this.body, 'PACERTIFICADOS');
      let funcionGeneradorCertificado = {};
      let parametrosCertificados = {
        logo: assetsEntidad.logo,
        imgwidth: assetsEntidad.imgwidth || 110.5,
        imgheight: assetsEntidad.imgheight || 31,
        data: datos[0][0],
        data1: datos[2] ? datos[2][1] : {},
        data2: datos[1] ? datos[1][0] : {},
        data3: datos[3] ? datos[3][0] : {},
        fax: assetsEntidad.fax,
        web: assetsEntidad.web,
        firma: assetsEntidad.firma,
      };
      switch (this.body.Tipo) {
        case 'AFILIA':
          funcionGeneradorCertificado = GeneradorCertificados.afiliacionEstandar;
          break;
        case 'AFIDEU':
          funcionGeneradorCertificado = GeneradorCertificados.deudaEstandar;
          break;
        case 'INGRET' && assetsEntidad.numeroentidad === '0046':
          funcionGeneradorCertificado = GeneradorCertificados.retencionEstandar;
          // add extra logos
          parametrosCertificados = Object.assign(parametrosCertificados, {
            footer: assetsEntidad.footer,
            calidad: assetsEntidad.calidad,
          });
          break;
        case 'INGRET':
          funcionGeneradorCertificado = GeneradorCertificados.retencionEstandar;
          break;
        default:
          funcionGeneradorCertificado = GeneradorCertificados.afiliacionEstandar;
          break;
      }
      return funcionGeneradorCertificado(parametrosCertificados);
    }

    async SimuladorCreditosPDF() {
      const parametrosEncabezado = {
        CodLinea: this.body.Codlinea,
        Coddestino: this.body.Coddestino,
        periodicidad: this.body.periodicidad,
        Capitalprestar: this.body.Capitalprestar,
        plazo: this.body.plazo,
        Totales: 1,
        cedula: this.body.cedula,
        extras: this.body.extras,
      };

      const encabezado = await this.db.SP(parametrosEncabezado, 'calculaPlanPagosCreditosApp');
      const detalle = await this.db.SP({ ...parametrosEncabezado, Totales: 0 }, 'calculaPlanPagosCreditosApp');

      const parametros = {
        encabezado: encabezado[0][0],
        planDePagos: detalle[0],
        costos: detalle[1],
        NombresCostos: detalle[2],
        paraimpresion: this.body,
        logo: assetsEntidad.logo,
      };

      return SimuladorCreditosImprimir(parametros);
    }

    async SimuladorAhorrosPDF() {
      const datos = await this.db.SP({
        Destino: this.body.Destino,
        Capital: this.body.Capital,
        plazo: this.body.plazo,
        periodoDias: this.body.periodoDias,
        capitalizacion: this.body.capitalizacion,
        totales: 1,
      }, 'CalculacdatMovil');

      const planDePagos = await this.db.SP({
        Destino: this.body.Destino,
        Capital: this.body.Capital,
        plazo: this.body.plazo,
        periodoDias: this.body.periodoDias,
        capitalizacion: this.body.capitalizacion,
        totales: 0,
      }, 'CalculacdatMovil');

      const parametros = {
        data: datos[0][0],
        planDePagos,
        paraimpresion: this.body,
        logo: assetsEntidad.logo,
        fax: assetsEntidad.fax,
        web: assetsEntidad.web,
      };

      return SimuladorAhorrosImprimir(parametros);
    }

    async obtenerPerfilUsuario() {
      return { id: this.identificacion };
    }

    async descuentosDeNomina() {
      const datos = await this.db.SP(this.body, 'web_nodejs_DescuentosNomina');
      return datos;
    }

    async imprimirEstadoCuentas() {
      const estadoCuentas = await this.estadoCuentas();

      const datosAsociado = await this.db.SP({
        CedulaAsociado: this.body.id,
        MensajeError: '',
        NumeroError: '',
      }, 'SucursalMovilDatosGenerales');

      const parametros = {
        data: estadoCuentas,
        asociado: datosAsociado[0][0],
        logo: assetsEntidad.logo,
        fax: assetsEntidad.fax,
        web: assetsEntidad.web,
      };

      return EstadoDeCuentasImprimir(parametros);
    }
}

module.exports = IntegradorSFC;
