/**
 * Array.copyWithin
 * 
 * es un metodo que permite crear un array en base a otro, con ligeros cambios
 * 
 * Syntax
 * copyWithin(target, start)
 * copyWithin(target, start, end)
 * (elemento/index a cambiar, incio/donde se encuentra/donde inicia, donde termina)
 */

const array1 = ['a', 'b', 'c', 'd', 'e'];

// Copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 3, 4));
// Expected output: Array ["d", "b", "c", "d", "e"]

// Copy to index 1 all elements from index 3 to the end
console.log(array1.copyWithin(1, 3));
// Expected output: Array ["d", "d", "e", "d", "e"]



const Frutas = ['Fresas', 'Manzanas', 'Peras', 'Uvas', 'Mangos', 'Naranjas', 'Papayas', 'Sandias']
console.log(Frutas)
const NovaFruta = (Frutas.copyWithin(2, 7))
console.log(NovaFruta)