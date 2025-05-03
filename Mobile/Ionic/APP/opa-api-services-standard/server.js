require('dotenv').config()
var fs = require('fs'),
    http = require('http')
    // const Service = require('node-windows').Service;
var https = require('https'),
    conf = require('./config.json'),
    expressServer = require('./app/ExpressServer.js'),


    app = new expressServer()

if (conf.tls.use) {
    var privateKey = fs.readFileSync(conf.tls.privateKey, 'utf8');
    var certificate = fs.readFileSync(conf.tls.certificate, 'utf8');
    // var ca1 = fs.readFileSync(conf.tls.ca1, 'utf8');
    // var ca2 = fs.readFileSync(conf.tls.ca2, 'utf8');

    var credentials = { key: privateKey, cert: certificate,  };// ca: [ca1, ca2]
    server = https.createServer(credentials, app.expressServer);
} else {
    server = http.createServer(app.expressServer);
}

// Las lineas comentadas ajecutan el servicio como un servicio de windows

// const svc = new Service({
//     name: 'MiAplicacionNode',
//     description: 'Mi aplicación Node.js como servicio de Windows',
//     script: './server.js', // Ruta al script principal de tu aplicación
// });

// svc.on('install', () => {
//     svc.start();
// });

// svc.install();

port = process.env.PORT || conf.HttpPort;
server.listen(port);
console.log('Servicio activo en el puerto: ' + port);
