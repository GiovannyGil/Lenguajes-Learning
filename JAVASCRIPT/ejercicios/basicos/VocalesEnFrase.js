/**
 * ingresar una frase y cuente cuántas vocales (a, e, i, o, u) contiene la frase. El programa debe mostrar el total de vocales en la consola.
 */

const frase = 'Hola'

function Vocales(frase){
    let totalVocales = 0
    let FraseToArray = frase.split("")
    const vocales = ['a', 'e', 'i', 'o', 'u']
    let vocalesIn = []

    FraseToArray.forEach(element => {
        if(vocales.includes(element.toLowerCase())){
            totalVocales += 1
            vocalesIn.push(element.toLowerCase())
        }
    });
    
    console.log(`la cantidad de vocales es: ${totalVocales}`);
    console.log(`las vocales son: ${vocalesIn}`);
}

Vocales(frase)