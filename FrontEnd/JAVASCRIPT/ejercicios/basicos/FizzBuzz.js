/**
 * Escribe un programa en JavaScript que imprima los números del 1 al 100. Pero para múltiplos de 3, en lugar del número, debe imprimir "Fizz". 
 * Para múltiplos de 5, debe imprimir "Buzz". Para números que son múltiplos de ambos 3 y 5, debe imprimir "FizzBuzz".
 */

const limite = 100

function FizzBuzz(numero) {
    if(numero > 0){
        for(let i = 1; i <= 100; i++){
            if(i % 3 == 0 && i % 5 == 0){
                console.log(i, 'FizzBuzz')
            } else if(i % 3 == 0) {
                console.log(i, 'Fizz');
            } else if(i % 5 == 0) {
                console.log(i, 'Buzz');
            } else {
                console.log(i);
            }
        }
    }
}

const mostrarFunction = FizzBuzz(limite)