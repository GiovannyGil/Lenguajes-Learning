const {
  buscarDestinosAhorrosService, buscarPlazoAhorrosService,
  comboPeriodoLiquidaService, calcularAhorroService, imprimirFrontService,
} = require('../../services/simuladorCDAT/simuladorCDAT.services');

const buscarDestinosAhorros = async (req, res) => {
  const opcion = { opcion: '1' };
  const response = await buscarDestinosAhorrosService(opcion);

  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

const BuscarPlazoAhorros = async (req, res) => {
  const opcion = {
    opcion: '2',
    Codlinea: req.body.data.objeto.Destino,
  };
  const response = await buscarPlazoAhorrosService(opcion);

  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

const comboPeriodoLiquida = async (req, res) => {
  const opcion = {
    opcion: '3',
    Codlinea: req.body.data.objeto.Destino,
    PlazoSeleccionado: req.body.data.objeto.plazo,
  };
  const response = await comboPeriodoLiquidaService(opcion);

  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

const calcularAhorro = async (req, res) => {
  const params = req.body.data.objeto;
  const response = await calcularAhorroService(params);

  if (response.error) res.send(response.data);
  if (!response.error) res.json(response.data);
};

const imprimirFrontAhorros = async (req, res) => {
  const params = req.body.objeto;
  const dataValue = req.body.objeto;
  const response = await imprimirFrontService(params, dataValue);
  res.set('Content-disposition', 'attachment; filename=certificado.pdf');
  res.set('Content-Type', 'application/pdf');
  response.pipe(res);
};

module.exports = {
  buscarDestinosAhorros,
  BuscarPlazoAhorros,
  comboPeriodoLiquida,
  calcularAhorro,
  imprimirFrontAhorros,
};
