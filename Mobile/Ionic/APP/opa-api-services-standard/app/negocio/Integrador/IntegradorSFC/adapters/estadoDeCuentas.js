const RespuestaProductos = require('../../interfaces/productos/RespuestaProductos');
const AhorroBase = require('../../interfaces/productos/AhorroBase');
const CreditoBase = require('../../interfaces/productos/CreditoBase');
const NovedadBase = require('../../interfaces/productos/NovedadBase');
const DebitoBase = require('../../interfaces/productos/DebitoBase');

const estadoDeCuentas = (productosBase) => {
  const respuesta = new RespuestaProductos();

  const [AHORRO, CREDIT, ESTNOV, ESTDEB] = productosBase;

  // tranform ahorros
  const productosAhorros = AHORRO.map((ahorroItem) => {
    const newAhorroItem = new AhorroBase();
    newAhorroItem.Mensaje = ahorroItem.Mensaje;
    newAhorroItem.Codigo = ahorroItem.Codigo;
    newAhorroItem.Tipo = ahorroItem.Tipo;
    newAhorroItem.Linea = ahorroItem.Linea;
    newAhorroItem.NumeroCuentaAhorros = ahorroItem.NumeroCuentaAhorros;
    newAhorroItem.NombreLineaAhorros = ahorroItem.NombreLineaAhorros;
    newAhorroItem.SaldoTotalCuenta = ahorroItem.SaldoTotalCuenta;
    newAhorroItem.InteresCausadoCuenta = ahorroItem.InteresCausadoCuenta;
    newAhorroItem.InteresDisponibleCuenta = ahorroItem.InteresDisponibleCuenta;
    newAhorroItem.RetencionFuenteAcumulada = ahorroItem.RetencionFuenteAcumulada;
    newAhorroItem.ValorCuotaAhorro = ahorroItem.ValorCuotaAhorro;
    newAhorroItem.MorosidadCuenta = ahorroItem.MorosidadCuenta;
    newAhorroItem.FechaAperturaCuenta = ahorroItem.FechaAperturaCuenta;
    newAhorroItem.FechaVenceCuenta = ahorroItem.FechaVenceCuenta;
    newAhorroItem.PlazoCuenta = ahorroItem.PlazoCuenta;
    newAhorroItem.PeriodoLiquidacionCuenta = ahorroItem.PeriodoLiquidacionCuenta;
    newAhorroItem.SaldoTransitoCuenta = ahorroItem.SaldoTransitoCuenta;
    newAhorroItem.agencia = ahorroItem.agencia;
    newAhorroItem.ultimaFechaTransaccion = ahorroItem.ultimaFechaTransaccion;
    newAhorroItem.estotal = ahorroItem.estotal;
    newAhorroItem.idAhorro = ahorroItem.Linea;

    return newAhorroItem;
  });
  // tranform creditos

  const productosCreditos = CREDIT.map((creditItem) => {
    const newCreditItem = new CreditoBase();

    newCreditItem.Mensaje = creditItem.Mensaje;
    newCreditItem.Codigo = creditItem.Codigo;
    newCreditItem.Fecha = creditItem.Fecha;
    newCreditItem.CodigoLinea = creditItem.CodigoLinea;
    newCreditItem.CodigoDestino = creditItem.CodigoDestino;
    newCreditItem.NombreLinea = creditItem.NombreLinea;
    newCreditItem.nombredestino = creditItem.nombredestino;
    newCreditItem.Pagare = creditItem.Pagare;
    newCreditItem.Anualidad = creditItem.Anualidad;
    newCreditItem.FechaVenceCuota = creditItem.FechaVenceCuota;
    newCreditItem.SaldoPonerseDia = creditItem.SaldoPonerseDia;
    newCreditItem.SaldoCapital = creditItem.SaldoCapital;
    newCreditItem.Capital = creditItem.Capital;
    newCreditItem.intcorriente = creditItem.intcorriente;
    newCreditItem.intmora = creditItem.intmora;
    newCreditItem.esrotativo = creditItem.esrotativo;
    newCreditItem.ultimaFechaTransaccion = creditItem.ultimaFechaTransaccion;
    newCreditItem.disponible = creditItem.disponible;
    newCreditItem.cupo = creditItem.cupo;
    newCreditItem.diaCorte = creditItem.diaCorte;
    newCreditItem.estotal = creditItem.estotal;
    newCreditItem.cuotaspagadas = creditItem.cuotaspagadas;
    newCreditItem.cuotasapagar = creditItem.cuotasapagar;
    newCreditItem.creditosId = creditItem.Pagare;

    return newCreditItem;
  });

  // tranform estado novedades
  const productosNovedades = ESTNOV.map((estnovItem) => {
    const newEstnovItem = new NovedadBase();
    newEstnovItem.CuentaContableNovedad = estnovItem.CuentaContableNovedad;
    newEstnovItem.NombreNovedad = estnovItem.NombreNovedad;
    newEstnovItem.NumeroNovedad = estnovItem.NumeroNovedad;
    newEstnovItem.CuotaNovedad = estnovItem.CuotaNovedad;
    newEstnovItem.SaldoNovedad = estnovItem.SaldoNovedad;
    newEstnovItem.ValorMoraNovedad = estnovItem.ValorMoraNovedad;
    newEstnovItem.NroCuotasMoraNovedad = estnovItem.NroCuotasMoraNovedad;
    newEstnovItem.NovedadPagadaHasta = estnovItem.NovedadPagadaHasta;
    newEstnovItem.codnovedad = estnovItem.codnovedad;
    newEstnovItem.saldoinicial = estnovItem.saldoinicial;
    newEstnovItem.Mensaje = estnovItem.Mensaje;

    return newEstnovItem;
  });
  // tranform estado debitos
  const productosDebitos = ESTDEB.map((estdebItem) => {
    const newEstdebItem = new DebitoBase();
    newEstdebItem.NombreLineaAhorros = estdebItem.NombreLineaAhorros;
    newEstdebItem.NumeroCuentaAhorros = estdebItem.NumeroCuentaAhorros;
    newEstdebItem.NumeroCuentaAhorros = estdebItem.NumeroCuentaAhorros;
    newEstdebItem.FechaAperturaCuenta = estdebItem.FechaAperturaCuenta;
    newEstdebItem.FechaVenceCuenta = estdebItem.FechaVenceCuenta;
    newEstdebItem.ValorCuotaAhorro = estdebItem.ValorCuotaAhorro;
    newEstdebItem.SaldoTotalCuenta = estdebItem.SaldoTotalCuenta;
    newEstdebItem.InteresCausadoCuenta = estdebItem.InteresCausadoCuenta;
    newEstdebItem.Mensaje = estdebItem.Mensaje;

    return newEstdebItem;
  });

  respuesta.AHORRO = productosAhorros;
  respuesta.CREDIT = productosCreditos;
  respuesta.ESTNOV = productosNovedades;
  respuesta.ESTDEB = productosDebitos;

  return respuesta;
};

module.exports = estadoDeCuentas;
