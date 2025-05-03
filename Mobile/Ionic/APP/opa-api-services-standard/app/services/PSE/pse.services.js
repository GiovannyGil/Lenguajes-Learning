const soap = require('soap');
const sql = require('../../model/mssql');
const { model } = require('../database.services');
const { Encryptarsolodato } = require('../../negocio/Helpers/encrypt');
const config = require('../../../config.json');

const estadoCuentasAhorros = async (dataimprimeahorrosParams) => {
  const dataimprimeahorros = dataimprimeahorrosParams;
  const model1 = await model;
  const dataR1 = await model1
    .consulta('', 'select Linea from PSETrasladoDestinoAhorros')
    .then((dataR) => {
      const data = dataR;
      let recordsetsahorros = [[]];

      if (data[0].length !== 0) {
        const datatermina = data[0].length;
        let inicio = 0;
        const termina = dataimprimeahorros[0].length;
        let linea = '';
        while (inicio >= 0 && inicio < termina) {
          linea = dataimprimeahorros[0][inicio].Linea;
          let dataini = 0;

          while (dataini >= 0 && dataini < datatermina) {
            if (data[0][dataini].Linea === linea) {
              dataimprimeahorros[0][inicio].valorapagar = 0;
              dataimprimeahorros[0][inicio].checked = false;
              dataimprimeahorros[0][inicio].modelcheck = dataini;

              recordsetsahorros[0].push(dataimprimeahorros[0][inicio]);
            }
            dataini += 1;
          }

          //   var recordsets = dataimprime
          inicio += 1;
        }
      } else {
        recordsetsahorros = [
          [
            {
              Mensaje: 'No Existe Parametrizacion para las lineas de ahorros en el modulo de PSE.',
              Codigo: '401',
              tipoMensaje: 'I',
            },
          ],
        ];

        recordsetsahorros[0][0].Mensaje = Encryptarsolodato(recordsetsahorros[0][0].Mensaje);
      }

      return recordsetsahorros;
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify({}, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return dataR1;
};

const estadoCuentasCreditos = async (params) => {
  const dataimprimeCreditos = params;
  const model1 = await model;
  const data = await model1
    .consulta('', 'select Linea,Destino from PSETrasladoCreditos')
    .then((datacre) => {
      let recordsetsCreditos = [[]];
      if (datacre[0].length !== 0) {
        let iniciocre = 0;
        const termina = dataimprimeCreditos[0].length;
        let linea = '';
        let destino = '';
        while (iniciocre >= 0 && iniciocre < termina) {
          linea = dataimprimeCreditos[0][iniciocre].CodigoLinea;
          destino = dataimprimeCreditos[0][iniciocre].CodigoDestino;
          let datacreini = 0;
          const datacretermina = datacre[0].length;

          while (datacreini >= 0 && datacreini < datacretermina) {
            if (
              datacre[0][datacreini].Linea === linea
                                        && datacre[0][datacreini].Destino === destino
            ) {
              dataimprimeCreditos[0][iniciocre].valorapagar = 0;
              dataimprimeCreditos[0][iniciocre].checked = false;
              recordsetsCreditos[0].push(dataimprimeCreditos[0][iniciocre]);
            }

            datacreini += 1;
          }
          //   var recordsets = dataimprime
          iniciocre += 1;
        }
      } else {
        recordsetsCreditos = [
          [
            {
              Mensaje: 'No Existe Parametrizacion para las lineas de creditos en el modulo de PSE.',
              Codigo: '401',
              tipoMensaje: 'I',
            },
          ],
        ];

        recordsetsCreditos[0][0].Mensaje = Encryptarsolodato(
          recordsetsCreditos[0][0].Mensaje,
        );
      }
      return recordsetsCreditos;
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(params, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const estadoCuentasNovedades = async (params) => {
  const dataimprimeNovedades = params;
  const model1 = await model;
  const data = await model1
    .consulta('', 'select codnovedad from PseNovedades')
    .then((dataNov) => {
      let recordsetsNovedades = [[]];

      if (dataNov[0].length !== 0) {
        let inicionovedad = 0;
        const terminanovedad = dataimprimeNovedades[0].length;
        let Codnovedad = '';
        while (inicionovedad >= 0 && inicionovedad < terminanovedad) {
          Codnovedad = dataimprimeNovedades[0][inicionovedad].codnovedad;
          let datanovini = 0;
          const datanovtermina = dataNov[0].length;

          while (datanovini >= 0 && datanovini < datanovtermina) {
            if (dataNov[0][datanovini].codnovedad === Codnovedad) {
              dataimprimeNovedades[0][inicionovedad].valorapagar = 0;
              dataimprimeNovedades[0][inicionovedad].checked = false;
              recordsetsNovedades[0].push(dataimprimeNovedades[0][inicionovedad]);
            }

            datanovini += 1;
          }

          //   var recordsets = dataimprime
          inicionovedad += 1;
        }
      } else {
        recordsetsNovedades = [
          [
            {
              Mensaje: 'No Existe Parametrizacion para las lineas de creditos en el modulo de PSE.',
              Codigo: '401',
              tipoMensaje: 'I',
            },
          ],
        ];

        recordsetsNovedades[0][0].Mensaje = Encryptarsolodato(
          recordsetsNovedades[0][0].Mensaje,
        );
      }

      return recordsetsNovedades;
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(params, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const consultaModuloPse = async (datagenera, parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(datagenera, 'web_nodejs_parametros_pse')
    .then((recordsets1) => {
      let dataR = [];
      if (parameters[0][0].estadomodulo === 'A') {
        dataR = [
          [
            {
              Mensaje: Encryptarsolodato(recordsets1[0][0].cMensajeInicial),
              Codigo: '000',
              tipoMensaje: 'I',
            },
          ],
        ];
        return dataR;
      }
      dataR = [
        [
          {
            Mensaje: Encryptarsolodato(recordsets1[0][0].cMensajeAdvertencia),
            Codigo: '999',
            tipoMensaje: 'E',
          },
        ],
      ];
      return dataR;
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const pseGeneralService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'web_nodejs_parametros_pse')
    .then(async (recordsets) => {
      const { caso } = parameters;
      if (caso === 1) {
        const datagenera = { caso: 2 };
        const response = await consultaModuloPse(datagenera, recordsets);
        return { data: response, error: true };
      }
      return { data: recordsets, error: true };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

const estadoCuentasPSEService = async (parameters) => {
  const tipo = parameters.Tipo;
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'pa_estadocuentasMovil')
    .then(async (recordsets) => {
      if (recordsets[0][0]) {
        if (tipo === 'AHORRO') {
          const dataimprimeahorros = recordsets;
          const responseAhorro = await estadoCuentasAhorros(dataimprimeahorros);
          return { data: responseAhorro, error: false };
        }
        if (tipo === 'CREDIT') {
          const dataimprimeCreditos = recordsets;
          const responseCreditos = await estadoCuentasCreditos(dataimprimeCreditos);
          return { data: responseCreditos, error: false };
        }
        if (tipo === 'ESTNOV') {
          const dataimprimeNovedades = recordsets;
          const responseNovedad = await estadoCuentasNovedades(dataimprimeNovedades);
          return { data: responseNovedad, error: false };
        }

        return { data: null, error: false };
      }
      return { data: null, error: false };
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

//  funcion de transacciones
const transaccionespse = async (productos) => {
  // inicializacion de variables
  let cadenaproductos = '';
  let cadenavalores = '';
  let cadenalineas = '';
  let cadenatipos = '';
  let totalPagar = 0;
  let costotransaccion = 0;

  let inicio = 0;
  const termina = productos.ahorros.length;

  while (inicio >= 0 && inicio < termina) {
    if (productos.ahorros[inicio].checked) {
      cadenaproductos = `${cadenaproductos + productos.ahorros[inicio].NumeroCuentaAhorros.trim()}|`;
      cadenavalores = `${cadenavalores + productos.ahorros[inicio].valorapagar}|`;
      cadenalineas = `${cadenalineas + productos.ahorros[inicio].Linea.trim()}|`;
      cadenatipos = `${cadenatipos + productos.ahorros[inicio].Tipo.trim()}|`;
      totalPagar += productos.ahorros[inicio].valorapagar;
    }

    inicio += 1;
  }

  let iniciocre = 0;
  const terminacre = productos.creditos.length;

  while (iniciocre >= 0 && iniciocre < terminacre) {
    if (productos.creditos[iniciocre].checked) {
      cadenaproductos = `${cadenaproductos + productos.creditos[iniciocre].Pagare}|`;
      cadenavalores = `${cadenavalores + productos.creditos[iniciocre].valorapagar}|`;
      cadenalineas = `${cadenalineas + productos.creditos[iniciocre].CodigoLinea.trim()}#${productos.creditos[iniciocre].CodigoDestino.trim()}|`;
      cadenatipos = `${cadenatipos}CR|`;
      totalPagar += productos.creditos[iniciocre].valorapagar;
    }
    iniciocre += 1;
  }

  let inicionov = 0;
  const terminanov = productos.novedades.length;

  while (inicionov >= 0 && inicionov < terminanov) {
    if (productos.novedades[inicionov].checked) {
      cadenaproductos = `${cadenaproductos + productos.novedades[inicionov].idnovedades}|`;
      cadenavalores = `${cadenavalores + productos.novedades[inicionov].valorapagar}|`;
      cadenalineas = `${cadenalineas}novedadesvariasnocausadasconsaldo|`;
      cadenatipos = `${cadenatipos}NOVEDAD|`;
      totalPagar += productos.novedades[inicionov].valorapagar;
    }
    inicionov += 1;
  }

  if (costotransaccion !== 0) {
    costotransaccion = Number(productos.costotrasaccion.replace('.', ''));
  }
  // const costotransaccion = Number(productos.costotrasaccion.replace('.', '')) || 0;
  totalPagar += costotransaccion;
  // totalPagar = totalPagar + productos.costotrasaccion

  cadenaproductos = cadenaproductos.substring(0, cadenaproductos.length - 1);
  cadenavalores = cadenavalores.substring(0, cadenavalores.length - 1);
  cadenalineas = cadenalineas.substring(0, cadenalineas.length - 1);
  cadenatipos = cadenatipos.substring(0, cadenatipos.length - 1);

  const cadenaproductosCount = cadenaproductos.length;
  const cadenavaloresCount = cadenavalores.length;
  const cadenalineasCount = cadenalineas.length;
  const parametrosDiscriminadosCount = cadenatipos.length;

  let mensaje = ' ';
  if (
    cadenaproductosCount === 0
            || cadenavaloresCount === 0
            || cadenalineasCount === 0
            || parametrosDiscriminadosCount === 0
  ) {
    mensaje = 'Error validando productos';
  }

  if (mensaje !== ' ') {
    const data = [
      [
        {
          Mensaje: Encryptarsolodato(mensaje),
          Codigo: '401',
          tipoMensaje: 'I',
        },
      ],
    ];

    return data;
  }

  const consulta2 = `${"select TOP 1  CASE  tipoidentificacion  WHEN 'C' THEN 1 "
            + "WHEN  'E' THEN 2 "
            + "WHEN  'N' THEN 3 "
            + "WHEN  'U' THEN 4 "
            + " WHEN  'T' THEN 5 "
            + " WHEN  'p' THEN 6 "
            + " WHEN  'R' THEN 7 "
            + "ELSE  11 END AS tipo_id,nombreintegrado, nombres,primerapellido, segundoapellido,email,replace(telefono1,' ','') as telefono1,(select isnull(max(id_pago)+1,1) as idpago from pse_log) as idpago from nits where nit = "}${productos.cedula}`;

  const model1 = await model;
  const dataR = await model1
    .consulta('', consulta2)
    .then((datosasociados) => {
      let { email } = datosasociados[0][0];
      if (email === undefined || email === '') {
        email = config.emailConfig.user;
      }

      const idCliente = productos.cedula;
      const tipoId = datosasociados[0][0].tipo_id;
      const telefonoPSE = datosasociados[0][0].telefono1;
      let nombreCliente = '';
      let apellidoCliente = '';

      if (tipoId === '3') {
        nombreCliente = datosasociados[0][0].nombreintegrado;
        apellidoCliente = '';
      } else {
        nombreCliente = datosasociados[0][0].nombres;
        apellidoCliente = `${datosasociados[0][0].primerapellido.trim()} ${datosasociados[0][0].segundoapellido.trim()}`;
      }

      const consecutivo = datosasociados[0][0].idpago;
      mensaje = ' ';
      if (consecutivo === undefined || consecutivo === '') {
        mensaje = 'Error en generacion de consecutivo de pago';
      }

      if (totalPagar === undefined || totalPagar === ' ') {
        mensaje = 'Error validando totales';
      }

      if (email === '') {
        mensaje = 'Email no valido, por favor actualizar tus datos';
      }
      if (idCliente === '') {
        mensaje = 'Documento no valido, por favor actualizar tus datos';
      }
      if (tipoId === '') {
        mensaje = 'Tipo de documento no valido, por favor actualizar tus datos';
      }
      if (nombreCliente === '') {
        mensaje = 'Nombres no validos, por favor actualizar tus datos';
      }

      if (mensaje !== ' ') {
        const data = [
          [
            {
              Mensaje: Encryptarsolodato(mensaje),
              Codigo: '401',
              tipoMensaje: 'I',
            },
          ],
        ];

        return data;
      }

      const fecha = new Date();
      const data1 = `${fecha.toLocaleDateString('zh-Hans-CN')} ${fecha.toLocaleTimeString('es-ES')}`;
      const paramsservicio = {
        id_tienda: config.DatosZona.idTienda,
        clave: config.DatosZona.ClaveWS,
        total_con_iva: totalPagar,
        valor_iva: '0',
        id_pago: consecutivo,
        descripcion_pago: 'Pago de las obligaciones pendientes con la entidad.',
        email: email.trim(),
        id_cliente: idCliente,
        tipoId,
        nombre_cliente: nombreCliente,
        apellido_cliente: apellidoCliente,
        telefono_cliente: telefonoPSE,
        info_opcional1: ' ', // 'Pagare '.$productos,
        info_opcional3: '',
        codigo_servicio_principal: config.DatosZona.codigoServicio,
      };

      const url = 'http://www.zonapagos.com/ws_inicio_pagov2/Zpagos.asmx?wsdl';

      return new Promise((resolve) => {
        soap.createClient(
          url,
          config.DatosZona,
          (errSoap, client) => client.inicio_pagoV2(paramsservicio, (errSoap2, result) => {
            if (errSoap2) {
              const data = [
                [
                  {
                    Mensaje: Encryptarsolodato('Error llamando consulta'),
                    Codigo: '401',
                    tipoMensaje: 'I',
                  },
                ],
              ];

              resolve(data);
            }
            /* eslint-disable */
            const { inicio_pagoV2Result } = result;
            const inicioPagoV2Result = inicio_pagoV2Result;
            let costotransaccionParseInt;
            let costotransaccionReplace;
            /* eslint-enable */
            if (costotransaccion !== 0) {
              costotransaccionReplace = productos.costotransaccion.replace('.', '') || 0 //  productos.costotrasaccion.replace('.', '') || 0;
              costotransaccionParseInt = parseInt(costotransaccionReplace, 10);
            } else {
              costotransaccionParseInt = 0;
            }

            const parame = {
              id_pago: consecutivo,
              id_tienda: config.DatosZona.idTienda,
              clave: config.DatosZona.ClaveWS,
              total_con_iva: totalPagar,
              valor_iva: 0,
              productos: cadenaproductos,
              valores: cadenavalores,
              tipo_productos: cadenalineas,
              descripcion_pago: 'Pago de las obligaciones pendientes con la entidad',
              email,
              id_cliente: idCliente,
              tipo_id: tipoId,
              nombres: nombreCliente,
              apellidos: apellidoCliente,
              telefono: telefonoPSE,
              codigo_servicio_principal: config.DatosZona.codigoServicio,
              estado: 888,
              fechagenero: data1,
              parametro: cadenatipos,
              costotransaccion: costotransaccionParseInt,
            };

            model1
              .SP(parame, 'web_nodejs_insertar_transaccion')
              .then(() => {
                const data = [
                  [
                    {
                      Mensaje: `https://www.zonapagos.com/${config.DatosZona.rutaPasarela}/pago.asp?estado_pago=iniciar_pago&identificador=${inicioPagoV2Result}`,
                      Codigo: '000',
                      tipoMensaje: 'I',
                    },
                  ],
                ];

                resolve(data);
              })
              .catch((err) => {
                const message = `\n\nBody\n\n\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
                sql.log('Error', message);
                const data = [
                  [
                    {
                      Mensaje: Encryptarsolodato(message),
                      Codigo: '401',
                      tipoMensaje: 'I',
                      transaccion: {
                        Codigo: '999',
                        pago: consecutivo,
                        estado: '888',
                        fechagenero: data1,
                        total_con_iva: totalPagar,
                      },
                    },
                  ],
                ];
                resolve(data);
              });
          }),
        );
      });
    })
    .catch((err) => {
      const message = `\n\nBody\n\n\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      const data = [
        [
          {
            Mensaje: Encryptarsolodato(message),
            Codigo: '401',
            tipoMensaje: 'I',
          },
        ],
      ];
      return data;
    });

  return dataR;
};

const transaccionesPSEService = async (parameters, consulta, res) => {
  const model1 = await model;
  const dataR1 = await model1
    .consulta('', consulta)
    .then(async (data) => {
      if (data[0].length === 0) {
        try {
          const codigorespuesta = transaccionespse(parameters);
          return codigorespuesta.then((r) => {
            res.send(r);
          });
        } catch (error) {
          res.send(error);
        }
      } else {
        const params = {
          str_id_pago: data[0][0].id_pago,
          int_id_tienda: config.idTienda,
          str_id_clave: config.ClaveWS,
        };

        const url = 'http://www.zonapagos.com/ws_verificar_pagos/Service.asmx?wsdl';
        soap.createClient(url, config.DatosZona, (_err, client) => {
          client.verificar_pago_v3(params, (_err2, result) => {
            let CodigoTransaccion = result.codigo_transaccion;
            if (CodigoTransaccion === undefined) {
              CodigoTransaccion = -1;
            }

            CodigoTransaccion = CodigoTransaccion === -1 ? '' : CodigoTransaccion;

            const cadenaactualiza = `UPDATE pse_log SET cus= '${CodigoTransaccion}' WHERE id_pago =${data[0][0].id_pago}`;
            const datostranpendiente = data;
            model1
              .consulta('', cadenaactualiza)
              .then(() => {
                const datatranpendiente = [
                  [
                    {
                      Codigo: '999',
                      pago: datostranpendiente[0][0].id_pago,
                      estado: CodigoTransaccion,
                      fechagenero: datostranpendiente[0][0].fechagenero,
                      total_con_iva: datostranpendiente[0][0].total_con_iva,
                    },
                  ],
                ];
                res.send(datatranpendiente);
              })
              .catch((err) => {
                const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
                sql.log('Error', message);
                const dataR = [
                  [
                    {
                      Mensaje: Encryptarsolodato(message),
                      Codigo: '401',
                      tipoMensaje: 'I',
                    },
                  ],
                ];

                return dataR;
              });
            // return data
          });
        });
      }

      return {};
    })
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      const data = [
        [
          {
            Mensaje: Encryptarsolodato(message),
            Codigo: '401',
            tipoMensaje: 'I',
          },
        ],
      ];
      return data;
    });
  return dataR1;
};

const PseHistoricoService = async (parameters) => {
  const model1 = await model;
  const data = await model1
    .SP(parameters, 'web_nodejs_sp_pse_historial')
    .then((recordsets) => ({ data: recordsets, error: false }))
    .catch((err) => {
      const message = `\n\nBody\n\n${JSON.stringify(parameters, null, 4)}\n\nMessage Error\n\n${JSON.stringify(err, null, 4)}`;
      sql.log('Error', message);
      return { data: err, error: true };
    });
  return data;
};

module.exports = {
  pseGeneralService,
  estadoCuentasPSEService,
  transaccionesPSEService,
  PseHistoricoService,
};
