import { Injectable } from '@angular/core';
// import 'rxjs/operator/map';

@Injectable()
export class ConstantsService {
  //  _APIbaseUrl = "https://opamobile.greenland.co:902/api/"  //Banafe Asociado Pruebaa
  // _APIbaseUrl = "https://opamobile.greenland.co:903/api/" //Banafe Asociado Produccion
  
  // _APIbaseUrl = "https://opa.cadena.com.co:8020/api/"  // pruebas SemillasFec
  // _APIbaseUrl = "https://opa.cadena.com.co:8021/api/"  //Produccion SemillasFec
  
  //  _APIbaseUrl =  "https://200.122.197.22:1547/api/" //fecom produccion funciona  en local con el diseño
  //  _APIbaseUrl = "https://200.122.197.22:22443/api/"; // fecom pruebas v5 // no funiona en local con el diseño pero lo demas si.
  //_APIbaseUrl = "https://apk-fecom.comfenalcoantioquia.com:1547/api/"

  //_APIbaseUrl = "https://192.99.140.141:8443/api/"
  

   //_APIbaseUrl =   "http://190.109.168.3:16123/api/"// riachon produccion http://190.109.168.3:16123/api/
  // _APIbaseUrl = "http://138.121.15.30:9797/api/"
   //_APIbaseUrl = "https://api-pruebas.fecom.com.co:1547/api/"

   
   //_APIbaseUrl = "https://web.dotakondor.com/FECKLIP/api/" //Dotakondor produccion
   
   //_APIbaseUrl = "https://appcooptenjo.opa.com.co:5070/api/" //cooptenjo
   //_APIbaseUrl = "https://appcooptenjo.opa.com.co:5025/api/" //cooptenjo pruebas
   // _APIbaseUrl = "https://appcoopriachon.com.co:16123/api/" //RIACHON
   
   // _APIbaseUrl ="https://appforjar.opa.com.co:9001/api/" // forjar
   // _APIbaseUrl = "https://app.femfuturo.com.co:2020/api/" // femfuturo
   
   
   //_APIbaseUrl = "https://appfecsa.opa.com.co:9002/api/"  // produccion FECSA
   
    _codigoEntidad = "0045"
     _APIbaseUrl = "http://localhost:4004/api/" 
    // _APIbaseUrl = "https://appcooptenjo.opa.com.co:5045/api/" // NUEVO COOPTENJO
    // _APIbaseUrl = "http://app.leonxiii.coop:16172/api/" // coopguatape
    // _APIbaseUrl = "https://corresponsales.coonfie.com:1995/api/" //COONFIE PRODUCCION
    // _APIbaseUrl = "https://corresponsales.coonfie.com:11905/api/" //COONFIE pruebas
    // _APIbaseUrl = "https://appdemo.opa.com.co:5161/api/" // SERVICIO PARA APP DEMO OPA
    // _APIbaseUrl = "https://appdemo.opa.com.co:4004/api/" // SERVICIO PARA QA
   // _APIbaseUrl = "http://10.1.0.218:2003/api/"
  //  _APIbaseUrl = "https://appcpioxii.opa.com.co:8875/api/" // CPIOXII
  //  _APIbaseUrl = "https://consultas.cooperativapioxii.com.co:8975/api/" //CPIOXII produccion
   //_APIbaseUrl = "https://corresponsales.coonfie.com:1405/api/" //coonfie
 
  //_APIbaseUrl = 'https://servicioapp.canaprooc.com.co:16175/api/' //CANAPRO

  _secret = "opaApp"
  _APIServeriimoneyOpa = "https://app.cooperativapioxii.com.co:8999/appreceiver/"

  // _APIbaseCreditosdigitalesUrl = "https://appdemo.opa.com.co:5161/"

