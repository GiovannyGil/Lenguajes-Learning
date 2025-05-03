const LineasSimulacionCDAT = require('../../interfaces/productos/LineasSimulacionCDAT');
const LineasSimulacionCreditos = require('../../interfaces/productos/LineasSimulacionCreditos');
const DestinosSimulacionCreditoBase = require('../../interfaces/productos/DestinosSimulacionCreditoBase');
const ResultadoSimuladorCreditoBase = require('../../interfaces/productos/ResultadoSimuladorCreditoBase');
const ResultadoSimuladorAhorro = require('../../interfaces/productos/ResultadoSimulacionAhorro');

function SimuladorCDATLineasAdapter(Lineas) {
  const misLineasResult = [];

  Lineas[1].map((item) => {
    const tempLinea = new LineasSimulacionCDAT();

    tempLinea.codlinea = item.key;
    tempLinea.nombre = item.value;

    misLineasResult.push(tempLinea);
    return item;
  });

  return misLineasResult;
}

function transformarBodyCDATAdapter(body) {
  const newBody = {
    tipo: 'AT',
    idProducto: body.Destino,
    monto: body.Capital,
    plazo: body.plazo,
    periodicidad: body.periodoDias,
    generaDisponible: body.capitalizacion === '1' ? 'S' : 'N',
  };

  return newBody;
}

function resultadoSimulacionAhorrosAdapter(resultado) {
  const resultadoSimulacion = [];
  resultado.general.map((item) => {
    const tmpresultado = new ResultadoSimuladorAhorro();
    tmpresultado.TotalCapital = item.capitalAhorro.trim().replace(/\./g, '');
    tmpresultado.InteresNetoEntregar = item.interesPagado.trim().replace(/\./g, '');
    tmpresultado.TasaPeriodica = item.tasaEfectiva.trim().replace(/\./g, '');
    tmpresultado.Tasaperiodica = item.tasaPeriodica.trim().replace(/\./g, '');
    tmpresultado.TasaInteresNominal = item.tasaNominal.trim().replace(/\./g, '');
    tmpresultado.TotalRte = item.rteFte.trim().replace(/\./g, '');
    tmpresultado.valorEntregar = item.valorEntregar.trim().replace(/\./g, '');

    tmpresultado.TotalCapital = tmpresultado.TotalCapital.replace(',', '.');
    tmpresultado.InteresNetoEntregar = tmpresultado.InteresNetoEntregar.replace(',', '.');
    tmpresultado.TasaPeriodica = tmpresultado.TasaPeriodica.replace(',', '.');
    tmpresultado.Tasaperiodica = tmpresultado.Tasaperiodica.replace(',', '.');
    tmpresultado.TasaInteresNominal = tmpresultado.TasaInteresNominal.replace(',', '.');
    tmpresultado.TotalRte = tmpresultado.TotalRte.replace(',', '.');
    tmpresultado.valorEntregar = tmpresultado.valorEntregar.replace(',', '.');

    tmpresultado.version2 = true;

    resultadoSimulacion.push(tmpresultado);
    return resultadoSimulacion;
  });
  return resultadoSimulacion;
}

function simuladorCreditosLineasAdapter(Lineas) {
  const misLineasResult = [];

  Lineas[1].map((item) => {
    const tempLinea = new LineasSimulacionCreditos();
    tempLinea.codcuenta = '';
    tempLinea.codcuentaingresocorrientes = '';
    tempLinea.codcuentaingresosmora = '';
    tempLinea.codlinea = item.value;
    tempLinea.idlineas = item.key;
    misLineasResult.push(tempLinea);

    return item;
  });
  return misLineasResult;
}

function simuladorCreditosDestinosAdapter(Destinos) {
  const misDestinosResult = [];
  Destinos[1].map((item) => {
    const tempDestino = new DestinosSimulacionCreditoBase();
    tempDestino.nombredestino = item.value;

    tempDestino.coddestino = item.key;

    misDestinosResult.push(tempDestino);
    return item;
  });

  return misDestinosResult;
}

function simuladorCreditosPeriodicidadAdapter(Periodicidad) {
  const periodicidadResult = [];
  Periodicidad[0].map((item) => {
    periodicidadResult.push(item);
    return item;
  });
  return periodicidadResult;
}

function parametrosSimulacionCreditosAdapter(parametros, clienteId) {
  const extras = [];
  JSON.parse([parametros.extras]).map((itemExtras) => {
    const resultExtras = { valorFuturo: '', plazo: '' };
    resultExtras.valorFuturo = itemExtras.Abono;
    resultExtras.plazo = itemExtras.Numero;
    extras.push(resultExtras);
    return resultExtras;
  });
  let periodicidadIn = '';
  switch (parametros.periodicidad) {
    case '30':
      periodicidadIn = 'M';
      break;

    case '15':
      periodicidadIn = 'Q';
      break;

    case '14':
      periodicidadIn = 'O';
      break;

    case '10':
      periodicidadIn = 'D';
      break;

    case '7':
      periodicidadIn = 'E';
      break;

    default:
      break;
  }
  const parameterSimulacion = {
    tipo: 'CR',
    idProducto: parametros.Coddestino,
    periodicidad: periodicidadIn,
    plazo: parametros.plazo,
    monto: parametros.Capitalprestar,
    clienteId: clienteId.id,
    cuotasExtras: extras,
  };
  return parameterSimulacion;
}

function resultadoSimulacionCreditosAdapter(resultado) {
  const resultadoSimulacion = [];
  const { interesCredito } = resultado.valores[0];
  resultado.general.map((item) => {
    const tmpresultado = new ResultadoSimuladorCreditoBase();
    tmpresultado.Cuota = Number(item.anualidad.split('.').join('').replace(',', '.'));
    tmpresultado.SaldoCapital = Number(item.montoSolicitado.split('.').join('').replace(',', '.'));
    tmpresultado.Plazo = item.plazo;
    tmpresultado.Periodicidad = resultado.periodicidadO;
    tmpresultado.TasaPeriodica = Number(item.tasaPeriodica.replace(',', '.'));
    tmpresultado.TotalInteresCorriente = Number(interesCredito.split('.').join('').replace(',', '.'));
    tmpresultado.Mensaje = '';
    resultadoSimulacion.push(tmpresultado);
    return item;
  });
  return resultadoSimulacion;
}

module.exports = {
  simuladorCreditosLineasAdapter,
  simuladorCreditosDestinosAdapter,
  simuladorCreditosPeriodicidadAdapter,
  parametrosSimulacionCreditosAdapter,
  resultadoSimulacionCreditosAdapter,
  SimuladorCDATLineasAdapter,
  resultadoSimulacionAhorrosAdapter,
  transformarBodyCDATAdapter,
};
