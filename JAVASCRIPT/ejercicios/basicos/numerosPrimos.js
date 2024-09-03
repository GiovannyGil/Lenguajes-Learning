/**
 * ingresar un número y determine si ese número es primo o no. Un número primo es aquel que solo tiene dos divisores: 1 y él mismo
 * 
 */

// Ingresar un número
const numero = "hola";


if(numero < 0 || numero != typeof(Number)) {
  console.log('debe ingresar numeros validos');
  return
} {
  if(numero % 2 == 0){
    console.log(`El número ${numero} no es primo`);
  } else {
      console.log(`El número ${numero} es primo`);
  }
}