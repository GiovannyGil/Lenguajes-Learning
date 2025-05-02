/**
 * Array.reduce
 * 
 * ejecuta una función de devolución de llamada "reduce/reductora" proporcionada por el usuario en cada elemento de la matriz, en orden, pasando el valor de retorno del cálculo en el elemento anterior.
 * El resultado final de ejecutar el reductor en todos los elementos de la matriz es un valor único.
 * 
 * La primera vez que se ejecuta la devolución de llamada no hay "valor de retorno del cálculo anterior". Si se proporciona, se puede utilizar un valor inicial en su lugar.
 * De lo contrario, el elemento de la matriz en el índice 0 se utiliza como valor inicial y la iteración comienza desde el siguiente elemento (índice 1 en lugar de índice 0).
 * 
 * 
 * en otras palabras lo que hace es hacer una "suma/iteracion" de los elementos "numericos" del array, dando como valor unico el resultado de la misma
 *
 */

const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);

console.log(sumWithInitial);
// Expected output: 10
