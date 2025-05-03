const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const queryString = require('query-string');
const urljoin = require('url-join');
const { enviarsms } = require('../../negocio/Helpers/enviarsms');
const { enviarmail } = require('../../negocio/Helpers/enviarmail');
const {
  sedesVacacionalesService, traerAuxiliosService,
  solicitudSegurosService, modificasegurosService, pagoNominaService,
} = require('../../services/modulosAdicionales/modulosAdicionales.services');
const { respuestasemailSinparametrosenvio } = require('../common/functions');
const { Encryptar, Encryptarsolodato } = require('../../negocio/Helpers/encrypt');
const {
  makespService, makesimplequeryService,
} = require('../../services/common/common.services');

const pagoNomina = async (req, res) => {
  const { cedulasociado } = req.body;
  const { ano } = req.body;
  const { mes } = req.body;
  let cadena = '';

  if (req.body.fecha === 'S') {
    cadena = 'select top 1 YEAR(fechatrabajo) as ano, MONTH(fechatrabajo) as mes from agencias union select top 1 YEAR(fechatrabajo)-1 as ano, MONTH(fechatrabajo) as mes from agencias order by ano asc';
  } else {
    cadena = `select FORMAT(a.fechatrabajo,'yyyy-MM-dd') as fecha, rtrim(case when a.numerocuenta <> '' then a.numerocuenta else a.codcuenta end) as numerocuenta, CASE when a.coddestino <> ' ' then (select rtrim(destinos.nombredestino) from destinos where destinos.coddestino=a.coddestino and destinos.codlinea=a.codlinea) else (select rtrim(nombre) from plancuentas where plancuentas.codcuenta=a.codcuenta) end as concepto, convert(varchar, cast(a.valor as money), 1) as valor from dnnempresasanterior a where cedula= ${cedulasociado} and year(fechatrabajo)= ${ano} and month(fechatrabajo)=${mes} order by fechatrabajo asc`;
  }
  const response = await pagoNominaService(cadena);
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

const sedesVacacionales = async (req, res) => {
  const response = await sedesVacacionalesService();
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

const Traerauxilios = async (req, res) => {
  const response = await traerAuxiliosService();
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

const Crearsolicituddeseguros = async (req, res) => {
  const consulta = "select codigo,nombre,tipo from parametroseguros where tipo != 'null'";
  const data = req.body;
  const response = await solicitudSegurosService(consulta, data);
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

const Datosmodificaseguros = async (req, res) => {
  const consulta = `${"select (SELECT correo  FROM CORREOPARASOLICITUDES) as correoasesor,inf.tiposervicio,ltrim(rtrim(inf.codigoservicio)) as codigoservicio,inf.cedulasociado,replace(convert(char,inf.fecha1,111),'/','-') fecha1,"
    + 'inf.referencia1,inf.referencia2,inf.cedulabeneficiario,inf.nombrebeneficiario,inf.parentesco,inf.valor1,inf.valor2,inf.valor3,inf.valor4 '
    + 'from parametroseguros pa inner join  informacionserviciosappgeneral inf on  inf.tiposervicio = pa.codigo '
    + 'inner join  nits n on n.nit = inf.cedulasociado '
    + "where pa.tipo =  '"}${req.body.params.codigoseguro}'  and inf.cedulasociado = ${req.body.params.cedulasociado}`;
  const response = await modificasegurosService(consulta, req.body);
  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

const ReservasVAcasionales = async (req, res) => {
  const response = await makespService(req.body.params, 'pa_ReservassedesVacacionales');
  const recordsets = response.data;
  if (response.error) return res.json(recordsets);
  if (!response.error) {
    if (recordsets[0][0].Codigo === '003') {
      const Respuesta = await respuestasemailSinparametrosenvio(recordsets, 'ReservasVAcasionales');

      recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
      recordsets[0][0].mensajeasesor = Encryptarsolodato(recordsets[0][0].mensajeasesor);
      recordsets[0][0].Mensajeasociado = Encryptarsolodato(recordsets[0][0].Mensajeasociado);
      recordsets[0][0].correoReceptor = Encryptarsolodato(recordsets[0][0].correoReceptor);
      recordsets[0][0].celularasociado = Encryptarsolodato(recordsets[0][0].celularasociado);
      recordsets[0][0].emailasociado = Encryptarsolodato(recordsets[0][0].emailasociado);

      return res.json(Respuesta);
    }
    Encryptar(recordsets);
    return res.send(recordsets);
  }
  return res.json(recordsets);
};

const vermasapp = async (req, res) => {
  const response = await makespService(req.body, 'pa_vermasapp');
  const recordsets = response.data;
  if (!response.error) {
    recordsets[0][0].Mensaje = Encryptarsolodato(recordsets[0][0].Mensaje);
    return res.json(recordsets);
  }
  const datatiempo = [
    [
      {
        Mensaje: 'Error no se pudo realizar el proceso verifique con el administrador...',
        Codigo: '999',
        tipoMensaje: 'E',
      },
    ],
  ];

  datatiempo[0][0].Mensaje = Encryptarsolodato(datatiempo[0][0].Mensaje);
  return res.send(datatiempo).end();
};
const upload = async (req, res) => {
  const form = new formidable.IncomingForm();
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  // store all uploads in the /uploads directory
  form.uploadDir = path.join('C:/appfecsa/temp/');
  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  // form.on('file', (_field, file) => {
  //   fs.rename(file.path, path.join(form.uploadDir, file.name));
  // });
  // log any errors that occur
  form.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.log(`An error has occured: \n${err}`);
  });
  // once all the files have been uploaded, send a response to the client
  form.on('end', () => {
    res.end('success');
  });
  // parse the incoming request containing the form data
  form.parse(req);
  let file;
  if (req.query.namefile !== 'undefined') {
    file = `C:/appfecsa/temp/${req.query.namefile}`;
  } else {
    file = undefined;
  }
  const consulta = `select email,celular,nombreintegrado from nits  where nit  =  ${req.query.usuario}`;
  let cadena = '';
  const response = await makesimplequeryService(req.body, consulta);
  const data2 = response.data;
  if (!response.error) {
    const datacampos = JSON.parse(req.query.dataUsu);
    for (let i = 0; i < datacampos.length; i += 1) {
      if (datacampos.length - 1 !== i) {
        cadena = `${cadena},${datacampos[i].Campo}: ${datacampos[i].Valor}`;
      } else {
        cadena = `${cadena} y ${datacampos[i].Campo}: ${datacampos[i].Valor}`;
        cadena = cadena.replace(',', ' ');
      }
    }
    const filesend = file;
    form.on('file', (_field, fileOn) => {
      fs.rename(fileOn.path, path.join(form.uploadDir, fileOn.name), async () => {
        await enviarmail(
          req.query.emailasesor,
          'NOTIFICACION: SOLICITUD DE AUXILIOS ',
          `El Asociado: ${data2[0][0].nombreintegrado} de numero de identificacion: ${req.query.usuario} Realizo una solicitud del Auxilio.`
          + ` Hemos recibido exitosamente tu solicitud de Auxilio de ${req.query.auxilio}. Proximamente te contactaremos!. `
          + ` Sus requisitos son: ${cadena}`,
          filesend,
        );
      });
    });
    if (filesend === undefined) {
      await enviarmail(
        req.query.emailasesor,
        'NOTIFICACION: SOLICITUD DE AUXILIOS ',
        `El Asociado: ${data2[0][0].nombreintegrado} de numero de identificacion: ${req.query.usuario} Realizo una solicitud del Auxilio.`
        + ` Hemos recibido exitosamente tu solicitud de Auxilio de ${req.query.auxilio}. Proximamente te contactaremos!. `
        + ` Sus requisitos son: ${cadena}`,
        filesend,
      );
    }
    await enviarmail(
      data2[0][0].email,
      'NOTIFICACION: SOLICITUD DE AUXILIOS ',
      req.query.mensaje,
    );
    const dataResult = data2;
    dataResult[0][0].celular = data2[0][0].celular.replace(' ', '').trim();
    await enviarsms(req.query.mensaje, dataResult[0][0].celular);
    return res.json(response.data2);
  }
  return 'fin endpoint';
};

const getTokenFE = async (req, res) => {
  try {
    const body = {
      grant_type: 'client_credentials',
      client_id: process.env.OPA_MOVIL__OPA_CLOUD_USER,
      client_secret: process.env.OPA_MOVIL__OPA_CLOUD_PASS,
    };

    const response = await axios.post(
      urljoin(process.env.OPA_MOVIL__OPA_CLOUD_URLFIRMA, 'connect/token'),
      queryString.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    // eslint-disable-next-line no-console
    res.json(error);
  }
};

module.exports = {
  sedesVacacionales,
  Traerauxilios,
  Crearsolicituddeseguros,
  Datosmodificaseguros,
  pagoNomina,
  ReservasVAcasionales,
  vermasapp,
  upload,
  getTokenFE,
};
