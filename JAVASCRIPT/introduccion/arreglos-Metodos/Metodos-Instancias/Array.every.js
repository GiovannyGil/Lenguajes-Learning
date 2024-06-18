/**
 * Array.Every
 * 
 * es un metodo que retorna un booleano, de la comparacion o pruba hecha
 * como por ejemplo comparar si un numero es mayor que todos los de la matriz
 */

// pregunta si todos los numeros que hay en el array son menores que el numero pasado
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

// se toma el array y se le pasa como parametro la 'condicion'
console.log(array1.every(isBelowThreshold));
// Expected output: true
