const fs = require('fs');
const path = require('path');
const RSVP = require('rsvp');
const { Report } = require('fluentreports');
const thousandFormat = require('../../Helpers/thousandFormat');

// rpt.fontSize(9);

function generate(dataR, dataRequest) {
  const promise = new RSVP.Promise((resolve, reject) => {
    const header = (rpt, data) => {
      rpt.fontNormal();

      rpt.newLine();
      rpt.band([
        {
          data: 'Periodo Interes (Dias): ',
          width: 100,
        },
        {
          data: data.periodoDias,
          width: 200,
          align: 'left',
        },

        {
          data: 'Destinos: ',
          width: 100,
        },
        {
          data: data.Destino,
          width: 200,
          align: 'left',
        },

      ]);
      rpt.newLine();
      if (dataR[0].CAPITALIZA === 1) {
        rpt.band([
          {
            data: 'Capitalización: ',
            width: 100,
          },
          {
            data: 'SI',
            width: 200,
            align: 'left',
          }, {
            data: 'Plazo:',
            width: 100,
          },
          {
            data: data.plazo,
            width: 200,
            align: 'left',
          },
        ]);
      } else {
        rpt.band([
          {
            data: 'Capitalización: ',
            width: 100,
          },
          {
            data: 'NO',
            width: 200,
            align: 'left',
          }, {
            data: 'Plazo:',
            width: 100,
          },
          {
            data: data.plazo,
            width: 200,
            align: 'left',
          },
        ]);
      }

      rpt.newLine();

      const propertyFilter = [
        {
          prop: 'NRO',
        }, {
          prop: 'CAPITAL',
          format: true,
        }, {
          prop: 'INTERES_GANADO',
          format: true,
        }, {
          prop: 'INTERES_PAGADO',
          format: true,
        }, {
          prop: 'RETEFUENTE',
          format: true,
        },
      ];

      rpt.fontBold();
      rpt.band([
        {
          data: 'Nro',
          width: 100,
        },
        {
          data: 'Capital',
          width: 100,
        },
        {
          data: 'Interés Ganado',
          width: 100,
        },
        {
          data: 'Interés Pagado',
          width: 100,
        },
        {
          data: 'Retefuente',
          width: 100,
        },
      ], {
        border: 1,
        width: 0,
      });

      rpt.fontNormal();

      let nro = 1;
      Object.keys(dataR).forEach((i) => {
        const output = [];
        nro += 1;

        Object.keys(propertyFilter).forEach((prop) => {
          output.push({
            data: propertyFilter[prop].format
              ? thousandFormat(dataR[i][propertyFilter[prop].prop])
              : dataR[i][propertyFilter[prop].prop],
            width: 100,
            align: 1,
          });
        });

        rpt.band(output, {
          border: 1,
          width: 0,
        });

        if (nro === 30) {
          rpt.newPage(false);
          nro = 1;
        }
      });
    };

    // Create a new Report Engine
    // pipeStream is predefined in this report to make it display in the browser
    const rpt = new Report(path.join(__dirname, '../../vistas/pdf/myreportSimuladorAhorro.pdf'));

    // Configure the Defaults
    rpt
      .margins(40)
      .header(header, {
        pageBreakBefore: true,
      })
      .data((dataRequest));

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
