/**
 * While
 * permite hacer ciclos de forma determinada o indeterminada
 */


let contador = 0
while (contador <= 10) { // MIENTRAS contador sea menor o igual a 10 ejecute este ciclo
    console.log(contador)
    contador++ // contador = contador +1 -> incremento
}


/**
 * Do Wihle
 * similar al while, pero el ciclo siempre se ejecuta por lo menos una vez
 */

let i = 0
do { // entra sin condición
    console.log(i)
    i++ // i = i + 1
} while (i <= 10); // condición, solo repite el ciclo si cumple la condición