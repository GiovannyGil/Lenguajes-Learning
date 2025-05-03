const IntegradorSFC = require('./IntegradorSFC');
const IntegradorSFCV2 = require('./IntegradorSFCV2');

const integradorTypes = {
  IntegradorSFCV2: 'IntegradorSFCV2',
  IntegradorSFC: 'IntegradorSFC',
};

const IntegradorFactory = {
  create: () => {
    // Use provider defiend or Integrador S.F.C v1 per default
    const type = process.env.OPA_MOVIL__PROVIDER_USE || integradorTypes.IntegradorSFC;
    switch (type) {
      case integradorTypes.IntegradorSFC:
        return new IntegradorSFC();
      case integradorTypes.IntegradorSFCV2:
        return new IntegradorSFCV2();
      default:
        return null;
    }
  },
};

module.exports = {
  IntegradorFactory,
  integradorTypes,
};
