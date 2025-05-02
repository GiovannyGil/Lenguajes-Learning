/**
 * ingresar un número entero positivo 𝑛 y luego genere y muestre la tabla de multiplicar de ese número del 1 al 10
 */


const numero = 2

function TablaMultiplicar(numero){
    for (let i = 0; i <= 10; i++) {
        console.log(`${i} * ${numero} = ${i*numero} `);
    }
}

TablaMultiplicar(numero)