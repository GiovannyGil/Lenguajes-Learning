/**
 * Suma de array:
 * Crea una función que reciba un array de números como parámetro y devuelva la suma de todos los elementos del array.
 */

const numeros = [1,2,3,4,5]

const inicial = 0
// metodo (.reduce()) para sumar los valores numericos de un array mediante un callback
const sumaArray = numeros.reduce((acumulator, currentValue) => acumulator + currentValue, inicial)
console.log(sumaArray) // => 15