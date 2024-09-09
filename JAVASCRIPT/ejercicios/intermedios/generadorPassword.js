/**
 * escribir un script que genere una contraseña siguiendo parametros especificos
 * min 8 digitos
 * max 12 digitos
 * caracteres al azar (min, mayus, number, esciales)
 * 
 */

const minLenght = 8
const maxLenght = 12
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}'
const password = []

function passwordRandom(minLenght, maxLenght, characters, password){
    let randomCharacter 
    for (let i = 0; i < maxLenght; i++) {
        randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length))
        password.push(randomCharacter)
    }
    console.log(password);
}


passwordRandom(minLenght, maxLenght, characters, password)