/**
 * ingresar un número y determine si ese número es primo o no. Un número primo es aquel que solo tiene dos divisores: 1 y él mismo
 * 
 */

// Ingresar un número
const numero = 15


function NumeroPrimo(numero){
    let contador = 0
    for(let i = 1; i <= numero; i++){
        if(numero % i == 0){
            contador++
        }
    }
    if(contador == 2){
        console.log(`El número ${numero} es primo`)
    }else{
        console.log(`El número ${numero} no es primo`)
    }
}


NumeroPrimo(numero)