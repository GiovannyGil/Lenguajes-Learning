/**
 * ingresar una frase y luego ordene alfabéticamente todas las palabras de la frase. 
 * El programa debe mostrar la lista de palabras ordenadas alfabéticamente.
 */


const frase = "El Perro Corre Rápido"

function FraseAlfabetica(frase){
    const nuevaFrase = frase.split(' ')

    console.log(nuevaFrase)
   
    const ordenado = nuevaFrase.sort((a, b) => a.localeCompare(b))

    console.log(ordenado)
}

FraseAlfabetica(frase)