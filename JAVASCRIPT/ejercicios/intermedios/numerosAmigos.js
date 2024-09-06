/**
 *  Dos números se consideran "amistosos" si la suma de los divisores propios del primer número es igual al segundo número y viceversa. 
 * Los divisores propios de un número son todos los divisores del número, excluyendo al propio número.
 */

const numero1 = 1184
const numero2 = 1210

function NumeroAmigos(numero1, numero2){
    let contador1 = 0
    let contenedor1 = []
    let contador2 = 0
    let contenedor2 = []

    for (let i = 0; i < numero1; i++) {
        if(numero1 % i == 0){
            contenedor1.push(i)
            contador1 = contador1 + i
        }
    }

    for (let j = 0; j < numero2; j++) {
        if(numero2 % j == 0){
            contenedor2.push(j)
            contador2 = contador2 + j
        }
    }

    // mostrar
    console.log(`numero 1 = ${numero1} suma de divisores ${contador1} el contenedor es ${contenedor1}`)
    console.log(`numero 2 = ${numero2} suma de divisores ${contador2} el contenedor es ${contenedor2}`)

    if (contador1 == numero2 && contador2 == numero1){
        console.log(` los números ${numero1} y ${numero2} son números amigos`);
    } else {
        console.log(` los números ${numero1} y ${numero2} no son números amigos`)
    }
}

NumeroAmigos(numero1, numero2)