/**
 * Implementa una función que reciba una lista de números enteros y devuelva una nueva lista con los números primos que aparecen en la lista original. 
 * Si no hay números primos en la lista original, la función debe devolver una lista vacía.
 */


function listaPrimos(lista) {
    let listaPrimos = [];
    for (let i = 0; i < lista.length; i++) {
        if (esPrimo(lista[i])) {
            listaPrimos.push(lista[i]);
        }
    }
    return listaPrimos;
}
function esPrimo(num) {
    if (num < 2) {
        return false;
    }
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}
// Pruebas
console.log(listaPrimos([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])); // [2, 3, 5, 7]
console.log(listaPrimos([4, 6, 8, 9, 10])); // []
console.log(listaPrimos([1, 3, 5, 7, 9])); // [3, 5, 7]