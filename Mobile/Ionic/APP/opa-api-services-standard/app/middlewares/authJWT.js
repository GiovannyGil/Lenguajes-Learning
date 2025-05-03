const jwt = require('jwt-simple');
const { Encryptarsolodato } = require('../negocio/Helpers/encrypt');

const auth = (req, res, next) => {
  let token = '';
  if (req.headers.authorization) {
    if (req.headers.authorization.includes('Bearer')) {
      token = req.headers.authorization.substring(7);
    } else {
      token = req.headers.authorization;
    }
    if (token !== undefined) {
      const decoded = jwt.decode(token, 'Op4*5asAPP,.');
      if (decoded.fecha <= Date.now()) {
        const datatiempo = [
          [
            {
              Mensaje: Encryptarsolodato('El tiempo de Sesión o token ha expirado.'),
              Codigo: '401',
              tipoMensaje: 'E',
            },
          ],
        ];

        return res.send(datatiempo);
      }
    } else {
      const data = [
        [
          {
            Mensaje: 'No se encuentra Autorizado para Utilizar esta aplicación',
            Codigo: '401',
            tipoMensaje: 'E',
          },
        ],
      ];
      if (data[0][0]) {
        data[0][0].Mensaje = Encryptarsolodato(data[0][0].Mensaje);
      }
      return res.send(data);
    }

    return next();
  }
  const data = [
    [
      {
        Mensaje: 'No se encuentra Autorizado para Utilizar esta aplicación',
        Codigo: '401',
        tipoMensaje: 'E',
      },
    ],
  ];
  if (data[0][0]) {
    data[0][0].Mensaje = Encryptarsolodato(data[0][0].Mensaje);
  }
  return res.send(data);
};

module.exports = { auth };
