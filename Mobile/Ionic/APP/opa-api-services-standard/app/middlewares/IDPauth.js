const { promisify } = require('node:util');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const jwksClient = require('jwks-rsa');
const axios = require('axios');
const validateScope = require('validate-scope');

const checkScopePolicy = (scopes) => (req, res, next) => {
  const validate = validateScope(scopes);
  let token = '';
  if (req.headers.authorization.includes('Bearer')) {
    token = req.headers.authorization.substring(7);
  } else {
    token = req.headers.authorization;
  }
  const { scope: scopesToken } = jwt.decode(token);
  const pass = validate(scopesToken);
  if (!pass) {
    return res.status(401).json('No estás autorizado');
  }
  return next();
};

const authIDP = (req, res, next) => {
  const fetchJwksUri = async (issuer) => {
    const response = await axios.get(
      `${issuer}/.well-known/openid-configuration`,
    );
    return response.data.jwks_uri;
  };

  const getKey = (jwksUri) => (header, callback) => {
    const client = jwksClient({ jwksUri });
    client.getSigningKey(header.kid, (err, key) => {
      if (err) {
        return callback(err);
      }
      return callback(null, key.publicKey || key.rsaPublicKey);
    });
  };

  /**
   * Verify an OpenID Connect ID Token
   * @param {string} token - The JWT Token to verify
   */
  const verify = async (token) => {
    const { iss: issuer, exp: expiraen } = jwt.decode(token);
    const totalMilliSeconds = moment().unix();
    if (expiraen <= totalMilliSeconds) {
      throw new Error('Token expirado');
    }
    const jwksUri = await fetchJwksUri(issuer);
    return promisify(jwt.verify, getKey(jwksUri));
  };

  let token = '';
  if (req.headers.authorization.includes('Bearer')) {
    token = req.headers.authorization.substring(7);
  } else {
    token = req.headers.authorization;
  }
  verify(token)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(401).json('No estás autorizado');
    });
};

const checkCanalIDP = (canal) => (req, res, next) => {
  let token = '';
  if (req.headers.authorization.includes('Bearer')) {
    token = req.headers.authorization.substring(7);
  } else {
    token = req.headers.authorization;
  }
  const { aud: canalToken } = jwt.decode(token);

  // console.log(canal.includes(canalToken));
  let pass = false;
  for (let i = 0; i < canal.length; i += 1) {
    for (let j = 0; j < canalToken.length; j += 1) {
      if (canalToken[j] === canal[i]) {
        pass = true;
      }
    }
  }
  if (!pass) {
    return res.status(400).json('No estás autorizado por este canal');
  }
  return next();
};

module.exports = { authIDP, checkScopePolicy, checkCanalIDP };
