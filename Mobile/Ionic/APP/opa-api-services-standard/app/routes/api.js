const router = require('express').Router();
// const soap = require('soap');
const sql = require('../model/mssql');
const { IntegradorFactory } = require('../negocio/Integrador');
const {
  cursos,
} = require('../controller/cursos/cursos.controller');
const {
  registrarsolicitudvida, registrarsolicitudFMC,
  registrarsolicitudMovil, registrarsolicitudSoat,
  registrarsolicitudHogar, registrarsolicitudVehiculos, registrarsolicitudexequial,
} = require('../controller/seguros/seguros.controller');
const {
  codigoscajaparaTransacciones, transaccionproducto, consultasvarias, CreacionProductos,
  Datosreimpresiontraopamovil, Informecuadrecajero, datosasociadosparaactualizar,
  procesarNitsVsAsociados, vervalidaciontran, generarcodigotran,
  traerdatoscreacionahofecsa,
  crearsolicitud,
  ActiveRequests,
} = require('../controller/sucursal/sucursal.controller');
const { checkScopePolicy } = require('../middlewares/IDPauth');
const {
  estadoCuentas, descuentosNomina, solicitarPlanDePagos,
} = require('../controller/estadoDeCuentas/estadoDeCuentas.Controller');
const {
  cargarDatosInicio,
  validarmodulos, actualizarClave,
  BancoImagenes, guardarImagenes, Cerrarsession,
  SegundaClave, ValidarsegundaClave, Listausuarios, DatosAsociados, NotasHistoricas,
  ConsultarParentesco,
  procesabeneficiarios,
} = require('../controller/login/login.controller');
const {
  origenAhorros, destinoPagoCreditos, pagoCreditos, movimientoTercero, insertarSolicitudCreditos,
  misCodeudores, CodeudorDe, cuentasDeBancos,
} = require('../controller/Creditos/Creditos.controller');
const {
  DestinoDestinoahorros, Movimientotrasladoahorros, ConsultarLineasRetiroahorros,
  insertarSolicitudRetiroAhorros,
  InscripcionCuentaTraslado,
  parametrosAhorrosTraslado, ConsultaAhorrosAVTraslado, ParametroTrasladoEntreAsociados,
  TrasladoAhorroNoEsEnLinea, BuscarCuentaTraslado, calculoGMF, gmfProcedure,
} = require('../controller/trasladoAhorros/trasladoAhorros.controller');
const {
  buscarDestinosAhorros, BuscarPlazoAhorros,
  comboPeriodoLiquida, calcularAhorro, imprimirFrontAhorros,
} = require('../controller/simuladorCDAT/simuladorCDAT.controller');
const {
  BuscarDestinosSimuladorCreditos, BuscarLineasSimuladorCreditos,
  BuscarPeriodicidadCreditos, calcularCredito, imprimirCreditosFront,
} = require('../controller/simuladorCreditos/simuladorCreditos.Controller');
const {
  sedesVacacionales, Traerauxilios, Crearsolicituddeseguros, Datosmodificaseguros,
  pagoNomina, ReservasVAcasionales, vermasapp,
  getTokenFE,
} = require('../controller/modulosAdicionales/modulosAdicionales.controller');
const {
  Psegeneral, estadoCuentasPSE, transaccionesPse, PseHistorico,
} = require('../controller/PSE/pse.controller');
const {
  GANAconsultaAhorros,
} = require('../controller/retirosGANA/retirosGANA.controller');
const { transaccionesBroker } = require('../controller/broker/broker.controller');
const { Validarconexion, consultaconexionparapagos, consultaparapagos } = require('../controller/recargas/recargas.controller');
const { certificadosSucursal } = require('../controller/certificados/certificados.controller');
const { OpaCloudProxy, OpaCloudValidateProxy } = require('../negocio/OpaCloudProxy');
const { rangosEfectyController, generarCodigoEfectyController, authEfectyController } = require('../controller/retirosEfecty/retirosEfecty.controller');
const {
  seguimientoAhorro, seguimientoCredito, seguimientoNovedad,
  estadoCuentasCompleto, estadoCuentasCompletoPrint,
} = require('../controller/estadoDeCuentas/estadoDeCuentas.Controller');
const { parametronovedades, Novedadessolicitud } = require('../controller/Novedades/novedades.controller');

