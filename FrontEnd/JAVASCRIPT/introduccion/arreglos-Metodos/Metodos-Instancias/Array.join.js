/**
 * 
 * 
 * crea un nuevo array con ',' '-' o el caracter que sea puesto por parametro
 */

const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());
// Expected output: "Fire,Air,Water"

console.log(elements.join(''));
// Expected output: "FireAirWater"

console.log(elements.join('-'));
// Expected output: "Fire-Air-Water"

console.log(elements.join(' + '));
// Expected output: "Fire + Air + Water"

const paises = ['Colombia', 'Canada', 'España', 'Francia', 'Rusia']
console.log(paises.join(', '));
// > "Colombia, Canada, España, Francia, Rusia"
console.log(paises.join(' - '));
// > "Colombia - Canada - España - Francia - Rusia"