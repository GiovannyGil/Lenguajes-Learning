"use strict";
function Greet(name) {
    console.log(`Hello World!, ${name.toUpperCase()} !!!!`);
}
Greet("Gio");
function getNumber() {
    return Math.floor(Math.random() * 100);
}
console.log(getNumber());
function printPosition(position) {
    console.log(`latitud y longitud: es lat: ${position.lat} long: ${position.long}`);
}
printPosition({ lat: 3, long: 5 });
