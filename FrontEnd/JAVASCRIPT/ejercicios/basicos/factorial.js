/**
 * ngresar un número entero positivo y calcule el factorial de ese número. 
 * El factorial de un número 𝑛 se define como el producto de todos los números enteros positivos desde 1 hasta 𝑛
 * (es decir, 𝑛!=1×2×3×...×𝑛).
 * 
 * Ej: 5!=5×4×3×2×1=120.
 */

const numero = 5

function Factorial(numero){
    let factorial = 1
    for (let i = 1; i <= numero; i++) {
        factorial *= i
        console.log(i, factorial);
    }
    return factorial
}


const mostrar = Factorial(numero)
console.log(mostrar);