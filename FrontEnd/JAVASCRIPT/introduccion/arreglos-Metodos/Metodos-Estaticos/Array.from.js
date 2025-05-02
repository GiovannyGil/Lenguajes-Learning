// crea un nuevo array de acuerdo al valor/parametro pasado y una funcion de asi requerirlo

console.log(Array.from('foo'));
// Expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], (x) => x + x));
// Expected output: Array [2, 4, 6]
// lo que hace, es crear un nuevo array, donde a cada elemento le suma su mismo valor -> 1+1 = 2, 2+2 = 2, 3+3 = 6

const number = '12355'
console.log(Array.from(number));
// Expected output: Array ["1", "2", "3", "5", "5"]

/* no recibe valores numericos 
    Para trabanar con valores numericos hay que hacer conversion de tipos
*/

const number2 = 12345 // -> number
console.log(Array.from(String(number), Number)) // se le pasa el numero (convertido en string o como string) y convertirlo a Number