/**
 * ARRAYS
 */


// forma 1 para definir
let numbers: number[] = [1,2,3,4,5];

// forma 2 para definir
let listaDeNumeros: Array<number> = [1,2,3,4,5];

/**
 * Metodos
 * 
 * push -> es un metodo para agregar al final de un array
 * listaDeNumeros.push(1)
 * 
 * Eliminamos el último elemento del array:
 * heroes.pop();
 * 
 * en general sirven los mismos metodos que en los array de js
 */

/**
 * Arrays de solo lectorua -> readonly
 * 
 * no se permite usar metodos en ellos, ya que solo se pueden llamar para leer, nada de push, remove, etc
 */
const names: readonly string[] = ["Aitor"];
// names.push("Jesús"); //Error: Property "push" does not exist on type "readonly string[]".
// Try removing the readonly modifier and see if it works?