/**
 * programa en JavaScript que pida al usuario ingresar una frase y luego cuente el número de palabras en esa frase
 */

const palabra = "uno dos tres"

function ContadorPalabras(palabra){
    const delimitar = palabra.split(' ')
    console.log(delimitar);
    const cantidad = delimitar.length
    console.log(`Cantidad de palabras: ${cantidad}`);
}

ContadorPalabras(palabra)