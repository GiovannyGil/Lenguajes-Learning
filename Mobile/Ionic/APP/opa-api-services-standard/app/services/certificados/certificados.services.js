const sql = require('../../model/mssql');
const { model } = require('../database.services');
const assetsEntidad = require('../../negocio/Helpers/assetsEntidad')();
const GeneradorCertificados = require('../../negocio/Asociados/Certificados/Afiliacion');

const certificadosService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'PACERTIFICADOS')
    .then((datos) => {
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
      switch (parameters.Tipo) {
        case 'AFILIA':
          funcionGeneradorCertificado = GeneradorCertificados.afiliacionEstandar;
          break;
        case 'AFIDEU':
          funcionGeneradorCertificado = GeneradorCertificados.deudaEstandar;
          break;
        case 'INGRET' && assetsEntidad.numeroentidad === '0046':
          funcionGeneradorCertificado = GeneradorCertificados.retencionEstandar;
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
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

module.exports = {
  certificadosService,
};
