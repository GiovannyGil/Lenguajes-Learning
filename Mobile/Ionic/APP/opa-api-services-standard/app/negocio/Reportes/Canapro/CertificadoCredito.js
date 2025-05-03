const fs = require('fs');
const path = require('path');
const RSVP = require('rsvp');
const { Report } = require('fluentreports');

function generate(data) {
  const promise = new RSVP.Promise((resolve, reject) => {
    const header = (rpt) => {
      if (fs.existsSync('./imagen/Canapro/LogoEntidad.png')) {
        rpt.image('./imagen/Canapro/LogoEntidad.png', {
          x: 505, y: 6, width: 57, height: 80,
        });
      } else {
        rpt.print('No se pudo encontrar la imagen');
      }
      rpt.newLine(2);

      rpt.print(`Fecha de expedición: ${data['#FECHAACTUAL#']}`, {
        align: 'left',
      });

      rpt.newLine(3);

      rpt.print(data['#ENTIDAD#'], {
        align: 'center',
      });
      rpt.print('CERTIFICA:', {
        align: 'center',
      });
      rpt.newLine(3);

      rpt.print(
        `Que ${
          data['#NOMBRE#']
        }, identificado(a) con ${
          data['#TIPODOCUMENTO#']
        } número ${
          data['#CEDULA#']
        } como deudor, adeuda al ${
          data['#ENTIDAD#']
        } la suma de ${
          data['#VALORLETRAS#']
        } pesos ($${
          data['#VALORDEUDA#']
        }),saldo a la fecha por concepto de créditos.`,
        {
          align: 'left',
        },
      );

      rpt.newLine(4);
      rpt.print(
        'Este certificado se expide por solicitud de el (la) interesado (a)',
        {
          align: 'left',
        },
      );

      rpt.newLine(5);

      rpt.print('________________________________________________');
      rpt.print('DEPARTAMENTO DE CARTERA');
      rpt.print(data['#ENTIDAD#']);
      rpt.print(`OFICINA: ${data['#NOMREAGENCIA#']}`);

      rpt.newLine(8);

      rpt.print(
        `Dirección: ${
          data.direccion
        },${
          data['#NOMREAGENCIA#']}`,
        {
          align: 'center',
        },
      );
      rpt.print(`PBX: ${data.telefono} `, {
        align: 'center',
      });
      rpt.print(
        `E-mail: ${data.email} - Web: www.canaprooc.com.co`,
        {
          align: 'center',
        },
      );
    };

    const rpt = new Report(
      path.join(__dirname, '../../vistas/pdf/myreportCredito.pdf'),
    );

    // Configure the Defaults
    rpt.margins(40).header(header).data(data);

    rpt.render((err, reportName) => {
      if (err) return reject(err);
      const stream = fs.createReadStream(reportName);
      return resolve(stream);
    });
  });

  return promise;
}

module.exports = generate;
