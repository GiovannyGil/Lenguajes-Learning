const RespuestaProductos = require('../../interfaces/productos/RespuestaProductos');
const AhorroBase = require('../../interfaces/productos/AhorroBase');
const CreditoBase = require('../../interfaces/productos/CreditoBase');
const DebitoBase = require('../../interfaces/productos/DebitoBase');
const NovedadBase = require('../../interfaces/productos/NovedadBase');

const estadoDeCuentas = (productosBase) => {
  const respuesta = new RespuestaProductos();
  const productsResult = productosBase;

  // tranform ahorros
  productsResult.AH = productosBase.AH.map((productoV2) => {
    const producto = new AhorroBase();
    try {
      producto.Mensaje = '';
      producto.Codigo = '';
      producto.Tipo = productoV2.Tipo; // evaluar tipos
      producto.Linea = productoV2.Linea;
      producto.NumeroCuentaAhorros = productoV2.Cuenta.toString();
      producto.NombreLineaAhorros = productoV2.Nombre;
      producto.SaldoTotalCuenta = productoV2.SaldoEnCuenta;
      producto.InteresCausadoCuenta = productoV2.interesCausado;
      producto.InteresDisponibleCuenta = productoV2.interesDisponible;
      producto.RetencionFuenteAcumulada = productoV2.Retefuente;
      producto.ValorCuotaAhorro = productoV2.Cuota;
      producto.MorosidadCuenta = productoV2.Morosidad;
      producto.FechaAperturaCuenta = productoV2.Apertura;
      producto.FechaVenceCuenta = productoV2.Vcto;
      producto.PlazoCuenta = 0; // falta
      producto.PeriodoLiquidacionCuenta = ''; // falta
      producto.SaldoTransitoCuenta = productoV2.saldoTransito;
      producto.agencia = productoV2.agenciasId;
      producto.ultimaFechaTransaccion = ''; // falta
      producto.estotal = 1;
      producto.idAhorro = productoV2.idAhorro.toString();
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
    return producto;
  });

  // tranform creditos
  productsResult.CR = productosBase.CR.map((productoV2) => {
    const newCreditItem = new CreditoBase();
    newCreditItem.Mensaje = '';
    newCreditItem.Codigo = '';
    newCreditItem.Fecha = new Date(productoV2.AperturaCreditos);
    newCreditItem.CodigoLinea = productoV2.LineaCreditos;
    newCreditItem.CodigoDestino = 'N/A'; // falta
    newCreditItem.NombreLinea = productoV2.NombreCreditos;
    newCreditItem.nombredestino = 'N/A'; // falta
    newCreditItem.Pagare = productoV2.pagareCreditos;
    newCreditItem.Anualidad = productoV2.CuotaCreditos;
    newCreditItem.FechaVenceCuota = ''; // falta
    newCreditItem.SaldoPonerseDia = productoV2.saldodiaCreditos;
    newCreditItem.SaldoCapital = 0; // falta
    newCreditItem.Capital = productoV2.saldoTotalCreditos;
    newCreditItem.intcorriente = 0; // falta
    newCreditItem.intmora = 0; // falta
    newCreditItem.esrotativo = 'N'; // no se tiene rotativos
    newCreditItem.ultimaFechaTransaccion = ''; // falta
    newCreditItem.disponible = '0'; // no se tiene rotativos
    newCreditItem.cupo = '0'; // no se tiene rotativos
    newCreditItem.diaCorte = 1; // falta
    newCreditItem.estotal = 1;
    newCreditItem.cuotaspagadas = 0; // falta
    newCreditItem.cuotasapagar = productoV2.PlazoCreditos;
    newCreditItem.creditosId = productoV2.creditosId;
    newCreditItem.idProducto = productoV2.creditosId;

    return newCreditItem;
  });

  // tranform debitos automaticos
  productsResult.DB = productosBase.DB.map((productoV2) => {
    const newDebitItem = new DebitoBase();
    newDebitItem.NombreLineaAhorros = productoV2.nombreLinea;
    newDebitItem.NumeroCuentaAhorros = productoV2.numeroCuenta;
    newDebitItem.FechaAperturaCuenta = productoV2.fechaMatriculaDebito;
    newDebitItem.FechaVenceCuenta = productoV2.fechaInactivacionDebito;
    newDebitItem.ValorCuotaAhorro = productoV2.valorDebito;
    newDebitItem.SaldoTotalCuenta = productoV2.saldoTotal;
    newDebitItem.InteresCausadoCuenta = productoV2.interesDisponible;
    newDebitItem.Mensaje = '';

    return newDebitItem;
  });

  // tranform novedades
  productsResult.NV = productosBase.NV.map((productoV2) => {
    const newNovedadtem = new NovedadBase();
    newNovedadtem.CuentaContableNovedad = '';
    newNovedadtem.NombreNovedad = productoV2.nombreConcepto;
    newNovedadtem.NumeroNovedad = productoV2.numeroCuenta;
    newNovedadtem.CuotaNovedad = productoV2.cuotaMensual;
    newNovedadtem.SaldoNovedad = productoV2.saldoPendiente;
    newNovedadtem.ValorMoraNovedad = 0;
    newNovedadtem.NroCuotasMoraNovedad = productoV2.numeroDeCuotas;
    newNovedadtem.NovedadPagadaHasta = productoV2.fechaDeTrabajo;
    newNovedadtem.codnovedad = productoV2.codigoConcepto;
    newNovedadtem.saldoinicial = productoV2.valorTotalaDescontar;
    newNovedadtem.Mensaje = '';
    newNovedadtem.novedadId = productoV2.novedadId;

    return newNovedadtem;
  });

  respuesta.AHORRO = productsResult.AH;
  respuesta.CREDIT = productsResult.CR;
  respuesta.ESTNOV = productsResult.NV;
  respuesta.ESTDEB = productsResult.DB;

  return respuesta;
};

module.exports = estadoDeCuentas;
