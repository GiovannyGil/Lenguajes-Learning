// crea un arreglo/array apartir de un numerio indeterminado de argumentos/datos, sin importar la cantidad o el tipo
// esto implicaria crear un array vacio, si no se le pasan parametros

// ejemplos
Array.of(1); // [1]
Array.of(1, 2, 3); // [1, 2, 3]
Array.of(undefined); // [undefined]


const nombre = 'Gio'
const edad = 21
const pais = 'Colombia'
const hobbies = ['leer', 'programar', 'viajar']

console.log(Array.of(nombre, edad, pais, hobbies))
// Expected output: ["Gio", 21, "Colombia", Array(3)] or Array ["Gio", 21, "Colombia", Array ["leer", "programar", "viajar"]]