/**
 * ingresar un número entero positivo n y calcule la suma de los primeros números naturales 
 * (es decir, la suma de todos los números desde 1 hasta n). 
 * El programa debe imprimir el resultado de la suma.
 */


const numero = 5

function SumaNaturales(numero){
    // con loop
    let suma = 0
    let valorActual = 0
    for (let index = 0; index <= numero; index++) {
        valorActual = suma
        suma = index + suma
        console.log(`${valorActual} + ${index} = ${suma}`);
    }

    // sin loop
    let SumaDefinitiva = 0
    SumaDefinitiva = ( numero * (numero + 1) ) / 2
    console.log(`la suma de finitiva es: ${SumaDefinitiva}`);
}

SumaNaturales(numero)