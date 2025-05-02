/**
 * Array.findIndex
 * 
 * es un metodo que devuelve/retorna el indice del primer elemento de un array que concumple con una condicion o parametro
 *
 */

const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// Expected output: 3
