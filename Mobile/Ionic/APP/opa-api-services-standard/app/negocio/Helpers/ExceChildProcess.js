// var RSVP = require('rsvp');
const { exec } = require('child_process');
const Q = require('q');
const log = require('./log');

function execc(file, params) {
  // var promise = new RSVP.Promise(function (resolve, reject) {
  const promise = Q.Promise((resolve, reject) => {
    let arrayParams = '';

    Object.keys(params).forEach((i) => {
      arrayParams += ` ${params[i]}`;
    });

    let paramettersJSON = JSON.stringify(arrayParams);
    paramettersJSON = paramettersJSON.substr(1, paramettersJSON.length - 2);
    //  console.log(paramettersJSON + " -->params");
    log('SendTo Simulador', paramettersJSON);

    /// post
    // var arrayParams = "";
    //        var arrayParams = "";
    //        for (var i in params) {
    //            if (typeof params[i] === "object") {
    //                arrayParams += " " + JSON.stringify(params[i]);
    //            } else {
    //                arrayParams += " " + params[i];
    //            }
    //        }
    // console.log(arrayParams);
    /// post
    exec(`${file}${paramettersJSON}`, (error, stdout, stderr) => {
      // exec(file + " " + arrayParams, function (error, stdout, stderr) {
      if (stderr) { return reject(stderr); }
      //  console.log(stdout);

      const obj = JSON.parse(stdout);
      log('Ouput Simulador', obj);
      return resolve(obj);
    });
  });

  return promise;
}

module.exports = execc;
