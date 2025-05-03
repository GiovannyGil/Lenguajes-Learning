const controllAllowOrigen = require('./ControlAllowOrigen');
const staticFunc = require('./static');
const favicon = require('./favicon');
const json = require('./bodyParser');
const queryString = require('./queryString');

module.exports = {
  controllAllowOrigen,
  static: staticFunc,
  favicon,
  json,
  queryString,
};
