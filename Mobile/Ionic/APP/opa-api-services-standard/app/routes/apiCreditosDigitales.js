const router = require('express').Router();
const creditosDigitales = require('../negocio/CreditosDigitales');

router.post('/token', (_, res) => {
  creditosDigitales.getToken()
    .then((data) => {
      res.send([{ token: data.access_token }]);
    })
    .catch((error) => {
      res.send({ error: 'No autenticado', msg: error });
    });
});

router.post('/config', (_, res) => {
  const configuracionCreditosDigitales = creditosDigitales.getConfiguration();

  res.send([configuracionCreditosDigitales]);
});

router.get('/ConsultaAprobados', async (req, res) => {
  try {
    const configuracionCreditosDigitales = creditosDigitales.getConfiguration();
    const TokenCD = await creditosDigitales.getToken();
    const { id } = req.query;
    const amountData = await creditosDigitales.getAmount(TokenCD, id);

    const configuracionConToken = {
      ...configuracionCreditosDigitales,
      token: TokenCD.access_token,
    };

    const respuestaFinal = {
      ...amountData,
      config: configuracionConToken,
    };

    res.send(respuestaFinal);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener datos', msg: error.message });
  }
});
module.exports = router;
