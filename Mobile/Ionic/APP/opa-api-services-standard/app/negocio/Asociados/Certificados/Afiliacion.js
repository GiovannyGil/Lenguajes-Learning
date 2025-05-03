const fs = require('fs');
const { makePdf, base64Encode } = require('../../Helpers/PDFHtmlGenerator');
const config = require('../../../../config.json');

// array global
const arrayEntidad = ['0091', '0048']

const numberFormat = (n) => n;
const afiliacionEstandar = ({
  logo, data, firma, web,
}) => {
  // if (config.entidad.codigo === '0091') {
  //   // eslint-disable-next-line no-param-reassign
  //   data['#firma#'] = 'firma';
  // } else {
  //   // eslint-disable-next-line no-param-reassign
  //   data['#firma#'] = 'no-firma';
  // }
  // const entidad = '0048'
  
  if(arrayEntidad.includes(config.entidad.codigo)) {
    // eslint-disable-next-line no-param-reassign
    data['#firma#'] = 'firma';
  } else {
    // eslint-disable-next-line no-param-reassign
    data['#firma#'] = 'no-firma';
  }

  if (config.entidad.codigo === '0048') {
    // eslint-disable-next-line no-param-reassign
    data['#pLogo#'] = 'pLogo';
  } else {
    // eslint-disable-next-line no-param-reassign
    data['#pLogo#'] = 'pLogo-no';
  }

  const html = fs.readFileSync(`${process.cwd()}/app/negocio/vistas/plantillas/certificados/afiliacion.html`, 'utf8');
  const logoBase64 = base64Encode(logo);
  const FirmaCertificado = firma ? base64Encode(firma) : null;
  const footer = {
    height: '28mm',
    contents: `
      <p style="text-align: center;">Dirección: ${data.direccion} ${web}</p>
      <p style="text-align: center;">E-mail: ${data.email} - PBX: ${data.telefono}</p>
    `,
  };

  if (!FirmaCertificado) return makePdf({ ...data, logoBase64 }, undefined, footer, html);
  return makePdf({ ...data, logoBase64, FirmaCertificado }, undefined, footer, html);
};

const deudaEstandar = ({
  logo, data, web, firma,
}) => {
  if (arrayEntidad.includes(config.entidad.codigo)) {
    // eslint-disable-next-line no-param-reassign
    data['#firma#'] = 'firma';
  } else {
    // eslint-disable-next-line no-param-reassign
    data['#firma#'] = 'no-firma';
  }

  if (config.entidad.codigo === '0048') {
    // eslint-disable-next-line no-param-reassign
    data['#pLogo#'] = 'pLogo';
  } else {
    // eslint-disable-next-line no-param-reassign
    data['#pLogo#'] = 'pLogo-no';
  }

  const html = fs.readFileSync(`${process.cwd()}/app/negocio/vistas/plantillas/certificados/deuda.html`, 'utf8');
  const logoBase64 = base64Encode(logo);
  const FirmaCertificado = firma ? base64Encode(firma) : null;
  const footer = {
    height: '28mm',
    contents: `
      <p style="text-align: center;">Dirección: ${data.direccion} ${web}</p>
      <p style="text-align: center;">E-mail: ${data.email} - PBX: ${data.telefono}</p>
    `,
  };

  if (!FirmaCertificado) return makePdf({ ...data, logoBase64 }, undefined, footer, html);
  return makePdf({ ...data, logoBase64, FirmaCertificado }, undefined, footer, html);
};

const retencionEstandar = ({
  logo, web, data, data2, data3, firma,
}) => {
  if (arrayEntidad.includes(config.entidad.codigo)) {
    // eslint-disable-next-line no-param-reassign
    data['#firma#'] = 'firma';
  } else {
    // eslint-disable-next-line no-param-reassign
    data['#firma#'] = 'no-firma';
  }

  if (config.entidad.codigo === '0048') {
    // eslint-disable-next-line no-param-reassign
    data['#pLogo#'] = 'pLogo';
  } else {
    // eslint-disable-next-line no-param-reassign
    data['#pLogo#'] = 'pLogo-no';
  }

  const html = fs.readFileSync(`${process.cwd()}/app/negocio/vistas/plantillas/certificados/retencion.html`, 'utf8');
  const logoBase64 = base64Encode(logo);
  const FirmaCertificado = firma ? base64Encode(firma) : null;

  const dataValues = {
    saldo_av: numberFormat(data.saldo_av),
    saldo_ap: numberFormat(data.saldo_ap),
    saldo_ac: numberFormat(data.saldo_ac),
    saldo_at: numberFormat(data.saldo_at),
    saldo_31_ahorros: numberFormat(data.saldo_31_ahorros),
    saldo_po: numberFormat(data.saldo_po),
    saldo_rev: numberFormat(data.saldo_rev),
    saldo_cr: numberFormat(data.saldo_cr),
    interes_viv: numberFormat(data.interes_viv),
    interes_cr: numberFormat(data.interes_cr),
    interes_ah: numberFormat(data.interes_ah),
    base: numberFormat(data.base),
    retencion: numberFormat(data.retencion),
    componente: numberFormat(data.componente),
    ingreso: numberFormat(data.ingreso),
    base_gmf: numberFormat(data.base_gmf),
    gmf_aso: numberFormat(data.gmf_aso),
    intcausahorros: numberFormat(data3.intcausahorros),
    intcausacreditos: numberFormat(data3.intcausacreditos),
    porcobrar: numberFormat(data3.porcobrar),
    porpagar: numberFormat(data3.porpagar),
  };

  const footer = {
    height: '28mm',
    contents: `
      <p>Este certificado no requiere firma autógrafa por expedirse por medio de computador según el artículo 10 del decreto 836 de 1991.</p>
      <p></p>
      <p style="text-align: center;">Dirección: ${data2.direccion} ${web}</p>
      <p style="text-align: center;">E-mail: ${data2.email} - PBX: ${data2.telefono}</p>
    `,
  };

  if (!FirmaCertificado) {
    return makePdf(
      {
        ...data, ...data2, ...data3, ...dataValues, logoBase64,
      }, undefined, footer, html,
    );
  }
  return makePdf(
    {
      ...data, ...data2, ...data3, ...dataValues, logoBase64, FirmaCertificado,
    }, undefined, footer, html,
  );
};

module.exports = {
  afiliacionEstandar,
  deudaEstandar,
  retencionEstandar,
};
