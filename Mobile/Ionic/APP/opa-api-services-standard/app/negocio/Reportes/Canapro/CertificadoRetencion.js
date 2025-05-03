const fs = require('fs');
const path = require('path');
const RSVP = require('rsvp');
const { Report } = require('fluentreports');

function generate(data, dataR) {
  const promise = new RSVP.Promise((resolve, reject) => {
    const header = (rpt) => {
      let imgLoc = '';
      if (fs.existsSync('./imagen/Canapro/Calidad.png')) {
        imgLoc = './imagen/Canapro/Calidad.png';
        rpt.image(imgLoc, {
          x: 45, y: 6, width: 115, height: 90,
        });
      } else {
        rpt.print('No se pudo encontrar la imagen');
      }

      if (fs.existsSync('./imagen/Canapro/LogoEntidad.png')) {
        imgLoc = './imagen/Canapro/LogoEntidad.png';
        rpt.image(imgLoc, {
          x: 510, y: 6, width: 57, height: 80,
        });
      } else {
        rpt.print('No se pudo encontrar la imagen');
      }
      rpt.newLine(4);

      rpt.print(dataR['#ENTIDAD#'], {
        align: 'center',
        fontSize: 10,
        fontBold: true,
      });
      rpt.print(`NIT:${dataR.nit}`, {
        align: 'center',
        fontSize: 10,
        fontBold: true,
      });

      rpt.print('CR 10 22 97 TUNJA - BOYACA Tel: 7423094', {
        align: 'center',
        fontSize: 10,
        fontBold: true,
      });

      rpt.newLine(1);

      rpt.print(
        'CERTIFICADO ANUAL DE RETENCIÓN EN LA FUENTE E INFORMACIÓN ADICIONAL',
        {
          fontSize: 10,
          align: 'center',
          fontBold: true,
        },
      );
      rpt.newLine(1);

      rpt.band([
        {
          data: 'Oficina: ',
          width: 55,
          fontSize: 10,
        },
        {
          data: data.nombreagencia,
          width: 230,
          align: 'left',
          fontSize: 10,

        },

        {
          data: 'Tipo de identificación: ',
          width: 120,
          fontSize: 10,
        },
        {
          data: data.tipoidentIFicacion,
          width: 150,
          align: 'left',
          fontSize: 10,
        },
      ]);

      rpt.band([
        {
          data: 'Nombre: ',
          width: 55,
          fontSize: 10,
        },
        {
          data: data.nombre,
          width: 230,
          align: 'left',
          fontSize: 10,
          fontBold: true,
        },

        {
          data: 'No. Identificación: ',
          width: 120,
          fontSize: 10,
        },
        {
          data: data.cedulasociado,
          width: 150,
          align: 'left',
          fontSize: 10,
          fontBold: true,
        },
      ]);

      rpt.band([
        {
          data: 'Fecha: ',
          width: 55,
          fontSize: 10,
        },
        {
          data: dataR.fechatrabajo,
          width: 230,
          align: 'left',
          fontSize: 10,
        },
        {
          data: 'Año gravable: ',
          width: 120,
          fontSize: 10,
        },
        {
          data: dataR['año'],
          width: 150,
          align: 'left',
          fontSize: 10,
        },
      ]);

      rpt.newLine(2);

      rpt.band([
        {
          data: 'Producto: ',
          width: 360,
          fontSize: 10,
          fontBold: true,

        },
        {
          data: 'Ahorros',
          width: 80,
          align: 'left',
          fontSize: 10,
          fontBold: true,
        },
      ], { x: 30 });

      rpt.band([
        {
          data: 'Ahorros a la vista',
          width: 320,
          fontSize: 10,
        },
        {
          data: data.saldo_av,
          width: 80,
          align: 'right',
          fontSize: 10,
        },
      ], { x: 30 });
      rpt.band([
        {
          data: 'Ahorros permanente',
          width: 320,
          fontSize: 10,
        },
        {
          data: data.saldo_ap,
          width: 80,
          align: 'right',
          fontSize: 10,
        },
      ], { x: 30 });

      rpt.band([
        {
          data: 'Ahorros contractual',
          width: 320,
          fontSize: 10,
        },
        {
          data: data.saldo_ac,
          width: 80,
          align: 'right',
          fontSize: 10,
        },
      ], { x: 30 });
      rpt.band([
        {
          data: 'CDAT',
          width: 320,
          fontSize: 10,
        },
        {
          data: data.saldo_at,
          width: 80,
          align: 'right',
          fontSize: 10,
        },
      ], { x: 30 });
      rpt.band([
        {
          data: 'Saldo a Diciembre 31',
          width: 320,
          fontSize: 10,
        },
        {
          data: data.saldo_31_ahorros,
          width: 80,
          align: 'right',
          fontSize: 10,
        },
      ], { x: 30 });

      rpt.newLine(1);

      rpt.band([
        {
          data: 'Producto:',
          width: 360,
          fontSize: 10,
          fontBold: true,
        },
        {
          data: 'Aportes',
          width: 200,
          align: 'left',
          fontSize: 10,
          fontBold: true,
        },
      ], { x: 30 });
      rpt.band([
        {
          data: 'Saldo a Diciembre 31',
          width: 320,
          fontSize: 10,
        },
        {
          data: data.saldo_po,
          width: 80,
          align: 'right',
          fontSize: 10,
        },
      ], { x: 30 });

      rpt.band([
        {
          data: 'Revalorización',
          width: 320,
          fontSize: 10,
        },
        {
          data: data.saldo_rev,
          width: 80,
          align: 'right',
          fontSize: 10,
        },
      ], { x: 30 });

      rpt.newLine(1);

      rpt.band([
        {
          data: 'Producto: ',
          width: 360,
          fontSize: 10,
          fontBold: true,
        },
        {
          data: 'Cartera',
          width: 200,
          align: 'left',
          fontSize: 10,
          fontBold: true,
        },
      ], { x: 30 });

      rpt.band([
        {
          data: 'Saldo de crédito',
          width: 320,
          fontSize: 10,
        },
        {
          data: data.saldo_cr,
          width: 80,
          align: 'right',
          fontSize: 10,
        },
      ], { x: 30 });

      rpt.band([
        {
          data: 'Intereses pagados por vivienda ',
          width: 320,
          fontSize: 10,
        },
        {
          data: data.interes_viv,
          width: 80,
          align: 'right',
          fontSize: 10,
        },
      ], { x: 30 });
      rpt.band([
        {
          data: 'Intereses pagados por otros créditos',
          width: 320,
          fontSize: 10,
        },
        {
          data: data.interes_cr,
          width: 80,
          align: 'right',
          fontSize: 10,
        },
      ], { x: 30 });

      rpt.newLine(1);
      rpt.band([
        {
          data: `Intereses causados del periodo ${dataR['año']}`,
          width: 320,
          fontSize: 10,
        },
        {
          data: data.interes_ah,
          width: 80,
          align: 'right',
          fontSize: 10,
        },
      ], { x: 30 });
      rpt.band([
        {
          data: `Intereses pagados del periodo  ${dataR['año']}`,
          width: 320,
          fontSize: 10,
        },
        {
          data: data.interes_ah,
          width: 80,
          align: 'right',
          fontSize: 10,
        },
      ], { x: 30 });

      rpt.band([
        {
          data: 'Base retención:',
          width: 320,
          fontSize: 10,
        },
        {
          data: data.base,
          width: 80,
          align: 'right',
          fontSize: 10,
        },
      ], { x: 30 });
      rpt.band([
        {
          data: 'Retención en la fuente:',
          width: 320,
          fontSize: 10,
        },
        {
          data: data.retencion,
          width: 80,
          align: 'right',
          fontSize: 10,
        },
      ], { x: 30 });

      rpt.newLine(1);

      rpt.newLine(1);
      rpt.band([
        {
          data: 'Base GMF:',
          width: 320,
          fontSize: 10,
        },
        {
          data: data.base_gmf,
          width: 80,
          align: 'right',
          fontSize: 10,
        },
      ], { x: 30 });
      rpt.band([
        {
          data: 'Valor GMF:',
          width: 320,
          fontSize: 10,
        },
        {
          data: data.gmf_aso,
          width: 80,
          align: 'right',
          fontSize: 10,
        },
      ], { x: 30 });

      rpt.newLine(2);

      rpt.print(
        'Las retenciones en la fuente y el gravamen a los movimientos financieros fueron consignados',
        {
          align: 'center',
          fontSize: 10,
        },
      );
      rpt.print('oportunamente en la ciudad de Tunja-Boyacá', {
        align: 'center',
        fontSize: 10,
      });

      rpt.newLine(1);

      rpt.print(
        'Se omite firma autógrafa según Artículo 10 Decreto R836/101 ',
        {
          align: 'center',
          fontSize: 10,
        },
      );
      rpt.newLine(2);

      if (fs.existsSync('./imagen/Canapro/footer.PNG')) {
        imgLoc = './imagen/Canapro/footer.PNG';
        rpt.image(imgLoc, {
          x: 5, y: 645, width: 600, height: 110,
        });
      } else {
        rpt.print('No se pudo encontrar la imagen');
      }
    };

    const rpt = new Report(
      path.join(__dirname, '../../vistas/pdf/myreportRetencion.pdf'),
    );

    // Configure the Defaults
    rpt.margins(55).header(header).data(data);

    // Run the Report
    // displayReport is predefined to make it display in the browser
    rpt.render((err, reportName) => {
      if (err) return reject(err);
      const stream = fs.createReadStream(reportName);
      return resolve(stream);
    });
  });

  return promise;
  // Run the Report
  // displayReport is predefined to make it display in the browser
}

module.exports = generate;
