const {
  BuscarLineasService, BuscarDestinosService, CalcularCreditoService, imprimirCreditosService,
} = require('../../services/simuladorCreditos/simuladorCredito.services');
const config = require('../../../config.json');

const BuscarLineasSimuladorCreditos = async (req, res) => {
  const opcion = { opcion: '1' };
  const response = await BuscarLineasService(opcion);

  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

const BuscarDestinosSimuladorCreditos = async (req, res) => {
  const opcion = {
    opcion: '2',
    Codlinea: req.body.data.objeto.CodLinea,
  };
  const response = await BuscarDestinosService(opcion);

  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

const BuscarPeriodicidadCreditos = async (req, res) => {
  let periodicidad = [];
  const Nentidad = config.entidad.codigo;
  if (Nentidad === '0091') {
    periodicidad = [
      { key: '30', value: 'Mensual' },
      { key: '15', value: 'Quincenal' },
    ];
  } else {
    periodicidad = [
      { key: '30', value: 'Mensual' },
      { key: '15', value: 'Quincenal' },
      { key: '14', value: 'Catorcenal' },
      { key: '10', value: 'Decadal' },
      { key: '7', value: 'Semanal' },
    ];
  }
  res.json([periodicidad]);
};

const calcularCredito = async (req, res) => {
  const opcion = {
    Codlinea: req.body.objeto.CodLinea,
    Coddestino: req.body.objeto.Coddestino,
    periodicidad: req.body.objeto.periodicidad,
    Capitalprestar: req.body.objeto.Capitalprestar,
    plazo: req.body.objeto.plazo,
    Totales: 1,
    cedula: req.body.objeto.cedula,
    extras: JSON.stringify(req.body.objeto.cuotasExtras) ? JSON.stringify(req.body.objeto.cuotasExtras) : '[]',
  };
  const response = await CalcularCreditoService(opcion);

  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data[0][0]);
};

const imprimirCreditosFront = async (req, res) => {
  const params = {
    Codlinea: req.body.objeto.CodLinea,
    Coddestino: req.body.objeto.Coddestino,
    periodicidad: req.body.objeto.periodicidad,
    Capitalprestar: req.body.objeto.Capitalprestar,
    plazo: req.body.objeto.plazo,
    Totales: 1,
    cedula: req.body.objeto.cedula,
    extras: JSON.stringify(req.body.objeto.cuotasExtras) ? JSON.stringify(req.body.objeto.cuotasExtras) : '[]',
  };
  const response = await imprimirCreditosService(params);
  res.set('Content-disposition', 'attachment; filename=certificado.pdf');
  res.set('Content-Type', 'application/pdf');
  response.pipe(res);
};

module.exports = {
  BuscarLineasSimuladorCreditos,
  BuscarDestinosSimuladorCreditos,
  BuscarPeriodicidadCreditos,
  calcularCredito,
  imprimirCreditosFront,
};
