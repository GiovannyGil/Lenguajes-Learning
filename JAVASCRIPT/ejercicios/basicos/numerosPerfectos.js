/**
 *  ingresar un número y determine si ese número es un número perfecto. 
 * Un número perfecto es aquel que es igual a la suma de sus divisores propios positivos 
 * (excluyendo el propio número).
 */


let numero = 28

let sumaDivisores = 0;

// Encontrar y sumar los divisores propios del número
for (let i = 1; i < numero; i++) {
  // si el numero, divido i es igual a cero, sumarlo a los divisores
  if (numero % i === 0) {
    sumaDivisores += i;
  }
}

// Verificar si la suma de los divisores es igual al número
if (sumaDivisores === numero) {
  console.log("El número " + numero + " es un número perfecto.");
} else {
  console.log("El número " + numero + " no es un número perfecto.");
}
