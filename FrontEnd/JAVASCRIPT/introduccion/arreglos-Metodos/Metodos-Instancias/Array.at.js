/**
 * Array.at
 * 
 * es un metodo que permite tomar un elemento de un array en la posicion del index elejido
 * tanto en positovo -->
 * como en negativo  <--
 */

const array1 = [5, 12, 8, 130, 44];

let indexPositivo = 2;

console.log(`en el index ${indexPositivo} returns ${array1.at(indexPositivo)}`);
// Expected output: "An index of 2 returns 8"

indexNegativo = -2;

console.log(`en el index ${indexNegativo} returns ${array1.at(indexNegativo)}`);
// Expected output: "An index of -2 returns 130"
