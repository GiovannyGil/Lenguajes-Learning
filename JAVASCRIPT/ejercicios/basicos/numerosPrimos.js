/**
 * ingresar un número y determine si ese número es primo o no. Un número primo es aquel que solo tiene dos divisores: 1 y él mismo
 * 
 */

if (numero > 1) {
  // Verificar si el número es primo
  for (let i = 2; i <= Math.sqrt(numero); i++) {
    if (numero % i === 0) {
        console.log('es primo')
      break;
    } else {
        console.log('no es primo')
    }
  }
}