/**
 * 
 * Contador simple:
 * Crea una función que reciba un número como parámetro e imprima en la consola todos los números desde 1 hasta ese número. 
 */

function contadorSimple(num){
    let numero = num
    let i = 0
    while(i <= numero){
        console.log(i)
        i = i + 1
    }
    console.log("contador terminado")
}

const numero = contadorSimple(3)