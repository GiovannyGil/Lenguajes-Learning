const fs = require('fs');
const {
  makePdf, base64Encode, numberFormat, numberFormatPercentage,
} = require('../Helpers/PDFHtmlGenerator');

const SimuladorAhorrosPDF = ({
  data,
  paraimpresion,
  planDePagos,
  logo,
  fax,
  web,
}) => {
  const html = fs.readFileSync(`${process.cwd()}/app/negocio/vistas/plantillas/simuladores/ahorrosCDAT.html`, 'utf8');
  const logoBase64 = base64Encode(logo);
  const encabezado = {
    TasaInteresNominal: numberFormatPercentage(data.TasaInteresNominal),
    TasaPeriodica: numberFormatPercentage(data.TasaPeriodica),
    ValorNetaEntregar: numberFormat(data.ValorNetaEntregar),
    InteresNetoEntregar: numberFormat(data.InteresNetoEntregar),
    TotalRte: numberFormat(data.TotalRte),
    TotalCapital: numberFormat(data.TotalCapital),
    Tasaperiodica: numberFormatPercentage(data.Tasaperiodica),
    rendimientosFinancieros: numberFormat(data.InteresNetoEntregar - data.TotalRte),
  };

  let planDePagosTotales = planDePagos[0].reduce((previousValue, currentValue) => {
    const total = {
      CAPITAL: previousValue.CAPITAL,
      INTERES_GANADO: previousValue.INTERES_GANADO + currentValue.INTERES_GANADO,
      INTERES_PAGADO: previousValue.INTERES_PAGADO + currentValue.INTERES_PAGADO,
      RETEFUENTE: previousValue.RETEFUENTE + currentValue.RETEFUENTE,
    };

    return total;
  });

  let previoInteresPagado = 0;
  let previoCapital = 0;

  const planDePagosFormat = planDePagos[0].map((item) => {
    previoCapital = (previoCapital || item.CAPITAL) + previoInteresPagado;

    const totales = {
      NRO: item.NRO,
      CAPITAL: numberFormat(previoCapital),
      INTERES_GANADO: numberFormat(item.INTERES_GANADO),
      INTERES_PAGADO: numberFormat(item.INTERES_PAGADO),
      RETEFUENTE: numberFormat(item.RETEFUENTE),
    };

    previoInteresPagado = item.INTERES_PAGADO;

    return totales;
  });

  // format
  planDePagosTotales = {
    CAPITAL: numberFormat(planDePagosTotales.CAPITAL),
    INTERES_GANADO: numberFormat(planDePagosTotales.INTERES_GANADO),
    INTERES_PAGADO: numberFormat(planDePagosTotales.INTERES_PAGADO),
    RETEFUENTE: numberFormat(planDePagosTotales.RETEFUENTE),
  };

  const footer = {
    height: '28mm',
    contents: `
      <p style="text-align: center;">${fax}</p>
      <p style="text-align: center;">${web}</p>
    `,
  };

  return makePdf({
    ...encabezado,
    ...paraimpresion,
    planDePagos: planDePagosFormat,
    planDePagosTotales,
    capital: numberFormat(paraimpresion.Capital),
    logoBase64,
  }, undefined, footer, html);
};

module.exports = SimuladorAhorrosPDF;
