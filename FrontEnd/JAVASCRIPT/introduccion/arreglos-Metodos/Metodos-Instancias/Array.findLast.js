/**
 * Array.findLast
 * 
 * es un metodo que recorre un array de modo inverso <---
 * y devuelve el primer valor encontrado <--
 * 
 * 
 * si no encuentra una valor que cumpla, de vuelve undefined
 */

const array1 = [5, 12, 50, 130, 44];

const found = array1.findLast((element) => element > 111);

console.log(found);
// Expected output: 130
