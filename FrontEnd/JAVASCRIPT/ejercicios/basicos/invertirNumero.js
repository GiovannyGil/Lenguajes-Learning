/**
 *  ingresar un número entero positivo y luego invierta el orden de sus dígitos. El programa debe mostrar el número invertido.
 */

const numero = 12345

function InvertirNumero(numero){
    let numeroINVERT = numero.toString().split('').reverse()
    let numeroNew = numeroINVERT.toString()


    console.log(numero.toString().split(''));
    console.log(numeroINVERT);
    console.log(numeroNew);
}


InvertirNumero(numero)