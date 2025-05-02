/**
 * Invertir una cadena:
 * Desarrolla una función que reciba una cadena de texto como parámetro y devuelva la misma cadena pero con los caracteres en orden inverso.
 */

function invertirCadena(cadena) {
    let NewCadena = cadena.split(""); // convertir cadeta en array
    let  reverseCadena = NewCadena.reverse()  // invertir el array
    let unirCadena = reverseCadena.join("-") // unir array en cadena
    console.log(unirCadena);
    return unirCadena
  }
  
  const text = invertirCadena('Hola');
  console.log(text);
  