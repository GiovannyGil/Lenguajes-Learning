const fs = require('fs');
const path = require('path');
const RSVP = require('rsvp');
const { Report } = require('fluentreports');

function generate(data) {
  const promise = new RSVP.Promise((resolve, reject) => {
    const header = (rpt) => {
      rpt.image('./imagen/Cadena/LogoEntidadCadena.png');
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

      rpt.print(`Que ${data['#NOMBRE#']}, identificado(a) con ${data['#TIPODOCUMENTO#']} número ${data['#CEDULA#']} de ${data['#CIUDAD#']}, es Asociado (a) del ${data['#ENTIDAD#']} y se encuentra vinculado desde ${data['#FECHA#']}.`, {
        align: 'left',
      });

      rpt.newLine(4);
      rpt.print('Este certificado se expide por solicitud de el (la) interesado (a)', {
        align: 'left',
      });

      rpt.newLine(5);

      rpt.print('________________________________________________');
      rpt.print(data['#ENTIDAD#']);
      rpt.print(`OFICINA:${data['#NOMREAGENCIA#']}`);

      rpt.newLine(3);

      rpt.print('NO REQUIERE FIRMA AUTÓGRAFA. ART. 10 Decreto 836/91', {
        align: 'left',

      });
      rpt.newLine(2);

      rpt.print(`Dirección: ${data.direccion},${data['#NOMREAGENCIA#']}`, {
        align: 'center',
      });
      rpt.print(`PBX: ${data.telefono} `, {
        align: 'center',
      });
      rpt.print(`E-mail: ${data.email} - Web: http://www.cadena.com.co/es/home.aspx`, {
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
