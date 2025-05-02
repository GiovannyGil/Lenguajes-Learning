/**
 * ingresar un número entero positivo y luego calcule la suma de sus dígitos. Por ejemplo, si el usuario ingresa el número 123, el programa debería devolver 6 (1 + 2 + 3).
 */
const numero = 155

function SumaDigitos(numero){
    let suma = 0;

    while(numero > 0){
        suma += numero % 10;
        numero = Math.floor(numero / 10);
    }
    return suma;


}

const mostrar = SumaDigitos(numero)
console.log(mostrar);