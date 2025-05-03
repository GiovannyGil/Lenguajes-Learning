const fs = require('fs');
const path = require('path');
const RSVP = require('rsvp');
const { Report } = require('fluentreports');

function generate(data) {
  const promise = new RSVP.Promise((resolve, reject) => {
    const header = (rpt) => {
      rpt.image('./imagen/Femfuturo/LogoEntidad.PNG');
      rpt.newLine(2);

      rpt.print(`Fecha de expedición: ${data['#FECHAACTUAL#']}`,
        {
          align: 'left',

        });

      rpt.newLine(4);

      rpt.print(data['#ENTIDAD#'], {
        align: 'center',
      });
      rpt.print('CERTIFICA:', {
        align: 'center',
      });
      rpt.newLine(3);

      rpt.print(`Que ${data['#NOMBRE#']}, identificado(a) con cédula de ciudadanía número ${data['#CEDULA#']} de ${
        data['#CIUDAD#']}, es Asociado (a) del ${
        data['#ENTIDAD#']} y se encuentra vinculado desde ${data['#FECHA#'].trim()}.`, {
        align: 'left',
      });

      rpt.newLine(4);
      rpt.print('Este certificado se expide por solicitud de el (la) interesado (a)', {
        align: 'left',
      });

      rpt.newLine(7);

      rpt.print('________________________________________________');
      rpt.print(data['#ENTIDAD#']);

      rpt.newLine(6);

      rpt.print('Dirección: Calle 50 N° 51-75 Medellín - Colombia', {
        align: 'center',
      });
      rpt.print(`Teléfono: ${data.telefono} `, {
        align: 'center',
      });
      rpt.print('Web: www.femfuturo.com.co', {
        align: 'center',
      });
    };

    const rpt = new Report(path.join(__dirname, '../../vistas/pdf/myreportAfiliacion.pdf'));

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
