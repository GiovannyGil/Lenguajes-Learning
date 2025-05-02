// el medoto isArray hace la verificacion de el parametro es un array

// verificar si un array es un array
console.log(Array.isArray([1, 3, 5]));
// Expected output: true

// parar un 'array' vacio
console.log(Array.isArray('[]'));
// Expected output: false

// crear un array y validarlo
console.log(Array.isArray(new Array(5)));
// Expected output: true

// la siguiente linea hace una instancia int
console.log(Array.isArray(new Int16Array([15, 33])));
// Expected output: false

// pasarle un array por parametro 
const Numbers = [1,2,3,4,5,6,7,8,9,0]
console.log(Array.isArray(Numbers))
// Expected output: true