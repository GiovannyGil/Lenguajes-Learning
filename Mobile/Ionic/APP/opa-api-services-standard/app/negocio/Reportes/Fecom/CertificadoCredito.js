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

      rpt.newLine(3);

      rpt.print('EL FONDO DE EMPLEADOS DE COMFENALCO ANTIOQUIA', {
        align: 'center',
      });
      rpt.print('CERTIFICA:', {
        align: 'center',
      });
      rpt.newLine(3);

      rpt.print(`Que ${data['#NOMBRE#']}, identificado(a) con ${data['#TIPODOCUMENTO#']} número ${data['#CEDULA#']} como deudor, adeuda al FONDO DE EMPLEADOS DE COMFENALCO ANTIOQUIA la suma de ${data['#VALORLETRAS#']} pesos ($${data['#VALORDEUDA#']}),saldo a la fecha por concepto de créditos.`, {
        align: 'left',
      });

      rpt.newLine(4);
      rpt.print('Este certificado se expide por solicitud de el (la) interesado (a)', {
        align: 'left',
      });

      rpt.newLine(5);

      rpt.print('________________________________________________');
      rpt.print('DEPARTAMENTO DE CARTERA');
      rpt.print('FONDO DE EMPLEADOS DE COMFENALCO ANTIOQUIA');
      rpt.print(`OFICINA: ${data['#NOMREAGENCIA#']}`);

      rpt.newLine(8);

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

    // Create a new Report Engine
    // pipeStream is predefined in this report to make it display in the browser
    const rpt = new Report(path.join(__dirname, '../../vistas/pdf/myreportCredito.pdf'));

    // Configure the Defaults
    rpt
      .margins(40)
      .header(header)
      .data(data);

    // Run the Report
    // displayReport is predefined to make it display in the browser
    rpt.render((err, reportName) => {
      if (err) return reject(err);
      const stream = fs.createReadStream(reportName);
      return resolve(stream);
    });
  });

  return promise;
}

module.exports = generate;
