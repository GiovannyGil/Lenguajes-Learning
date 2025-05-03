const express = require('express');
const cors = require('cors');
const middlewares = require('./middlewares/admin');
const apiRoute = require('./routes/api');
const apiPublicRoute = require('./routes/apiPublic');
const apiCreditosDigitales = require('./routes/apiCreditosDigitales');
const { auth } = require('./middlewares/authJWT');
const { authIDP, checkCanalIDP } = require('./middlewares/IDPauth');

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));

function ExpressServer() {
  this.expressServer = express();
  Object.keys(middlewares).forEach((middleware) => {
    this.expressServer.use(middlewares[middleware]);
  });

  this.expressServer.set('view engine', 'ejs');
  this.expressServer.set('views', `${__dirname}/negocio/vistas/plantillas/`);
  this.expressServer.use('/creditos-digitales/api', apiCreditosDigitales);
  // default API
  this.expressServer.use('/api', apiPublicRoute);
  this.expressServer.use('/api', auth, apiRoute);
  // Rental API
  this.expressServer.use('/rental/api', apiPublicRoute);
  this.expressServer.use('/rental/api', checkCanalIDP(['opa-rental-api']), authIDP, apiRoute);
  // Mobile API
  this.expressServer.use('/mobile/api', apiPublicRoute);
  this.expressServer.use('/mobile/api', checkCanalIDP(['opa-mobile-api']), auth, apiRoute);
  // Sucursal API
  this.expressServer.use('/sucursal/api', apiPublicRoute);
  this.expressServer.use('/sucursal/api', checkCanalIDP(['opa-sucursal-api']), authIDP, apiRoute);
  // Web API
  this.expressServer.use('/web/api', apiPublicRoute);
  this.expressServer.use('/web/api', checkCanalIDP(['opa-web-api']), authIDP, apiRoute);
}

module.exports = ExpressServer;