  // _APIbaseCreditosdigitalesUrl = "http://localhost:4004/"
  // _APIbaseCreditosdigitalesUrl = "https://corresponsales.coonfie.com:1405/"
  _APIbaseCreditosdigitalesUrl = "https://subtly-eager-humpback.ngrok-free.app/"
  // AQUI HAGO UN CAMBIO O CAMBIO CODIGO Y PARA PA
  //_APIAntesLogin            = this._APIbaseUrl + "antesLogin"             //==> Trae información de inicio
  _APIValidarProcesos = this._APIbaseUrl + "validarprocesos"       //==> valida si el proceso se encuentra activo
  _APIValidarusuario = this._APIbaseUrl + "ValidarUsuario"         //==> Valída que exista el usuario
  _APILogin = this._APIbaseUrl + 'Login'                  //==> Valída el acceso a la aplicación con el usuario y contraseña
  _APIIngresarNuevoUsuario = this._APIbaseUrl + "nuevousuario"   //==> Registro un nuevo usuario a la aplicación
  _APIRecordarUsuario = this._APIbaseUrl + "recordarusuario"
  _APIRecuperaClave = this._APIbaseUrl + "Recuperaclave"
  _APIValidacionesRecuperacion = this._APIbaseUrl + "validacionesrecuperacion"
  _APIPreguntasSeguridad = this._APIbaseUrl + "preguntasseguridad"
  _APICambioClave = this._APIbaseUrl + "ActualizaC"
  _APIconsultacedulausuario = this._APIbaseUrl + "consultacedulausuario"
  _APIvalidarUUID = this._APIbaseUrl + "validarUUID"
  _APIvalidacionregistroUUID = this._APIbaseUrl + "validacionregistroUUID"
  _APIguardarUUID = this._APIbaseUrl + "guardarUUID"
  _APICerrarsession = this._APIbaseUrl + "Cerrarsession"
  _APIDatosAsociados = this._APIbaseUrl + "DatosAsociados"
  _APIPublicidad = this._APIbaseUrl + "Publicidad"
  _APIDestinoPagoCreditos = this._APIbaseUrl + "DestinoPagoCreditos"
  _APIOrigenahorros = this._APIbaseUrl + "Origenahorros"
  _APIPagocreditos = this._APIbaseUrl + "Pagocreditos"
  _APIDestinoDestinoahorros = this._APIbaseUrl + "DestinoDestinoahorros"
  _APIInscripcionCuentaTraslado = this._APIbaseUrl + "InscripcionCuentaTraslado"
  _APIBuscarCuentaTraslado = this._APIbaseUrl + "BuscarCuentaTraslado"
  _APICalculoGmf = this._APIbaseUrl + "calculoGmf"
  _APIGmf = this._APIbaseUrl + "Gmf"
  _APIGenerarCodigoMatricula = this._APIbaseUrl + "GenerarCodigoMatricula"
  _APIParametrosAhorrosTraslado = this._APIbaseUrl + "ParametrosAhorrosTraslado"
  _APIMovimientotrasladoahorros = this._APIbaseUrl + "Movimientotrasladoahorros"
  _APIConsultaAVtrasladoahorros = this._APIbaseUrl + "ConsultaAhorrosAVTraslado"
  _APIParamTrasladoAV = this._APIbaseUrl + "ParametroTrasladoEntreAsociados"
  _APIAuthBroker = this._APIbaseUrl + "authBroker"
  _APITransaccionBroker = this._APIbaseUrl + "transaccionesBroker"
  _APITransaccionNoEsEnLinea = this._APIbaseUrl + "transaccionesNoEsEnLinea"
  _APImovimientoTercero = this._APIbaseUrl + "movimientoTercero"
  _APIEstadodecuentas = this._APIbaseUrl + "Estadodecuentas"
  _APIEstadodecuentasPSE = this._APIbaseUrl + "EstadodecuentasPSE"
  _APIseguimientoahorros = this._APIbaseUrl + "seguimientoAhorro"
  _APIseguimientoNovedades = this._APIbaseUrl + "seguimientoNovedad"
  _APIseguimientoCreditos = this._APIbaseUrl + "seguimientoCredito"
  _APIsolicitarPlanDePagos = this._APIbaseUrl + "solicitarPlanDePagos"
  _APICargarDatosInicio = this._APIbaseUrl + "CargarDatosInicio"
  _APISimuladorAhorros_BuscarDestinosAhorros = this._APIbaseUrl + "SimuladorAhorros/BuscarDestinosAhorros"
  _APISimuladorAhorros_BuscarPlazoAhorros = this._APIbaseUrl + "SimuladorAhorros/BuscarPlazoAhorros"
  _APISimuladorAhorros_ComboPeriodoLiquida = this._APIbaseUrl + "SimuladorAhorros/comboperiodoliquida"
  _APISimuladorAhorros_calcular = this._APIbaseUrl + "SimuladorAhorros/calcular"
  _APISimuladorCreditos_BuscarLineas = this._APIbaseUrl + "SimuladorCreditos/BuscarLineas"
  _APISimuladorCreditos_BuscarPeriodicidad = this._APIbaseUrl + "SimuladorCreditos/BuscarPeriodicidad"
  _APISimuladorCreditos_BuscarDestinos = this._APIbaseUrl + "SimuladorCreditos/BuscarDestinos"
  _APISimuladorCreditos_calcular = this._APIbaseUrl + "SimuladorCreditos/calcular"
  _APICertificadoAfiliacion = this._APIbaseUrl + "Certificado/Afiliacion"
  _APICertificadoCredito = this._APIbaseUrl + "Certificado/Credito"
  _APICertificadoRetencion = this._APIbaseUrl + "Certificado/Retencion"
  _APISegundaClave = this._APIbaseUrl + "SegundaClave"
  _APIValidarsegundaClave = this._APIbaseUrl + "ValidarsegundaClave"
  _APIvalidarmodulos = this._APIbaseUrl + "validarmodulos"
  _APINumeroEntidad = this._APIbaseUrl + "NumeroEntidad"
  _APIcertificados = this._APIbaseUrl + "certificados"
  _APICreditoToken = this._APIbaseCreditosdigitalesUrl + "creditos-digitales/api/token"
  _APICreditoConfig = this._APIbaseCreditosdigitalesUrl + "creditos-digitales/api/config"
  _APIGuardaPoliticatratadatos = this._APIbaseUrl + "GuardaPoliticatratadatos"
  _APIBancoImagenes = this._APIbaseUrl + "BancoImagenes"
  _APIguardarImagenes = this._APIbaseUrl + "guardarImagenes"
  _APISimuladorAhorrosimprimir = this._APIbaseUrl + "SimuladorAhorros/imprimirFront"
  _APISimuladorCreditosimprimir = this._APIbaseUrl + "SimuladorCreditos/ImprimirFront"
  _APIvalidar = this._APIbaseUrl + "validar"
  _APItraerdatoscreacionahofecsa = this._APIbaseUrl + "traerdatoscreacionahofecsa"
  _APIcrearsolicitud = this._APIbaseUrl + "crearsolicitud"
  _APIPagoNomina = this._APIbaseUrl + "PagoNomina"
  _APIPsegeneral = this._APIbaseUrl + "Psegeneral"
  _APIPseHistorico = this._APIbaseUrl + "PseHistorico"
  _APITransaccionespse = this._APIbaseUrl + "Psetransacciones"
  _APICrearsolicituddeseguros = this._APIbaseUrl + "Crearsolicituddeseguros" 
  _APIDatosmodificaseguros = this._APIbaseUrl + "Datosmodificaseguros"
  _APIregistrarsolicitudMovil = this._APIbaseUrl + "registrarsolicitudMovil"
  _APIregistrarsolicitudSoat = this._APIbaseUrl + "registrarsolicitudSoat"
  _APIregistrarsolicitudvida = this._APIbaseUrl + "registrarsolicitudvida"
  _APIregistrarsolicitudexequial = this._APIbaseUrl + "registrarsolicitudexequial"
  _APIregistrarsolicitudFMC = this._APIbaseUrl + "registrarsolicitudFMC"
  _APIregistrarsolicitudHogar = this._APIbaseUrl + "registrarsolicitudHogar"
  _APIregistrarsolicitudVehiculos = this._APIbaseUrl + "registrarsolicitudVehiculos"
  _APIcursos = this._APIbaseUrl + "cursos"
  _APIdescargarcursos = this._APIbaseUrl + "descargarcursos"
  _APISedesVAcasionales = this._APIbaseUrl + "SedesVAcasionales"
  _APIReservasVAcasionales = this._APIbaseUrl + "ReservasVAcasionales"
  _APITraerauxilios = this._APIbaseUrl + "Traerauxilios"
  _APIRangosEfecty = this._APIbaseUrl + "rangosEfecty"
  _APIValidacionEfecty = this._APIbaseUrl + "authEfecty"
  _APIValidacionTransacciones = this._APIbaseUrl + "vervalidaciontran"
  _APIparametronivedadessolicitud = this._APIbaseUrl + "parametronivedadessolicitud"
  _APIAgregarNovedadessolicitud = this._APIbaseUrl + "novedadessolicitud"

  //FEMFUTURO
  _APIGANAconsultaAhorros = this._APIbaseUrl + "GANAconsultaAhorros"
  _APIGANAMsj = this._APIbaseUrl + "GANAMsj"

  //RECARGAS
  _APIconsultaparapagos = this._APIbaseUrl + "consultaparapagos"
  _APIconsultaconexionparapagos = this._APIbaseUrl + "consultaconexionparapagos"
  _APItraerTokeniimoneyopa = this._APIServeriimoneyOpa + "api/"
  _APISolicitarRecarga = this._APIServeriimoneyOpa + "api/transactions/TopUpWithSingleProduct/"

  constructor() { }
}