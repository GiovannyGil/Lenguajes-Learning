/**
 * Encontrar el número mayor:
 * Escribe una función que reciba un array de números y devuelva el número más grande del array.
 */

const ArrayNumeros = [4,5,2,7,1]
function encontrarMayor(arrayNumeros) {
    let mayor = arrayNumeros[0];
    for (let i = 0; i < arrayNumeros.length; i++) {
        if (arrayNumeros[i] > mayor) {
            mayor = arrayNumeros[i];
        }
    }
    return mayor;
}
console.log(encontrarMayor(ArrayNumeros)); // 7
