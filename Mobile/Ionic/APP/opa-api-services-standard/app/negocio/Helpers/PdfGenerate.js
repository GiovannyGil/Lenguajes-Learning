// const { DocumentDefinition } = require('pdfmake-wrapper/server');
// const Pdfmake = require('pdfmake');
// const path = require('path');

// const printer = new Pdfmake({
//   Roboto: {
//     normal: path.resolve('app/static/fonts/Roboto-Regular.ttf'),
//     bold: path.resolve('app/static/fonts/Roboto-Medium.ttf'),
//     italics: path.resolve('app/static/fonts/Roboto-Italic.ttf'),
//     bolditalics: path.resolve('app/static/fonts/Roboto-MediumItalic.ttf'),
//   },
// });

// const definition = () => new DocumentDefinition();

// const makePdf = (pdf) => printer.createPdfKitDocument(pdf.getDefinition());

const definition = () => {};

const makePdf = (pdf) => pdf;

module.exports = {
  definition,
  makePdf,
};
