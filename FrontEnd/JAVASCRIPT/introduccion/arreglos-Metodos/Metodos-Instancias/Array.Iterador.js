/**
 * Array.prototype[@@iterator]()
 * 
 * Es un metodo que sirve para iterar un array (recorrerlo justo a un ciclo for)
 */



const array1 = ['a', 'b', 'c'];
const iterator1 = array1[Symbol.iterator]();

for (const value of iterator1) {
  console.log(value);
}

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"


const Frutas = ['Fresas', 'Manzanas', 'Peras', 'Uvas']
const i = Frutas[Symbol.iterator]()

for (const value of i){
  console.log(value)
}

// Expected output: "Fresas"
// Expected output: "Manzanas"
// Expected output: "Peras"
// Expected output: "Uvas"