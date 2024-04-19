"use strict";
var Utility;
(function (Utility) {
    let Taxes;
    (function (Taxes) {
        function CalcIva(price) {
            return (price * 0.19) * price;
        }
        Taxes.CalcIva = CalcIva;
        function CalcPenaIva(price) {
            return (price * 0.30) * price;
        }
        Taxes.CalcPenaIva = CalcPenaIva;
    })(Taxes = Utility.Taxes || (Utility.Taxes = {}));
})(Utility || (Utility = {}));
///<reference path="utility.ts"/> /// importacion de namespaces o archivos externos del proyecto
let utlis = Utility.Taxes;
console.log(utlis.CalcIva(100));
console.log(utlis.CalcPenaIva(200));
