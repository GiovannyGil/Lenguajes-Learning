/**
 * Array.values()
 * 
 * es un metodo iterador, que crea un nuevo array iterado que muestra los valores del array (funciona como un for)
 */

const array1 = ['a', 'b', 'c'];
const iterator = array1.values();

for (const value of iterator) {
  console.log(value);
}

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"
