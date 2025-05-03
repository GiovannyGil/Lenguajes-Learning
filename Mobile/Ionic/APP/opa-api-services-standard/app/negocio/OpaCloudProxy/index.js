const proxy = require('express-http-proxy');
const urljoin = require('url-join');

const errorExepction = (res) => {
  res.status(500).send({
    msg: 'Proxy not implement url',
  });
};

function isValidHttpUrl(string) {
  try {
    const newUrl = new URL(string);
    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

const OpaCloudProxy = proxy(process.env.OPA_MOVIL__OPA_CLOUD_URL, {
  proxyReqPathResolver(req) {
    const parts = req.url.split('?');
    const queryString = parts[1];
    const requestPath = parts[0];
    const url = new URL(process.env.OPA_MOVIL__OPA_CLOUD_URL);
    const updatedPath = urljoin(url.pathname, requestPath);
    return updatedPath + (queryString ? `?${queryString}` : '');
  },
});

const OpaCloudValidateProxy = (_, res, next) => {
  if (isValidHttpUrl(process.env.OPA_MOVIL__OPA_CLOUD_URL)) {
    next();
  } else {
    errorExepction(res);
  }
};

module.exports = {
  OpaCloudProxy,
  OpaCloudValidateProxy,
};
