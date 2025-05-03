const fs = require('fs');
const { Encryptarsolodato } = require('../../negocio/Helpers/encrypt');
const { enviarmail } = require('../../negocio/Helpers/enviarmail');
const {
  makesimplequeryService,
} = require('../../services/common/common.services');

const cursos = async (req, res) => {
  let cadena = '';
  let consulta = '';
  const datadevuelve = [];

  if (req.body.params.quehace === 'concursos') {
    consulta = "select idCursosapp,codigo,nombre,estado from CURSOSAPP where estado = 'A' ";
    const response = await makesimplequeryService(req.body, consulta);
    if (response.error) res.send(response.data);
    if (!response.error) res.send(response.data);
  }

  if (req.body.params.quehace === 'preguntasadjuntos') {
    consulta = `select idadjuntosporcurso,idcurso,nombreadjunto,ltrim(rtrim(rutaadjunto)) as rutaadjunto from ADJUNTOSPORCURSO where  idcurso = ${req.body.params.idcurso}`;
    const data1 = await makesimplequeryService(req.body, consulta);
    if (!data1.error) {
      consulta = 'select ltrim(rtrim(tipo)) as tipo from movil_tipoencuestas ';
      const data2 = await makesimplequeryService(req.body, consulta);
      if (!data2.error) {
        if (data2.data[0][0].tipo === 'I') {
          consulta = `select idPreguntasporCurso ,idcurso,ltrim(rtrim(pregunta)) as pregunta,respuesta,estado,'I' as tipo from PREGUNTASPORCURSO where  idcurso = ${req.body.params.idcurso} and estado = 'A'`;
          const data3 = await makesimplequeryService(req.body, consulta);
          datadevuelve.push(data3.data);
          datadevuelve.push(data1.data);
          res.send(datadevuelve);
        } else {
          consulta = `select distinct idcurso,codigopregunta,ltrim(rtrim(pregunta)) as pregunta,estado,'O' as tipo from Preguntasopcionmultiple where  idcurso = ${req.body.params.idcurso}`;
          const data = await makesimplequeryService(req.body, consulta);
          if (!data.error) {
            consulta = `select idregistro,idcurso,codigopregunta,ltrim(rtrim(pregunta)) as pregunta,respuesta,estado,'O' as tipo from Preguntasopcionmultiple where  idcurso = ${req.body.params.idcurso}`;
            const data3 = await makesimplequeryService(req.body, consulta);
            if (!data3.error) {
              datadevuelve.push(data.data);
              datadevuelve.push(data1.data);
              datadevuelve.push(data3.data);
              res.send(datadevuelve);
            }
          }
        }
      }
    }
  }

  if (req.body.params.quehace === 'solicita') {
    consulta = `select  (SELECT correo FROM CORREOPARASOLICITUDES) as emailasesor,email,nombreintegrado from nits where nit = ${req.body.params.cedula}`;
    const data = await makesimplequeryService('', consulta);

    const datos = data.data[0][0];

    const datacampos = req.body.params.respuestas;
    for (let i = 0; i < datacampos.length; i += 1) {
      if (datacampos.length - 1 !== i) {
        cadena = `${cadena},${datacampos[i].Campo}: ${datacampos[i].Valor}`;
      } else {
        cadena = `${cadena} y ${datacampos[i].Campo}: ${datacampos[i].Valor}`;
        cadena = cadena.replace(',', ' ');
      }
    }
    await enviarmail(
      datos.email,
      'NOTIFICACION: RESPUESTAS CURSOS ',
      ` El Asociado: ${datos.nombreintegrado}, `
      + ` de numero de identificacion: ${req.body.params.cedula}, `
      + ` Hemos recibido exitosamente tus respuestas del curso ${req.body.params.nombrecurso.curso}, `
      + ` sus respuestas son: ${cadena
      }.Proximamente te contactaremos!. `,
    );

    await enviarmail(
      datos.emailasesor,
      'NOTIFICACION: RESPUESTAS CURSOS ',
      ` Asociado: ${datos.nombreintegrado}, `
      + ` Numero de identificacion: ${req.body.params.cedula}, `
      + ` Respuestas del Asociado: ${cadena},`
      + ` respuestas del curso:  ${req.body.params.nombrecurso.curso}`,
    );
    const mensaje = `Respuetas del curso ${req.body.params.nombrecurso.curso} enviadas correctamente`;
    const mensaje1 = Encryptarsolodato(mensaje);
    res.send([[{
      Codigo: '000',
      Mensaje: mensaje1,
      tipoMensaje: 'I',
    }]]);
  }
};

const descargarcursos = async (req, res) => {
  const filePath = req.body.ruta;
  const file = fs.createReadStream(filePath);
  const stat = fs.statSync(filePath);
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
  file.pipe(res);
};

module.exports = {
  cursos, descargarcursos,
};
