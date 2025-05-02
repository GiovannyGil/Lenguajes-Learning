// verifica si existe un elemento (value) en una arreglo/array

const Mascotas = ["Gato", "Perro", "Loro", "Canario"]

 // true -> rectifica si existe
console.log('el elemento es: ', Mascotas.includes("Gato")) 


const numbers = [0,1,2,3,4,5,6,7,8,9]
console.log('el elemento es: ', Mascotas.includes(11)) // aunque el 1 esta, el 11 NO!

const numerTexts = ["1", "2", "3"]
console.log(numerTexts.includes(3, "2"))  // false -> Ya que estoy pasando un tipo number y el array tienen strings
// si se le pasan varios parametros, aunque halla uno falso y los demas correctos, el retorno será FALSE


// forma de hacerlo con IF
if("2" in numerTexts){
    return console.log("es correcto")
} else {
    return console.log("es incorrecto")
}