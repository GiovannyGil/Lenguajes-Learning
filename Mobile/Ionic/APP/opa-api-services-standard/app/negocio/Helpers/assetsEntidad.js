const path = require('path');
const config = require('../../../config.json');

module.exports = () => {
  const numeroentidad = config.entidad.codigo;
  const info = {
    numeroentidad,
    logo: '',
    fax: '',
    web: '',
    firma: null,
    imgwidth: 150,
    imgheight: 100,
  };

  if (numeroentidad === '0010') { // Demo
    info.logo = path.resolve(process.cwd(), 'imagen/Demo/LogoEntidad.png');
    info.fax = ' - Fax: 604-35-72';
    info.web = ' - Web: www.opa.com.co';
  } else if (numeroentidad === '0045') { // Cpio
    info.logo = path.resolve(process.cwd(), 'imagen/cpio/LogoEntidad.png');
    info.fax = ' - Fax: 513 24 21';
    info.web = ' - Web: www.cooperativapioxii.com.co';
  } else if (numeroentidad === '0180') { // Femfuturo
    info.logo = path.resolve(process.cwd(), 'imagen/Femfuturo/LogoEntidad.jpg');
    info.fax = 'Calle 50 N° 51-75 Medellín - Colombia';
  } else if (numeroentidad === '0046') { // Canapro
    info.logo = path.resolve(process.cwd(), 'imagen/Canapro/LogoEntidad.png');
    info.imgwidth = 57;
    info.imgheight = 80;
    info.footer = path.resolve(process.cwd(), 'imagen/Canapro/footer.png');
    info.calidad = path.resolve(process.cwd(), 'imagen/Canapro/Calidad.png');
  } else if (numeroentidad === '0193') { // Fecom
    info.logo = path.resolve(process.cwd(), 'imagen/Fecom/LogoEntidad.png');
    info.fax = ' ';
    info.web = ' - Web: www.fecom.com.co';
  } else if (numeroentidad === '0321') { // Fonducar
    info.logo = path.resolve(process.cwd(), 'imagen/Fonducar/LogoEntidad.png');
  } else if (numeroentidad === '0050') { // Cooptenjo
    info.logo = 'imagen/Cooptenjo/LogoEntidad.png';
  } else if (numeroentidad === '0052') { // Coonfie
    info.logo = 'imagen/Coonfie/LogoEntidad.png';
  } else if (numeroentidad === '0419') { // Datakondor
    info.logo = 'imagen/Dotakondor/icon.png';
    info.imgwidth = 102;
    info.imgheight = 98;
  } else if (numeroentidad === '0015') { // Banafe
    info.logo = path.resolve(process.cwd(), 'imagen/Banafe/LogoEntidad.png');
    info.imgwidth = 97;
    info.imgheight = 97;
  } else if (numeroentidad === '0127') { // Fecsa
    info.logo = path.resolve(process.cwd(), 'imagen/Fecsa/LogoEntidad.png');
  } else if (numeroentidad === '0432') { // Semillas Fec
    info.logo = path.resolve(process.cwd(), 'imagen/Cadena/LogoEntidadCadena.png');
  } else if (numeroentidad === '0091') { // Riachon
    info.logo = path.resolve(process.cwd(), 'imagen/Riachon/LogoEntidad.png');
    info.imgwidth = 97;
    info.imgheight = 97;
    info.firma = path.resolve(process.cwd(), 'imagen/Riachon/FirmaCertificado.png');
  } else if (numeroentidad === '0048') { // Forjar
    info.logo = path.resolve(process.cwd(), 'imagen/Forjar/LogoEntidadmini.png'); 
    info.firma = path.resolve(process.cwd(), 'imagen/Forjar/FirmaCertificado.png');
  } else {
    info.logo = path.resolve(process.cwd(), 'imagen/Demo/LogoEntidad.png');
    info.fax = ' - Fax: 604-35-72';
    info.web = ' - Web: www.opa.com.co';
  }

  return info;
};
