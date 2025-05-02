// crear primer hola mundo con TypeScript
console.log('Hola Mundo con TypeScript'); // Hola Mundo con TypeScript
var nombre = 'Gio'; // variable de tipo string
var edad = 21; // variable de tipo number
// control de flujo
// if (condicional)
if (edad >= 18) {
    console.log('Eres mayor de edad');
}
else {
    console.log('Eres menor de edad');
}
// funciones
// TIPO DE DATO DE RETORNO DE LA FUNCION -> void(vacio) = no retorna nada
function myFunction() {
    console.log('My Function');
}
myFunction(); // My Function
// TIPO DE DATO DE RETORNO DE LA FUNCION -> string
function myFunction2() {
    // el tipo de dato de retorno de la funcion debe ser el mismo que el tipo de dato de la variable que la recibe
    return 'My Function 2';
}
console.log(myFunction2()); // My Function 2
// TIPO DE DATO DE RETORNO DE LA FUNCION -> number (con parametros)
// los parametros tambien deben estar tipados
function suma(num1, num2) {
    // el tipo de dato de retorno de la funcion debe ser el mismo que el tipo de dato de la variable que la recibe
    return 3;
}
console.log(suma(1, 2)); // 3
// listas
// lista de numeros = array de tipo number
var myList = [1, 2, 3, 4, 5];
// lista de strings = array de tipo string
var myList2 = ['a', 'b', 'c', 'd', 'e'];
var MySet = new Set([1, 2, 3, 4, 5, 3]); // set de tipo number
console.log(MySet); // Set(5) { 1, 2, 3, 4, 5 } // los set no permite duplicados
// Mapas => estructura de clave: valor
// mapa de tipo string, number (clave:string, valor:number)
var myMap = new Map([['a', 1], ['b', 2], ['c', 3]]);
console.log(myMap); // Map(3) { 'a' => 1, 'b' => 2, 'c' => 3 }
