/**
 * Array.some()
 * 
 * es un metodo que verifica en un array si al menos un elemento de todo el array cumple con la prueba/funcion/condicion establecida
 * de ser así, retorna true, de lo contrario retorna false
 * 
 * no modifica el array ni crea copias
 */


const array = [1, 2, 3, 4, 5];

// Checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.some(even));
// Expected output: true
