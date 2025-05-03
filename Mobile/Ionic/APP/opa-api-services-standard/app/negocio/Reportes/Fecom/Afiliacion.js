const fs = require('fs');
const path = require('path');
const RSVP = require('rsvp');
const { Report } = require('fluentreports');

function generate(data) {
  const promise = new RSVP.Promise((resolve, reject) => {
    const header = (rpt) => {
      rpt.image('./imagen/Fecom/LogoEntidad.PNG');
      rpt.newLine(2);

      rpt.print(`Fecha de expedición: ${data['#FECHAACTUAL#']}`,
        {
          align: 'left',

        });

      rpt.newLine(4);

      rpt.print('EL FONDO DE EMPLEADOS DE COMFENALCO ANTIOQUIA', {
        align: 'center',
      });
      rpt.print('CERTIFICA:', {
        align: 'center',
      });
      rpt.newLine(3);

      rpt.print(`Que ${data['#NOMBRE#']}, identificado(a) con ${data['#TIPODOCUMENTO#']} número ${data['#CEDULA#']} de ${data['#CIUDAD#']}, es Asociado (a) del FONDO DE EMPLEADOS DE COMFENALCO ANTIOQUIA y se encuentra vinculado desde ${data['#FECHA#']}.`, {
        align: 'left',
      });

      rpt.newLine(4);
      rpt.print('Este certificado se expide por solicitud de el (la) interesado (a)', {
        align: 'left',
      });

      rpt.newLine(7);

      rpt.print('________________________________________________');
      rpt.print('FONDO DE EMPLEADOS DE COMFENALCO ANTIOQUIA');
      rpt.print(`OFICINA:${data['#NOMREAGENCIA#']}`);

      rpt.newLine(6);

      rpt.print(`Dirección: ${data.direccion},${data['#NOMREAGENCIA#']}`, {
        align: 'center',
      });
      rpt.print(`PBX: ${data.telefono} - Fax: 573 00 22 Ext 110`, {
        align: 'center',
      });
      rpt.print(`E-mail: ${data.email} - Web: www.fecom.com.co`, {
        align: 'center',
      });
    };

    const rpt = new Report(path.join(__dirname, '../../vistas/pdf/myreportAfiliacion.pdf'));

    // Configure the Defaults
    rpt
      .margins(55)
      .header(header)
      .data(data);

    rpt.render((err, reportName) => {
      if (err) return reject(err);
      const stream = fs.createReadStream(reportName);
      return resolve(stream);
    });
  });

  return promise;
}

module.exports = generate;
