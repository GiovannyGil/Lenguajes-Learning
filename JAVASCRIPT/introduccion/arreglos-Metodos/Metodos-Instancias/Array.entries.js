/**
 * Array.entries()
 * 
 * es un metodo que permite recorrer o tomar un elementos de un arrat, mostrando en forma de clave/valor en un nuevo array
 */


const array1 = ['a', 'b', 'c'];

const iterator1 = array1.entries();

console.log(iterator1.next().value);
// Expected output: Array [0, "a"]

console.log(iterator1.next().value);
// Expected output: Array [1, "b"]

const Nombres = ['Gio', 'July', 'Lore', 'Santi']
const entradas = Nombres.entries()
console.log(entradas.next().value)
console.log(entradas.next().value)
console.log(entradas.next().value)