sql.connect().then((model) => {
  const integradorFactory = IntegradorFactory.create();
  integradorFactory.db = model;
  // opa-accountstatus-api, opa-savings-api, opa-credits-api, opa-simulators-api, opa-aid-api,
  // opa-insurance-api, opa-pse-api, opa-security-api, opa-vacationvenues-api, opa-gana-api
  // opa-courses-api, opa-associates-api, opa-others-api
  router.post('/CargarDatosInicio', cargarDatosInicio);
  router.post('/Estadodecuentas', checkScopePolicy(['opa-accountstatus-api']), estadoCuentas);
  router.post('/solicitarPlanDePagos', checkScopePolicy(['opa-accountstatus-api']), solicitarPlanDePagos);
  router.post('/Origenahorros', checkScopePolicy(['opa-savings-api']), origenAhorros);
  router.post('/cuentasDeBancos', checkScopePolicy(['opa-savings-api']), cuentasDeBancos);
  router.post('/DestinoPagoCreditos', checkScopePolicy(['opa-credits-api']), destinoPagoCreditos);
  router.post('/Pagocreditos', checkScopePolicy(['opa-credits-api']), pagoCreditos);
  router.post('/DestinoDestinoahorros', checkScopePolicy(['opa-savings-api']), DestinoDestinoahorros);
  router.post('/InscripcionCuentaTraslado', checkScopePolicy(['opa-savings-api']), InscripcionCuentaTraslado);
  router.post('/BuscarCuentaTraslado', checkScopePolicy(['opa-savings-api']), BuscarCuentaTraslado);
  router.post('/calculoGmf', checkScopePolicy(['opa-savings-api']), calculoGMF);
  router.post('/Gmf', checkScopePolicy(['opa-savings-api']), gmfProcedure);
  router.post('/ParametroTrasladoEntreAsociados', checkScopePolicy(['opa-savings-api']), ParametroTrasladoEntreAsociados);
  router.post('/ParametrosAhorrosTraslado', checkScopePolicy(['opa-savings-api']), parametrosAhorrosTraslado);
  router.post('/ConsultaAhorrosAVTraslado', checkScopePolicy(['opa-savings-api']), ConsultaAhorrosAVTraslado);
  router.post('/Movimientotrasladoahorros', checkScopePolicy(['opa-savings-api']), Movimientotrasladoahorros);
  router.post('/transaccionesBroker', checkScopePolicy(['opa-savings-api']), transaccionesBroker);
  router.post('/transaccionesNoEsEnLinea', checkScopePolicy(['opa-savings-api']), TrasladoAhorroNoEsEnLinea);
  router.post('/SimuladorAhorros/BuscarDestinosAhorros', checkScopePolicy(['opa-savings-api', 'opa-simulators-api']), buscarDestinosAhorros);
  router.post('/SimuladorAhorros/BuscarPlazoAhorros', checkScopePolicy(['opa-savings-api', 'opa-simulators-api']), BuscarPlazoAhorros);
  router.post('/SimuladorAhorros/comboperiodoliquida', checkScopePolicy(['opa-savings-api', 'opa-simulators-api']), comboPeriodoLiquida);
  router.post('/SimuladorAhorros/calcular', checkScopePolicy(['opa-savings-api', 'opa-simulators-api']), calcularAhorro);
  router.post('/SimuladorAhorros/imprimirFront', checkScopePolicy(['opa-savings-api', 'opa-simulators-api']), checkScopePolicy(['opa-savings-api']), imprimirFrontAhorros);
  router.post('/SimuladorCreditos/BuscarLineas', checkScopePolicy(['opa-credits-api', 'opa-simulators-api']), BuscarLineasSimuladorCreditos);
  router.post('/SimuladorCreditos/BuscarDestinos', checkScopePolicy(['opa-credits-api', 'opa-simulators-api']), BuscarDestinosSimuladorCreditos);
  router.post('/SimuladorCreditos/BuscarPeriodicidad', checkScopePolicy(['opa-credits-api', 'opa-simulators-api']), BuscarPeriodicidadCreditos);
  router.post('/SimuladorCreditos/calcular', checkScopePolicy(['opa-credits-api', 'opa-simulators-api']), calcularCredito);
  router.post('/SimuladorCreditos/ImprimirFront', checkScopePolicy(['opa-credits-api', 'opa-simulators-api']), imprimirCreditosFront);
  router.post('/SedesVAcasionales', checkScopePolicy(['opa-vacationvenues-api']), sedesVacacionales);
  router.post('/Traerauxilios', checkScopePolicy(['opa-aid-api']), Traerauxilios);
  router.post('/Crearsolicituddeseguros', checkScopePolicy(['opa-insurance-api']), Crearsolicituddeseguros);
  router.post('/Datosmodificaseguros', checkScopePolicy(['opa-insurance-api']), Datosmodificaseguros);
  router.post('/Psegeneral', checkScopePolicy(['opa-pse-api']), Psegeneral);
  router.post('/EstadodecuentasPSE', checkScopePolicy(['opa-accountstatus-api', 'opa-pse-api']), estadoCuentasPSE);
  router.post('/Psetransacciones', checkScopePolicy(['opa-pse-api']), transaccionesPse);
  router.post('/validarmodulos', validarmodulos);
  router.post('/ActualizaC', checkScopePolicy(['opa-security-api']), actualizarClave);
  router.post('/BancoImagenes', checkScopePolicy(['opa-security-api']), BancoImagenes);
  router.post('/guardarImagenes', checkScopePolicy(['opa-security-api']), guardarImagenes);
  router.post('/PagoNomina', checkScopePolicy(['opa-accountstatus-api']), pagoNomina);
  router.post('/Cerrarsession', Cerrarsession);
  router.post('/GANAconsultaAhorros', checkScopePolicy(['opa-gana-api']), GANAconsultaAhorros);
  router.post('/PseHistorico', checkScopePolicy(['opa-pse-api']), PseHistorico);
  router.post('/movimientoTercero', checkScopePolicy(['opa-credits-api']), movimientoTercero);
  router.post('/ValidarsegundaClave', checkScopePolicy(['opa-security-api']), ValidarsegundaClave);
  router.post('/SegundaClave', checkScopePolicy(['opa-security-api']), SegundaClave);
  router.post('/registrarsolicitudvida', checkScopePolicy(['opa-insurance-api']), registrarsolicitudvida);
  router.post('/cursos', checkScopePolicy(['opa-courses-api']), cursos);
  router.post('/Listausuarios', checkScopePolicy(['opa-associates-api', 'opa-others-api']), Listausuarios);
  router.post('/DatosAsociados', checkScopePolicy(['opa-associates-api', 'opa-others-api']), DatosAsociados);
  router.post('/codigoscajaparaTransacciones', checkScopePolicy(['opa-others-api']), codigoscajaparaTransacciones);
  router.post('/ActiveRequests', checkScopePolicy(['opa-others-api']), ActiveRequests);
  router.post('/transaccionproducto', checkScopePolicy(['opa-others-api']), transaccionproducto);
  router.post('/consultasvarias', checkScopePolicy(['opa-associates-api']), consultasvarias);
  router.post('/CreacionProductos', checkScopePolicy(['opa-others-api']), CreacionProductos);
  router.post('/Datosreimpresiontraopamovil', checkScopePolicy(['opa-others-api']), Datosreimpresiontraopamovil);
  router.post('/Informecuadrecajero', checkScopePolicy(['opa-others-api']), Informecuadrecajero);
  router.post('/datosasociadosparaactualizar', checkScopePolicy(['opa-security-api']), datosasociadosparaactualizar);
  router.post('/procesarNitsVsAsociados', checkScopePolicy(['opa-associates-api']), procesarNitsVsAsociados);
  router.post('/vervalidaciontran', checkScopePolicy(['opa-branch-api']), vervalidaciontran);
  router.post('/generarcodigotran', checkScopePolicy(['opa-branch-api']), generarcodigotran);
  router.post('/traerdatoscreacionahofecsa', checkScopePolicy(['opa-others-api']), traerdatoscreacionahofecsa);
  router.post('/crearsolicitud', checkScopePolicy(['opa-aid-api', 'opa-insurance-api']), crearsolicitud);
  router.post('/registrarsolicitudFMC', checkScopePolicy(['opa-insurance-api']), registrarsolicitudFMC);
  router.post('/registrarsolicitudMovil', checkScopePolicy(['opa-insurance-api']), registrarsolicitudMovil);
  router.post('/registrarsolicitudSoat', checkScopePolicy(['opa-insurance-api']), registrarsolicitudSoat);
  router.post('/registrarsolicitudHogar', checkScopePolicy(['opa-insurance-api']), registrarsolicitudHogar);
  router.post('/registrarsolicitudVehiculos', checkScopePolicy(['opa-insurance-api']), registrarsolicitudVehiculos);
  router.post('/registrarsolicitudexequial', checkScopePolicy(['opa-insurance-api']), registrarsolicitudexequial);
  router.post('/ReservasVAcasionales', checkScopePolicy(['opa-vacationvenues-api']), ReservasVAcasionales);
  router.post('/rangosEfecty', checkScopePolicy(['opa-efecty-api']), rangosEfectyController);
  router.post('/generarcodigoefecty', checkScopePolicy(['opa-efecty-api']), generarCodigoEfectyController);
  router.post('/authEfecty', checkScopePolicy(['opa-efecty-api']), authEfectyController);
  // TODO: Probar estas rutas hacia abajo que no están en la app o no se ve el path apra probar
  router.post('/consultaparapagos', checkScopePolicy(['opa-others-api']), consultaparapagos);
  router.post('/consultaconexionparapagos', checkScopePolicy(['opa-gana-api']), consultaconexionparapagos);
  router.post('/Validarconexion', checkScopePolicy(['opa-gana-api']), Validarconexion);
  router.post('/ConsultarLineasRetiroahorros', checkScopePolicy(['opa-savings-api']), ConsultarLineasRetiroahorros);
  router.post('/insertarSolicitudRetiroAhorros', checkScopePolicy(['opa-savings-api']), insertarSolicitudRetiroAhorros);
  router.post('/NotasHistoricas', checkScopePolicy(['opa-security-api']), NotasHistoricas);
  router.post('/ConsultarParentesco', checkScopePolicy(['opa-security-api']), ConsultarParentesco);
  router.post('/insertarSolicitudCreditos', checkScopePolicy(['opa-credits-api']), insertarSolicitudCreditos);
  router.post('/vermasapp', checkScopePolicy(['opa-others-api']), vermasapp);
  router.post('/procesabeneficiarios', checkScopePolicy(['opa-security-api']), procesabeneficiarios);
  router.post('/misCodeudores', checkScopePolicy(['opa-accountstatus-api']), misCodeudores);
  router.post('/CodeudorDe', checkScopePolicy(['opa-accountstatus-api']), CodeudorDe);
  router.post('/Certificado/Afiliacion', certificadosSucursal);
  router.post('/Certificado/Credito', certificadosSucursal);
  router.post('/Certificado/Retencion', certificadosSucursal);
  router.post('/descuentosNomina', checkScopePolicy(['opa-accountstatus-api']), (req, res) => { descuentosNomina(req, res, integradorFactory); });

  router.post('/estadoCuentasCompleto', checkScopePolicy(['opa-accountstatus-api']), (req, res) => { estadoCuentasCompleto(req, res, integradorFactory); });
  router.post('/estadoCuentasCompletoPrint', checkScopePolicy(['opa-accountstatus-api']), (req, res) => { estadoCuentasCompletoPrint(req, res, integradorFactory); });

  router.post('/seguimientoAhorro', checkScopePolicy(['opa-savings-api', 'opa-accountstatus-api']), seguimientoAhorro);
  router.post('/seguimientoCredito', checkScopePolicy(['opa-credits-api', 'opa-accountstatus-api']), seguimientoCredito);
  router.post('/seguimientoNovedad', checkScopePolicy(['opa-credits-api', 'opa-accountstatus-api']), seguimientoNovedad);
  router.get('/parametronivedadessolicitud', checkScopePolicy(['opa-credits-api']), parametronovedades);
  router.post('/Novedadessolicitud', checkScopePolicy(['opa-credits-api']), Novedadessolicitud);
  router.post('/AuthFirma', checkScopePolicy(['opa-credits-api']), getTokenFE);

  // proxy opa cloud
  router.use('/OpaCloud', checkScopePolicy(['opa-associates-api', 'opa-others-api']), OpaCloudValidateProxy, OpaCloudProxy);

  router.get('/prueba2', checkScopePolicy(['opa-accountstatus-api', 'opa-savings-api']), (req, res) => {
    res.send({
      message: 'HELLO',
    });
  });
}).catch(() => {
  process.exit(1);
});

module.exports = router;
