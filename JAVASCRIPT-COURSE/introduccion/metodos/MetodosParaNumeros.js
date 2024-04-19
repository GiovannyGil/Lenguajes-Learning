/* toString 
transformar un valor de tipo numero a un valor de tipo string
*/
const num1 = 10
console.log(num1, typeof num1) // variable de tipo numero
const text = num1.toString()
console.log(text, typeof text) // variable convertido a string

/*
toFixed me permite obtener un numero con una cantidad de numeros decimales especificados
*/
const pi = 3.141592653589793
console.log(pi.toFixed(2)) // 3.14



/**
 * parseInt transforma una cadena de texto a un valor numérico
 */
const NumText = '10';
console.log(parseInt(NumText)) // 10 -> convertido en Number


/**
 * parseFloat transforma un cade de texto a un valor numérico decimal
 */

const DecText = '10.10';
console.log(parseFloat(DecText)) // 10.10 -> convertido en Decimal


/**
 * Math.random, permite generar un número al azar entre 0 y 1
 */

const numero = Math.random()
console.log(numero)


/**
 * Math.floor permite redondear un numero decimal hacia abajo
 */
const numero2 = 10.1
console.log(Math.floor(numero2)) // 10

/**
 * Math.ceil permite redondear un numero decimal hacia arriba
 */
const numero3 = 10.1
console.log(Math.floor(numero3)) // 11


/**
 * Math.round, redondea un decimal al entero más cercano, sea arriba o abajo
 */
const numero4 = 10.56
console.log(Math.floor(numero4)) // 11


const randomNum = Math.random()
console.log(Math.floor(randomNum * 101)) // números al azar entre el 0 y el 100