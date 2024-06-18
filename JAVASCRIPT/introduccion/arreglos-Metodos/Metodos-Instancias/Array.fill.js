/**
 * Array.Fill
 * 
 * cambia todos los valores dentro de un array por un valor estatico, puede recibir como parametro el valor, desde donde y hasta donde
 */


const array1 = [1, 2, 3, 4];

// // Fill with 0 from position 2 until position 4
// console.log(array1.fill(0, 2, 4));
// // Expected output: Array [1, 2, 0, 0]

// // Fill with 5 from position 1
// console.log(array1.fill(5, 1));
// // Expected output: Array [1, 5, 5, 5]

// console.log(array1.fill(6));
// // Expected output: Array [6, 6, 6, 6]


const numeros = [1,2,3,4,5,6,7,8,9,0]
console.log(numeros.fill(1))
//  Array [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// cambia todos por un numero 1

console.log(numeros.fill(2, 4))
// Array [1, 1, 1, 1, 2, 2, 2, 2, 2, 2]
// cambia desde la posicion 4 hasta el final con numeros 2

console.log(numeros.fill(3, 5, 8))
// Array [1, 1, 1, 1, 2, 3, 3, 3, 2, 2]
// cambia desde la posicion 5 hasta la 8 con numeros 3
