const fs = require('fs');
const path = require('path');
const RSVP = require('rsvp');
const { Report } = require('fluentreports');

function generate(data) {
  const promise = new RSVP.Promise((resolve, reject) => {
    const header = (rpt) => {
      let imgLoc = '';
      if (fs.existsSync('./imagen/Feiro/icon.png')) {
        imgLoc = './imagen/Feiro/icon.png';
        rpt.image(imgLoc, {
          x: 40, y: 20, width: 102, height: 98,
        });
      } else {
        rpt.print('No se pudo encontrar la imagen');
      }
      rpt.newLine(5);

      // console.log(data["#FECHAACTUAL#"]);

      rpt.print(`Fecha de expedición: ${data['#FECHAACTUAL#']}`,
        {
          align: 'left',

        });

      rpt.newLine(4);

      rpt.print(data['#ENTIDAD#'], {
        align: 'left',
      });
      rpt.print('CERTIFICA:', {
        align: 'center',
      });
      rpt.newLine(3);

      rpt.print(`Que ${data['#NOMBRE#']}, identificado(a) con ${data['#TIPODOCUMENTO#']} número ${data['#CEDULA#']} de ${data['#CIUDAD#']}, es Asociado (a) de la ${data['#ENTIDAD#']} y se encuentra vinculado desde ${data['#FECHA#']}.`, {
        align: 'left',
      });

      rpt.newLine(4);
      rpt.print('Este certificado se expide por solicitud de el (la) interesado (a)', {
        align: 'left',
      });

      rpt.newLine(7);

      rpt.print('________________________________________________');
      rpt.print(data['#ENTIDAD#']);
      rpt.print(`OFICINA:${data['#NOMREAGENCIA#']}`);

      rpt.newLine(4);

      rpt.print(`Dirección: ${data.direccion},${data['#NOMREAGENCIA#']}`, {
        align: 'left',
      });
      rpt.print(`PBX: ${data.telefono} - Fax: `, {
        align: 'center',
      });
      rpt.print(`E-mail: ${data.email} - Web: www.fonducar.com`, {
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
