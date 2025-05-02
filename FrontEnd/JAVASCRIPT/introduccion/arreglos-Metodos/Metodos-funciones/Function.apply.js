/**
 * Function.apply()
 * 
 * es una funcion que aplica una condicion/parametro o prueba a una funcion aplicada a un array y retorna el valor encontrado
 */

const numbers = [5, 6, 2, 3, 7];

// buscar el maximo del array, aplicando el array y parametros
const max = Math.max.apply(null, numbers);

console.log(max);
// Expected output: 7

const min = Math.min.apply(null, numbers);

console.log(min);
// Expected output: 2
