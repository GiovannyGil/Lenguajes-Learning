
function Palindromo(palabra) {
    // Invertir la cadena
    let entradaInvertida = palabra.split('').reverse().join('');

    if(palabra === entradaInvertida){
        console.log(`la palabra ${palabra} es un palindromo, palabra invertida ${entradaInvertida}`)
    } else {
        console.log(`la palabra ${palabra} no es un palindromo, palabra invertida ${entradaInvertida}`);
    }
}


const palabra = 'hannah'

const enviar=Palindromo(palabra)