const { Encryptarsolodato } = require('../../negocio/Helpers/encrypt');
const { enviarmail } = require('../../negocio/Helpers/enviarmail');
const {
  makesimplequeryService,
} = require('../../services/common/common.services');

const registrarsolicitudvida = async (req, res) => {
  let encabezado = 'NOTIFICACION: SOLICITUD CREACION DE SEGURO DE VIDA';
  let quehace = 'creacion';
  let consulta = `select (SELECT correo  FROM CORREOPARASOLICITUDES) as correoasesor,n.fechanacimiento,n.email,n.nombreintegrado,(select nombre from parametroseguros where tipo =  '${req.body.params.scope.seguro}') as  nombreseguro from  nits n where  n.nit = ${req.body.params.cedula}`;
  let mensaje1 = '';

  if (req.body.params.quees === 'guarda') {
    const data = await makesimplequeryService(req.body, consulta);
    await enviarmail(
      data.data[0][0].email,
      encabezado,
      `El Asociado: ${data.data[0][0].nombreintegrado}, `
      + ` de numero de identificacion: ${req.body.params.cedula}, `
      + ' Realizo una solicitud del seguro.'
      + ` Hemos recibido exitosamente tu solicitud para el tipo: ${data.data[0][0].nombreseguro
      }. Proximamente te contactaremos!. `,
    );

    if (req.body.params.scope.codigo !== undefined) {
      await enviarmail(
        data.data[0][0].correoasesor,
        encabezado,
        ` Tipo de servicio: ${data.data[0][0].nombreseguro}, `
        + ` Numero de identificacion Asociado: ${req.body.params.cedula}, `
        + ` Nombre Beneficiario: ${req.body.params.scope.nombre}, `
        + ` Parentesco: ${req.body.params.scope.parentesco}, `
        + ` Valor asegurado vida: ${req.body.params.scope.valor1}, `
        + ` Valor mensual vida: ${req.body.params.scope.valor2}, `
        + ` numero de poliza : ${req.body.params.scope.codigo}`,
      );
    } else {
      await enviarmail(
        data.data[0][0].correoasesor,
        encabezado,
        ` Tipo de servicio: ${data.data[0][0].nombreseguro}, `
        + ` Numero de identificacion Asociado: ${req.body.params.cedula}, `
        + ` Nombre Beneficiario: ${req.body.params.scope.nombre}, `
        + ` Parentesco: ${req.body.params.scope.parentesco}, `
        + ` Valor asegurado vida: ${req.body.params.scope.valor1}`,

      );
    }
    const mensaje = `Solicitud de ${quehace} enviada correctamente`;
    mensaje1 = Encryptarsolodato(mensaje);

    res.send([[{
      Codigo: '000',
      Mensaje: mensaje1,
      tipoMensaje: 'I',
    }]]);
  } else {
    if (req.body.params.quees === 'edita') {
      encabezado = 'NOTIFICACION: SOLICITUD MODIFICACION DE SERVICIO SEGURO DE VIDA ';
      quehace = 'modificacion';
    }
    if (req.body.params.quees === 'elimina') {
      encabezado = 'NOTIFICACION: SOLICITUD ELIMINACION DE BENEFICIARIO SEGURO DE VIDA';
      quehace = 'eliminacion';
    }
    if (req.body.params.quees === 'eliminatodo') {
      encabezado = 'NOTIFICACION: SOLICITUD ELIMINACION TOTAL DEL SERVICIO SEGURO DE VIDA';
      quehace = 'eliminatodo';
    }

    consulta = `select (SELECT correo  FROM CORREOPARASOLICITUDES) as correoasesor,n.fechanacimiento,n.email,n.nombreintegrado,(select nombre from parametroseguros where tipo =  '${req.body.params.seguro}') as  nombreseguro from  nits n where  n.nit = ${req.body.params.cedula}`;
    const data = await makesimplequeryService(req.body, consulta);
    await enviarmail(
      data.data[0][0].email,
      encabezado,
      `El Asociado: ${data.data[0][0].nombreintegrado}, `
      + ` de numero de identificacion: ${req.body.params.cedula}, `
      + ' Realizo una solicitud del seguro.'
      + ` Hemos recibido exitosamente tu solicitud para el tipo: ${data.data[0][0].nombreseguro
      }. Proximamente te contactaremos!. `,
    );

    let empieza = 0;
    const cuantos = req.body.params.scope.length;

    if (quehace === 'eliminatodo') {
      await enviarmail(
        data.data[0][0].correoasesor,
        encabezado,
        ` Tipo de servicio: ${data.data[0][0].nombreseguro}, `
        + ` Numero de identificacion Asociado: ${req.body.params.cedula}, `
        + ' Se solicita eliminacion de toda la poliza y sus beneficiarios ',
      );
    }
    if (quehace === 'eliminacion') {
      await enviarmail(
        data.data[0][0].correoasesor,
        encabezado,
        ` Tipo de servicio: ${data.data[0][0].nombreseguro}, `
        + ` Numero de identificacion Asociado: ${req.body.params.scope[empieza].cedulasociado}, `
        + ` Indentificacion  Beneficiario : ${req.body.params.scope[empieza].cedulabeneficiario}, `
        + ` Nombre Beneficiario: ${req.body.params.scope[empieza].nombrebeneficiario}, `
        + ' Se solicita eliminacion de este beneficiario ',
      );
    }

    if (quehace === 'modificacion') {
      const promises = [];
      while (empieza >= 0 && empieza < cuantos) {
        const emailPromise = enviarmail(
          data.data[0][0].correoasesor,
          encabezado,
          ` Tipo de servicio: ${data.data[0][0].nombreseguro}, `
          + ` Numero de identificacion Asociado: ${req.body.params.scope[empieza].cedulasociado}, `
          + ` Nombre Beneficiario: ${req.body.params.scope[empieza].nombrebeneficiario}, `
          + ` Nombre Anterior: ${req.body.params.scope[empieza].Nombreanterior}, `
          + ` Parentesco: ${req.body.params.scope[empieza].parentesco}, `
          + ` numero de poliza : ${req.body.params.scope[empieza].codigoservicio}`,
        );
        promises.push(emailPromise);
        empieza += 1;
      }
      try {
        await Promise.all(promises);
        // All emails have been sent successfully.
      } catch (error) {
        // Handle any errors that occurred during email sending.
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }

    const mensaje = `Solicitud de ${quehace} enviada correctamente`;
    mensaje1 = Encryptarsolodato(mensaje);

    res.send([[{
      Codigo: '000',
      Mensaje: mensaje1,
      tipoMensaje: 'I',
    }]]);
  }
};

const registrarsolicitudFMC = async (req, res) => {
  let encabezado = 'NOTIFICACION: SOLICITUD CREACION DE BENEFICIARIOS FMC';
  let quehace = 'creacion';
  let consulta = `select (SELECT correo  FROM CORREOPARASOLICITUDES) as correoasesor,n.fechanacimiento,n.email,n.nombreintegrado,(select nombre from parametroseguros where tipo =  '${req.body.params.scope.seguro}') as  nombreseguro from  nits n where  n.nit = ${req.body.params.cedula}`;
  if (req.body.params.quees === 'guarda') {
    const response = await makesimplequeryService(req.body, consulta);
    const data2 = response.data;
    if (response.error) return res.json(data2);
    if (!response.error) {
      await enviarmail(
        data2[0][0].email,
        encabezado,
        `El Asociado: ${data2[0][0].nombreintegrado}, `
        + ` de numero de identificacion: ${req.body.params.cedula}, `
        + ' Realizo una solicitud del seguro.'
        + ` Hemos recibido exitosamente tu solicitud para el tipo: ${data2[0][0].nombreseguro
        }. Proximamente te contactaremos!. `,
      );
      if (req.body.params.scope.codigo !== undefined) {
        await enviarmail(
          data2[0][0].correoasesor,
          encabezado,
          ` Tipo de Servicio: ${data2[0][0].nombreseguro}, `
          + ` Numero de Identificacion Asociado: ${req.body.params.cedula}, `
          + ` Fecha Nacimiento: ${req.body.params.scope.FechaNacimiento}, `
          + ` Documento Beneficiario: ${req.body.params.scope.DocumentoBeneficiario}, `
          + ` Nombre Beneficiario: ${req.body.params.scope.nombreBeneficiario}, `
          + ` Parentesco: ${req.body.params.scope.parentesco}, `
          + ` numero de poliza : ${req.body.params.scope.codigo}`,

        );
      } else {
        await enviarmail(
          data2[0][0].correoasesor,
          encabezado,
          ` Tipo de Servicio: ${data2[0][0].nombreseguro}, `
          + ` Numero de Identificacion Asociado: ${req.body.params.cedula}, `
          + ` Fecha Nacimiento: ${req.body.params.scope.FechaNacimiento}, `
          + ` Documento Beneficiario: ${req.body.params.scope.DocumentoBeneficiario}, `
          + ` Nombre Beneficiario: ${req.body.params.scope.nombreBeneficiario}, `
          + ` Parentesco: ${req.body.params.scope.parentesco}`,
        );

        const mensaje = `Solicitud de ${quehace} enviada correctamente`;
        const mensaje1 = Encryptarsolodato(mensaje);

        return res.send([[{
          Codigo: '000',
          Mensaje: mensaje1,
          tipoMensaje: 'I',
        }]]);
      }
    }
  } else {
    if (req.body.params.quees === 'edita') {
      encabezado = 'NOTIFICACION: SOLICITUD MODIFICACION DE BENEFICIARIOS FMC ';
      quehace = 'modificacion';
    }
    if (req.body.params.quees === 'elimina') {
      encabezado = 'NOTIFICACION: SOLICITUD ELIMINACION DE BENEFICIARIOS FMC';
      quehace = 'eliminacion';
    }
    if (req.body.params.quees === 'eliminatodo') {
      encabezado = 'NOTIFICACION: SOLICITUD ELIMINACION TOTAL DE BENEFICIARIOS FMC';
      quehace = 'eliminatodo';
    }

    consulta = `select (SELECT correo  FROM CORREOPARASOLICITUDES) as correoasesor,n.fechanacimiento,n.email,n.nombreintegrado,(select nombre from parametroseguros where tipo =  '${req.body.params.seguro}') as  nombreseguro from  nits n where  n.nit = ${req.body.params.cedula}`;
    const response = await makesimplequeryService(req.body, consulta);
    const data2 = response.data;
    if (response.error) return res.json(data2);
    if (!response.error) {
      await enviarmail(
        data2[0][0].email,
        encabezado,
        `El Asociado: ${data2[0][0].nombreintegrado}, `
        + ` de numero de identificacion: ${req.body.params.cedula}, `
        + ' Realizo una solicitud del seguro.'
        + ` Hemos recibido exitosamente tu solicitud para el tipo: ${data2[0][0].nombreseguro
        }. Proximamente te contactaremos!. `,
      );

      let empieza = 0;
      const cuantos = req.body.params.scope.length;

      if (quehace === 'eliminatodo') {
        await enviarmail(
          data2[0][0].correoasesor,
          encabezado,
          ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
          + ` Numero de identificacion Asociado: ${req.body.params.cedula}, `
          + ' Se solicita eliminacion de toda la poliza y sus beneficiarios ',
        );
      }
      if (quehace === 'eliminacion') {
        await enviarmail(
          data2[0][0].correoasesor,
          encabezado,
          ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
          + ` Numero de identificacion Asociado: ${req.body.params.scope[empieza].cedulasociado}, `
          + ` Indentificacion  Beneficiario : ${req.body.params.scope[empieza].cedulabeneficiario}, `
          + ` Nombre Beneficiario: ${req.body.params.scope[empieza].nombrebeneficiario}, `
          + ' Se solicita eliminacion de este beneficiario ',
        );
      }

      if (quehace === 'modificacion') {
        const promises = [];
        while (empieza >= 0 && empieza < cuantos) {
          const emailPromise = enviarmail(
            data2[0][0].correoasesor,
            encabezado,
            ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
            + ` Numero de identificacion Asociado: ${req.body.params.scope[empieza].cedulasociado}, `
            + ` Nombre Beneficiario: ${req.body.params.scope[empieza].nombrebeneficiario}, `
            + ` Nombre Anterior: ${req.body.params.scope[empieza].Nombreanterior}, `
            + ` Parentesco: ${req.body.params.scope[empieza].parentesco}, `
            + ` numero de poliza : ${req.body.params.scope[empieza].codigoservicio}`,
          );
          promises.push(emailPromise);
          empieza += 1;
        }
        try {
          await Promise.all(promises);
          // All emails have been sent successfully.
        } catch (error) {
          // Handle any errors that occurred during email sending.
          // eslint-disable-next-line no-console
          console.log(error);
        }
      }

      const mensaje = `Solicitud de ${quehace} enviada correctamente`;
      const mensaje1 = Encryptarsolodato(mensaje);

      return res.send([[{
        Codigo: '000',
        Mensaje: mensaje1,
        tipoMensaje: 'I',
      }]]);
    }
  }
  return 'Fin endpoint';
};

const registrarsolicitudMovil = async (req, res) => {
  let encabezado = 'NOTIFICACION: SOLICITUD CREACION DE SEGURO DE MOVIL';
  let quehace = 'creacion';
  let consulta = `select (SELECT correo  FROM CORREOPARASOLICITUDES) as correoasesor,n.fechanacimiento,n.email,n.nombreintegrado,(select nombre from parametroseguros where tipo =  '${req.body.params.scope.seguro}') as  nombreseguro from  nits n where  n.nit = ${req.body.params.cedula}`;
  if (req.body.params.quees === 'guarda') {
    const response = await makesimplequeryService(req.body, consulta);
    const data2 = response.data;
    if (response.error) return res.json(data2);
    if (!response.error) {
      await enviarmail(
        data2[0][0].email,
        encabezado,
        `El Asociado: ${data2[0][0].nombreintegrado}, `
        + ` de numero de identificacion: ${req.body.params.cedula}, `
        + ' Realizo una solicitud del seguro.'
        + ` Hemos recibido exitosamente tu solicitud para el tipo: ${data2[0][0].nombreseguro
        }. Proximamente te contactaremos!. `,
      );

      await enviarmail(
        data2[0][0].correoasesor,
        encabezado,
        ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
        + ` Numero de identificacion Asociado: ${req.body.params.cedula}`,

      );
      const mensaje = `Solicitud de ${quehace} enviada correctamente`;
      const mensaje1 = Encryptarsolodato(mensaje);
      res.send([[{
        Codigo: '000',
        Mensaje: mensaje1,
        tipoMensaje: 'I',
      }]]);
    }
  }
  if (req.body.params.quees === 'eliminatodo') {
    encabezado = 'NOTIFICACION: SOLICITUD ELIMINACION TOTAL DEL SERVICIO SEGURO DE MOVIL';
    quehace = 'eliminatodo';
    consulta = `select (SELECT correo  FROM CORREOPARASOLICITUDES) as correoasesor,n.fechanacimiento,n.email,n.nombreintegrado,(select nombre from parametroseguros where tipo =  '${req.body.params.seguro}') as  nombreseguro from  nits n where  n.nit = ${req.body.params.cedula}`;
    const response = await makesimplequeryService(req.body, consulta);
    const data2 = response.data;
    if (response.error) return res.json(data2);
    if (!response.error) {
      await enviarmail(
        data2[0][0].email,
        encabezado,
        `El Asociado: ${data2[0][0].nombreintegrado}, `
        + ` de numero de identificacion: ${req.body.params.cedula}, `
        + ' Realizo una solicitud del seguro.'
        + ` Hemos recibido exitosamente tu solicitud para el tipo: ${data2[0][0].nombreseguro
        }. Proximamente te contactaremos!. `,
      );
      await enviarmail(
        data2[0][0].correoasesor,
        encabezado,
        ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
        + ` Numero de identificacion Asociado: ${req.body.params.cedula}, `
        + ' Se solicita eliminacion de toda la poliza y sus beneficiarios ',
      );
      const mensaje = `Solicitud de ${quehace} enviada correctamente`;
      const mensaje1 = Encryptarsolodato(mensaje);
      res.send([[{
        Codigo: '000',
        Mensaje: mensaje1,
        tipoMensaje: 'I',
      }]]);
    }
  }
  return 'fin endpoint';
};

const registrarsolicitudSoat = async (req, res) => {
  let encabezado = 'NOTIFICACION: SOLICITUD CREACION DE SEGURO DE SOAT';
  let quehace = 'creacion';
  let consulta = `select (SELECT correo  FROM CORREOPARASOLICITUDES) as correoasesor,n.fechanacimiento,n.email,n.nombreintegrado,(select nombre from parametroseguros where tipo =  '${req.body.params.seguro}') as  nombreseguro from  nits n where  n.nit = ${req.body.params.cedula}`;

  if (req.body.params.quees === 'guarda') {
    const response = await makesimplequeryService(req.body, consulta);
    const data2 = response.data;
    if (response.error) return res.json(data2);
    if (!response.error) {
      await enviarmail(
        data2[0][0].email,
        encabezado,
        `El Asociado: ${data2[0][0].nombreintegrado}, `
        + ` de numero de identificacion: ${req.body.params.cedula}, `
        + ' Realizo una solicitud del seguro.'
        + ` Hemos recibido exitosamente tu solicitud para el tipo: ${data2[0][0].nombreseguro
        }. Proximamente te contactaremos!. `,
      );

      await enviarmail(
        data2[0][0].correoasesor,
        encabezado,
        ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
        + ` Numero de identificacion Asociado: ${req.body.params.cedula}, `
        + `fecha vencimiento Soat: ${req.body.params.scope.fechavencesoat}, `
        + `Marca: ${req.body.params.scope.Marca}, `
        + `Placa: ${req.body.params.scope.Placa}`,
      );
      const mensaje = `Solicitud de ${quehace} enviada correctamente`;
      const mensaje1 = Encryptarsolodato(mensaje);
      return res.send([[{
        Codigo: '000',
        Mensaje: mensaje1,
        tipoMensaje: 'I',
      }]]);
    }
    return res.json(response.data);
  }
  if (req.body.params.quees === 'eliminatodo') {
    encabezado = 'NOTIFICACION: SOLICITUD ELIMINACION TOTAL DEL SERVICIO SEGURO DE SOAT';
    quehace = 'eliminatodo';

    consulta = `select (SELECT correo  FROM CORREOPARASOLICITUDES) as correoasesor,n.fechanacimiento,n.email,n.nombreintegrado,(select nombre from parametroseguros where tipo =  '${req.body.params.seguro}') as  nombreseguro from  nits n where  n.nit = ${req.body.params.cedula}`;
    const response = await makesimplequeryService(req.body, consulta);
    const data2 = response.data;
    if (response.error) return res.json(data2);
    if (!response.error) {
      await enviarmail(
        data2[0][0].email,
        encabezado,
        `El Asociado: ${data2[0][0].nombreintegrado}, `
        + ` de numero de identificacion: ${req.body.params.cedula}, `
        + ' Realizo una solicitud del seguro.'
        + ` Hemos recibido exitosamente tu solicitud para el tipo: ${data2[0][0].nombreseguro
        }. Proximamente te contactaremos!. `,
      );

      await enviarmail(
        data2[0][0].correoasesor,
        encabezado,
        ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
        + ` Numero de identificacion Asociado: ${req.body.params.cedula}, `
        + ' Se solicita eliminacion de toda la poliza y sus beneficiarios ',
      );
      const mensaje = `Solicitud de ${quehace} enviada correctamente`;
      const mensaje1 = Encryptarsolodato(mensaje);
      return res.send([[{
        Codigo: '000',
        Mensaje: mensaje1,
        tipoMensaje: 'I',
      }]]);
    }
  }
  return 'Fin endpoint';
};

const registrarsolicitudHogar = async (req, res) => {
  let encabezado = 'NOTIFICACION: SOLICITUD CREACION DE SEGURO DE HOGAR';
  let quehace = 'creacion';
  let consulta = `select (SELECT correo  FROM CORREOPARASOLICITUDES) as correoasesor,n.fechanacimiento,n.email,n.nombreintegrado,(select nombre from parametroseguros where tipo =  '${req.body.params.scope.seguro}') as  nombreseguro from  nits n where  n.nit = ${req.body.params.cedula}`;

  if (req.body.params.quees === 'guarda') {
    const response = await makesimplequeryService(req.body, consulta);
    const data2 = response.data;
    if (response.error) return res.json(data2);
    if (!response.error) {
      await enviarmail(
        data2[0][0].email,
        encabezado,
        `El Asociado: ${data2[0][0].nombreintegrado}, `
        + ` de numero de identificacion: ${req.body.params.cedula}, `
        + ' Realizo una solicitud del seguro.'
        + ` Hemos recibido exitosamente tu solicitud para el tipo: ${data2[0][0].nombreseguro
        }. Proximamente te contactaremos!. `,
      );
      if (req.body.params.scope.codigo !== undefined) {
        await enviarmail(
          data2[0][0].correoasesor,
          encabezado,
          ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
          + ` Numero de identificacion Asociado: ${req.body.params.cedula}, `
          + `Aseguradora : ${req.body.params.scope.aseguradoras}, `
          + `Placa: ${req.body.params.scope.Placa}, `
          + ` Nombre Beneficiario oneroso : ${req.body.params.scope.Beneficiario}, `
          + ` Total: ${req.body.params.scope.valor1}, `
          + ` numero de poliza : ${req.body.params.scope.codigo}`,

        );
      } else {
        await enviarmail(
          data2[0][0].correoasesor,
          encabezado,
          ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
          + ` Numero de identificacion Asociado: ${req.body.params.cedula}, `
          + `Documento Beneficiario: ${req.body.params.scope.DocumentoBeneficiario}, `
          + `Nombre Beneficiario: ${req.body.params.scope.NombreBeneficiario}, `
          + ` Direccion : ${req.body.params.scope.Direccion}, `
          + `Ciudad: ${req.body.params.scope.Ciudad}, `
          + `Valor Asegurado Todo Riesgo : ${req.body.params.scope.valor3}`,

        );
      }
      const mensaje = `Solicitud de ${quehace} enviada correctamente`;
      const mensaje1 = Encryptarsolodato(mensaje);
      return res.send([[{
        Codigo: '000',
        Mensaje: mensaje1,
        tipoMensaje: 'I',
      }]]);
    }
  }
  if (req.body.params.quees === 'edita') {
    encabezado = 'NOTIFICACION: SOLICITUD MODIFICACION DE SERVICIO SEGURO DE HOGAR ';
    quehace = 'modificacion';
  }
  if (req.body.params.quees === 'elimina') {
    encabezado = 'NOTIFICACION: SOLICITUD ELIMINACION DE BENEFICIARIO SEGURO DE HOGAR';
    quehace = 'eliminacion';
  }
  if (req.body.params.quees === 'eliminatodo') {
    encabezado = 'NOTIFICACION: SOLICITUD ELIMINACION TOTAL DEL SERVICIO SEGURO DE HOGAR';
    quehace = 'eliminatodo';
  }

  consulta = `select (SELECT correo  FROM CORREOPARASOLICITUDES) as correoasesor,n.fechanacimiento,n.email,n.nombreintegrado,(select nombre from parametroseguros where tipo =  '${req.body.params.seguro}') as  nombreseguro from  nits n where  n.nit = ${req.body.params.cedula}`;
  const response = await makesimplequeryService(req.body, consulta);
  const data2 = response.data;
  if (response.error) return res.json(data2);
  if (!response.error) {
    await enviarmail(
      data2[0][0].email,
      encabezado,
      `El Asociado: ${data2[0][0].nombreintegrado}, `
      + ` de numero de identificacion: ${req.body.params.cedula}, `
      + ' Realizo una solicitud del seguro.'
      + ` Hemos recibido exitosamente tu solicitud para el tipo: ${data2[0][0].nombreseguro
      }. Proximamente te contactaremos!. `,
    );

    let empieza = 0;
    const cuantos = req.body.params.scope.length;

    if (quehace === 'eliminatodo') {
      await enviarmail(
        data2[0][0].correoasesor,
        encabezado,
        ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
        + ` Numero de identificacion Asociado: ${req.body.params.cedula}, `
        + ' Se solicita eliminacion de toda la poliza y sus beneficiarios ',
      );
    }
    if (quehace === 'eliminacion') {
      await enviarmail(
        data2[0][0].correoasesor,
        encabezado,
        ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
        + ` Numero de identificacion Asociado: ${req.body.params.scope[empieza].cedulasociado}, `
        + ` Nombre Beneficiario: ${req.body.params.scope[empieza].nombrebeneficiario}, `
        + ' Se solicita eliminacion de este beneficiario ',
      );
    }

    if (quehace === 'modificacion') {
      const promises = [];
      while (empieza >= 0 && empieza < cuantos) {
        const emailPromise = enviarmail(
          data2[0][0].correoasesor,
          encabezado,
          ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
          + ` Numero de identificacion Asociado: ${req.body.params.scope[empieza].cedulasociado}, `
          + ` documento Beneficiario: ${req.body.params.scope[empieza].cedulabeneficiario}, `
          + ` documento Anterior: ${req.body.params.scope[empieza].cedulaanterior}, `
          + ` Nombre Beneficiario: ${req.body.params.scope[empieza].nombrebeneficiario}, `
          + ` Nombre Anterior: ${req.body.params.scope[empieza].Nombreanterior}, `
          + ` Direccion: ${req.body.params.scope[empieza].referencia1}, `
          + ` Ciudad: ${req.body.params.scope[empieza].referencia2}, `
          + ` Numero de poliza : ${req.body.params.scope[empieza].codigoservicio}`,
        );
        promises.push(emailPromise);
        empieza += 1;
      }
      try {
        await Promise.all(promises);
        // All emails have been sent successfully.
      } catch (error) {
        // Handle any errors that occurred during email sending.
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
    const mensaje = `Solicitud de ${quehace} enviada correctamente`;
    const mensaje1 = Encryptarsolodato(mensaje);

    return res.send([[{
      Codigo: '000',
      Mensaje: mensaje1,
      tipoMensaje: 'I',
    }]]);
  }
  return 'Fin de endpoint';
};

const registrarsolicitudVehiculos = async (req, res) => {
  let encabezado = 'NOTIFICACION: SOLICITUD CREACION DE SEGURO DE VEHICULOS';
  let quehace = 'creacion';
  let consulta = `select (SELECT correo  FROM CORREOPARASOLICITUDES) as correoasesor,n.fechanacimiento,n.email,n.nombreintegrado,(select nombre from parametroseguros where tipo =  '${req.body.params.scope.seguro}') as  nombreseguro from  nits n where  n.nit = ${req.body.params.cedula}`;

  if (req.body.params.quees === 'guarda') {
    const response = await makesimplequeryService(req.body, consulta);
    const data2 = response.data;
    if (response.error) return res.json(data2);
    if (!response.error) {
      await enviarmail(
        data2[0][0].email,
        encabezado,
        `El Asociado: ${data2[0][0].nombreintegrado}, `
        + ` de numero de identificacion: ${req.body.params.cedula}, `
        + ' Realizo una solicitud del seguro.'
        + ` Hemos recibido exitosamente tu solicitud para el tipo: ${data2[0][0].nombreseguro
        }. Proximamente te contactaremos!. `,
      );
      if (req.body.params.scope.codigo !== undefined) {
        await enviarmail(
          data2[0][0].correoasesor,
          encabezado,
          ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
          + ` Numero de identificacion Asociado: ${req.body.params.cedula}, `
          + `Aseguradora : ${req.body.params.scope.aseguradoras}, `
          + `Placa: ${req.body.params.scope.Placa}, `
          + ` Nombre Beneficiario oneroso : ${req.body.params.scope.Beneficiario}, `
          + ` Total: ${req.body.params.scope.valor1}, `
          + ` numero de poliza : ${req.body.params.scope.codigo}`,

        );
      } else {
        await enviarmail(
          data2[0][0].correoasesor,
          encabezado,
          ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
          + ` Numero de identificacion Asociado: ${req.body.params.cedula}, `
          + `Aseguradora: ${req.body.params.scope.aseguradoras}, `
          + `Placa: ${req.body.params.scope.Placa}, `
          + ` Nombre Beneficiario oneroso : ${req.body.params.scope.Beneficiario}`,

        );
      }
      const mensaje = `Solicitud de ${quehace} enviada correctamente`;
      const mensaje1 = Encryptarsolodato(mensaje);
      return res.send([[{
        Codigo: '000',
        Mensaje: mensaje1,
        tipoMensaje: 'I',
      }]]);
    }
  } else {
    if (req.body.params.quees === 'edita') {
      encabezado = 'NOTIFICACION: SOLICITUD MODIFICACION DE SERVICIO SEGURO DE VEHICULOS ';
      quehace = 'modificacion';
    }
    if (req.body.params.quees === 'elimina') {
      encabezado = 'NOTIFICACION: SOLICITUD ELIMINACION DE BENEFICIARIO SEGURO DE VEHICULOS';
      quehace = 'eliminacion';
    }
    if (req.body.params.quees === 'eliminatodo') {
      encabezado = 'NOTIFICACION: SOLICITUD ELIMINACION TOTAL DEL SERVICIO SEGURO DE VEHICULOS';
      quehace = 'eliminatodo';
    }

    consulta = `select (SELECT correo  FROM CORREOPARASOLICITUDES) as correoasesor,n.fechanacimiento,n.email,n.nombreintegrado,(select nombre from parametroseguros where tipo =  '${req.body.params.seguro}') as  nombreseguro from  nits n where  n.nit = ${req.body.params.cedula}`;
    const response = await makesimplequeryService(req.body, consulta);
    const data2 = response.data;
    if (response.error) return res.json(data2);
    if (!response.error) {
      await enviarmail(
        data2[0][0].email,
        encabezado,
        `El Asociado: ${data2[0][0].nombreintegrado}, `
        + ` de numero de identificacion: ${req.body.params.cedula}, `
        + ' Realizo una solicitud del seguro.'
        + ` Hemos recibido exitosamente tu solicitud para el tipo: ${data2[0][0].nombreseguro
        }. Proximamente te contactaremos!. `,
      );
      let empieza = 0;
      const cuantos = req.body.params.scope.length;

      if (quehace === 'eliminatodo') {
        await enviarmail(
          data2[0][0].correoasesor,
          encabezado,
          ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
          + ` Numero de identificacion Asociado: ${req.body.params.cedula}, `
          + ' Se solicita eliminacion de toda la poliza y sus beneficiarios ',
        );
      }
      if (quehace === 'eliminacion') {
        await enviarmail(
          data2[0][0].correoasesor,
          encabezado,
          ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
          + ` Numero de identificacion Asociado: ${req.body.params.scope[empieza].cedulasociado}, `
          + ` Nombre Beneficiario: ${req.body.params.scope[empieza].nombrebeneficiario}, `
          + ' Se solicita eliminacion de este beneficiario ',
        );
      }

      if (quehace === 'modificacion') {
        const promises = [];
        while (empieza >= 0 && empieza < cuantos) {
          const emailPromise = enviarmail(
            data2[0][0].correoasesor,
            encabezado,
            ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
            + ` Numero de identificacion Asociado: ${req.body.params.scope[empieza].cedulasociado}, `
            + ` Nombre Beneficiario: ${req.body.params.scope[empieza].nombrebeneficiario}, `
            + ` Nombre Anterior: ${req.body.params.scope[empieza].Nombreanterior}, `
            + ` numero de poliza : ${req.body.params.scope[empieza].codigoservicio}`,

          );
          promises.push(emailPromise);
          empieza += 1;
        }
        try {
          await Promise.all(promises);
          // All emails have been sent successfully.
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
          // Handle any errors that occurred during email sending.
        }
      }
      const mensaje = `Solicitud de ${quehace} enviada correctamente`;
      const mensaje1 = Encryptarsolodato(mensaje);
      return res.send([[{
        Codigo: '000',
        Mensaje: mensaje1,
        tipoMensaje: 'I',
      }]]);
    }
  }
  return 'fin endpoint';
};

const registrarsolicitudexequial = async (req, res) => {
  let encabezado = 'NOTIFICACION: SOLICITUD CREACION DE SERVICIO EXEQUIAL';
  let quehace = 'creacion';
  let consulta = `select (SELECT correo  FROM CORREOPARASOLICITUDES) as correoasesor,n.fechanacimiento,n.email,n.nombreintegrado,(select nombre from parametroseguros where tipo =  '${req.body.params.scope.seguro}') as  nombreseguro from  nits n where  n.nit = ${req.body.params.cedula}`;
  if (req.body.params.quees === 'guarda') {
    const response = await makesimplequeryService(req.body, consulta);
    const data2 = response.data;
    if (response.error) return res.json(data2);
    if (!response.error) {
      await enviarmail(
        data2[0][0].email,
        encabezado,
        `El Asociado: ${data2[0][0].nombreintegrado}, `
        + ` de numero de identificacion: ${req.body.params.cedula}, `
        + ' Realizo una solicitud del seguro.'
        + ` Hemos recibido exitosamente tu solicitud para el tipo: ${data2[0][0].nombreseguro
        }. Proximamente te contactaremos!. `,
      );

      await enviarmail(
        data2[0][0].correoasesor,
        encabezado,
        ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
        + ` Numero de identificacion Asociado: ${req.body.params.cedula}, `
        + ` Indentificacion Beneficiario: ${req.body.params.scope.cedulabeneficiario}, `
        + ` Nombre Beneficiario: ${req.body.params.scope.nombre}, `
        + ` Parentesco: ${req.body.params.scope.parentesco}, `
        + ` Empresa: ${req.body.params.scope.empresa}`,

      );
      const mensaje = `Solicitud de ${quehace} enviada correctamente`;
      const mensaje1 = Encryptarsolodato(mensaje);

      return res.send([[{
        Codigo: '000',
        Mensaje: mensaje1,
        tipoMensaje: 'I',
      }]]);
    }
  }
  if (req.body.params.quees === 'edita') {
    encabezado = 'NOTIFICACION: SOLICITUD MODIFICACION DE SERVICIO EXEQUIAL';
    quehace = 'modificacion';
  }
  if (req.body.params.quees === 'elimina') {
    encabezado = 'NOTIFICACION: SOLICITUD ELIMINACION DE BENEFICIARIO DE SERVICIO EXEQUIAL ';
    quehace = 'eliminacion';
  }
  if (req.body.params.quees === 'eliminatodo') {
    encabezado = 'NOTIFICACION: SOLICITUD ELIMINACION TOTAL DEL SERVICIO EXEQUIAL';
    quehace = 'eliminatodo';
  }

  consulta = `select (SELECT correo  FROM CORREOPARASOLICITUDES) as correoasesor,n.fechanacimiento,n.email,n.nombreintegrado,(select nombre from parametroseguros where tipo =  '${req.body.params.seguro}') as  nombreseguro from  nits n where  n.nit = ${req.body.params.cedula}`;
  const response = await makesimplequeryService(req.body, consulta);
  const data2 = response.data;
  if (response.error) return res.json(data2);
  if (!response.error) {
    await enviarmail(
      data2[0][0].email,
      encabezado,
      `El Asociado: ${data2[0][0].nombreintegrado}, `
      + ` de numero de identificacion: ${req.body.params.cedula}, `
      + ' Realizo una solicitud del seguro.'
      + ` Hemos recibido exitosamente tu solicitud para el tipo: ${data2[0][0].nombreseguro
      }. Proximamente te contactaremos!. `,
    );
    let empieza = 0;
    const cuantos = req.body.params.scope.length;
    if (quehace === 'eliminatodo') {
      await enviarmail(
        data2[0][0].correoasesor,
        encabezado,
        ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
        + ` Numero de identificacion Asociado: ${req.body.params.cedula}, `
        + ' Se solicita eliminacion de toda la poliza y sus beneficiarios ',
      );
    }
    if (quehace === 'eliminacion') {
      await enviarmail(
        data2[0][0].correoasesor,
        encabezado,
        ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
        + ` Numero de identificacion Asociado: ${req.body.params.scope[empieza].cedulasociado}, `
        + ` Indentificacion  Beneficiario : ${req.body.params.scope[empieza].cedulabeneficiario}, `
        + ` Nombre Beneficiario: ${req.body.params.scope[empieza].nombrebeneficiario}, `
        + ' Se solicita eliminacion de este beneficiario ',
      );
    }
    if (quehace === 'modificacion') {
      const promises = [];
      while (empieza >= 0 && empieza < cuantos) {
        const emailPromise = enviarmail(
          data2[0][0].correoasesor,
          encabezado,
          ` Tipo de servicio: ${data2[0][0].nombreseguro}, `
          + ` Numero de identificacion Asociado: ${req.body.params.scope[empieza].cedulasociado}, `
          + ` Indentificacion Anterior Beneficiario : ${req.body.params.scope[empieza].cedulaanterior}, `
          + ` Indentificacion Nueva Beneficiario : ${req.body.params.scope[empieza].cedulabeneficiario}, `
          + ` Nombre Beneficiario: ${req.body.params.scope[empieza].nombrebeneficiario}, `
          + ` Parentesco: ${req.body.params.scope[empieza].parentesco}`,
        );
        promises.push(emailPromise);
        empieza += 1;
      }
      try {
        await Promise.all(promises);
        // All emails have been sent successfully.
      } catch (error) {
        // Handle any errors that occurred during email sending.
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  }
  const mensaje = `Solicitud de ${quehace} enviada correctamente`;
  const mensaje1 = Encryptarsolodato(mensaje);

  return res.send([[{
    Codigo: '000',
    Mensaje: mensaje1,
    tipoMensaje: 'I',
  }]]);
};

module.exports = {
  registrarsolicitudvida,
  registrarsolicitudFMC,
  registrarsolicitudMovil,
  registrarsolicitudSoat,
  registrarsolicitudHogar,
  registrarsolicitudVehiculos,
  registrarsolicitudexequial,
};
