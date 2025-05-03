const fs = require('fs');
const path = require('path');
const RSVP = require('rsvp');
const { Report } = require('fluentreports');

function generate(data) {
  const promise = new RSVP.Promise((resolve, reject) => {
    const header = (rpt) => {
      rpt.setCurrentY(14);
      rpt.setCurrentY(rpt.getCurrentY() - 10);

      rpt.setCurrentY(50);
      rpt.print('CERTIFICADO PARA LA DECLARACION DE RENTA AÑO GRAVABLE', {
        align: 'center',
      });
      rpt.print(data['#ENTIDAD#'], {
        align: 'center',
      });
      rpt.print(`NIT${data['#NIT#']}`, {
        align: 'center',
      });
      rpt.print('HACE CONSTAR QUE:', {
        align: 'center',
      });
      rpt.newLine();

      rpt.print(`Que el asociado(a) :  ${data['#NOMBREASOCIADO#']} con documento ${data['#CEDULA#']
      } presentaba al cierre de año ${data['#ANO#']}  la siguiente informacion:`);

      rpt.newLine();
      rpt.print('Saldos a favor del asociado(a):');
      rpt.newLine();
      rpt.fontNormal();
      rpt.band([
        {
          data: 'APORTES',
          width: 250,
          align: 1,
        },
        {
          data: data['#AP#'],
          width: 250,
          align: 1,
        },
      ], {
        border: 1,
        width: 0,
      });
      rpt.band([
        {
          data: 'AHORROS',
          width: 250,
          align: 1,
        },
        {
          data: data['#AD#'],
          width: 250,
          align: 1,
        },
      ], {
        border: 1,
        width: 0,
      });

      rpt.band([
        {
          data: 'INTERESES POR PAGAR AHORROS',
          width: 250,
          align: 1,
        },
        {
          data: data['#IAH#'],
          width: 250,
          align: 1,
        },
      ], {
        border: 1,
        width: 0,
      });

      rpt.newLine();
      rpt.print('Saldos por cobrar al asociado(a):');
      rpt.newLine();
      rpt.band([
        {
          data: 'CREDITOS',
          width: 250,
          align: 1,
        },
        {
          data: data['#CR#'],
          width: 250,
          align: 1,
        },
      ], {
        border: 1,
        width: 0,
      });
      rpt.band([
        {
          data: 'INTERESES POR COBRAR CREDITOS',
          width: 250,
          align: 1,
        },
        {
          data: data['#ICR#'],
          width: 250,
          align: 1,
        },
      ], {
        border: 1,
        width: 0,
      });

      rpt.newLine();
      rpt.print('Movimiento anual:');
      rpt.newLine();
      rpt.band([
        {
          data: 'INTERESES CREDITOS DURANTE EL AÑO',
          width: 250,
          align: 1,
        },
        {
          data: data['#ICRA#'],
          width: 250,
          align: 1,
        },
      ], {
        border: 1,
        width: 0,
      });

      rpt.band([
        {
          data: 'INTERESES AHORROS DURANTE EL AÑO:',
          width: 250,
          align: 1,
        },
        {
          data: data['#IHA#'],
          width: 250,
          align: 1,
        },
      ], {
        border: 1,
        width: 0,
      });

      rpt.band([
        {
          data: 'RETENCION EN LA FUENTE',
          width: 250,
          align: 1,
        },
        {
          data: data['#REF#'],
          width: 250,
          align: 1,
        },
      ], {
        border: 1,
        width: 0,
      });
      rpt.newLine(2);

      rpt.print(`${'LA  PORCION  NO  GRAVADA  DE  LOS  INTERESES PAGADOS  O  ABONADOS  AL  ASOCIADO'
                + 'ES '}${data['#IPNA#']} CORRESPONDE AL ${data['#IPNAPORCENTAJE#']}%`);
      rpt.print('DECRETO 629  DE MARZO 26 DE 2014');

      rpt.newLine(5);
    };

    const rpt = new Report(path.join(__dirname, '../../vistas/pdf/myreportRetencion.pdf'));

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
