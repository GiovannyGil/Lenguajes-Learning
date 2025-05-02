/**
 * Crea un programa que genere una lista de números pares del 2 al 20 (inclusive) y luego imprima esta lista.
 */

const hasta = 20
const lista = []
function generar(hasta, lista){
    for (let i = 0; i <= hasta; i++) {
        if  (i % 2 == 0) {
            lista.push(i)
        }

    }
    console.log(lista);
}

generar(hasta, lista)