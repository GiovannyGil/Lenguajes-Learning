/**
 *  ingresar un número entero positivo y luego recorra todos los números desde 1 hasta ese número. 
 * El programa debe imprimir "Par" si el número es par, e "Impar" si el número es impar.
 */

const numero = 10

function RecorreNumero(numero){
    if(numero <= 0){
        console.log("El número debe ser positivo")
        return
    }

    for (let index = 0; index <= numero; index++) {

        if(index % 2 == 0) {
            console.log(index + " es par")
        } else {
            console.log(index + " es impar");
        }
        
    }



}


RecorreNumero(numero)