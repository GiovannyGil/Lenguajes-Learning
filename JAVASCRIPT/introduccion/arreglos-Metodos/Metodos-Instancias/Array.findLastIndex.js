/**
 * Array.findLastIndex
 * 
 * este metodo retorna el indice de forma inversa (0,1,2,|3|,4) del valor que cumple con la funcion, si no encuentra, de vuelve undefined
 */


const numeros = [ 8, 12, 31, 45, 34, 61, 42, 31]


const IsLargeNumber = (element) => element > 45

const filtro = numeros.findLastIndex(IsLargeNumber)

console.log(filtro)