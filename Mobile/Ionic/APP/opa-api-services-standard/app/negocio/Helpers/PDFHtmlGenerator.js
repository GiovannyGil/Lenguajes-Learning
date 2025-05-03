const fs = require('fs');
const pdfCreator = require('pdf-creator-node');
const config = require('../../../config.json');

function base64Encode(file) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString('base64');
}

const makePdf = (data, header, footer, html) => {
  const options = {
    format: 'A4',
    orientation: 'portrait',
    border: '10mm',
    header,
    footer,
  };

  const document = {
    html,
    data,
    type: 'stream',
  };

  return pdfCreator
    .create(document, options)
    .then((res) => res)
    .catch((error) => {
      // eslint-disable-next-line
      console.error(error);
    });
};

const numberFormatBase = (value, rts, rds, rdl) => {
  // Helper parameters
  const dl = rdl !== undefined ? rdl : 2;
  const ts = rts || '.';
  const ds = rds || ',';

  // Parse to float
  const valueUse = parseFloat(value || 0);

  // The regex
  const re = `\\d(?=(\\d{3})+${dl > 0 ? '\\D' : '$'})`;

  // Formats the number with the decimals
  /* eslint no-bitwise: ["error", { "allow": ["~"] }] */
  const num = valueUse.toFixed(Math.max(0, ~~dl));

  // Returns the formatted number
  return (ds ? num.replace('.', ds) : num).replace(new RegExp(re, 'g'), `$&${ts}`);
};

const numberFormatPercentage = (value, rts, rds) => numberFormatBase(value, rts, rds);

const numberFormat = (value, rts, rds) => {
  let dl;

  if (config.entidad.codigo === '0180') {
    dl = 0;
  }

  return numberFormatBase(value, rts, rds, dl);
};
const numberFormatString = (value) => {
  if (config.entidad.codigo === '0180') {
    return value.split(',')[0];
  }

  return value;
};

module.exports = {
  makePdf,
  base64Encode,
  numberFormat,
  numberFormatPercentage,
  numberFormatString,
};
