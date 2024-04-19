// crear primer hola mundo con TypeScript
console.log('Hola Mundo con TypeScript')  // Hola Mundo con TypeScript

let nombre: string = 'Gio'  // variable de tipo string
let edad: number = 21  // variable de tipo number



// control de flujo

// if (condicional)

if (edad >= 18) {
    console.log('Eres mayor de edad');
} else {
    console.log('Eres menor de edad');
}

// funciones

// TIPO DE DATO DE RETORNO DE LA FUNCION -> void(vacio) = no retorna nada
function myFunction(): void {
    console.log('My Function');
}
myFunction();  // My Function

// TIPO DE DATO DE RETORNO DE LA FUNCION -> string
function myFunction2(): string { 
    // el tipo de dato de retorno de la funcion debe ser el mismo que el tipo de dato de la variable que la recibe

    return 'My Function 2';
}
console.log(myFunction2());  // My Function 2

// TIPO DE DATO DE RETORNO DE LA FUNCION -> number (con parametros)
// los parametros tambien deben estar tipados
function suma(num1: number, num2: number): number { 
    // el tipo de dato de retorno de la funcion debe ser el mismo que el tipo de dato de la variable que la recibe

    return 3;
}
console.log(suma(1, 2));  // 3


// listas

// lista de numeros = array de tipo number
let myList: Array<number> = [1, 2, 3, 4, 5]; 

// lista de strings = array de tipo string
let myList2: Array<string> = ['a', 'b', 'c', 'd', 'e'];  

let MySet = new Set([1, 2, 3, 4, 5, 3]);  // set de tipo number
console.log(MySet);  // Set(5) { 1, 2, 3, 4, 5 } // los set no permite duplicados

// Mapas => estructura de clave: valor

// mapa de tipo string, number (clave:string, valor:number)
let myMap: Map<string, number> = new Map([['a', 1], ['b', 2], ['c', 3]]);
console.log(myMap);  // Map(3) { 'a' => 1, 'b' => 2, 'c' => 3 }


// bucles

// bucle for -> permite acceder a todos los elementos de una lista/array/set/mapa etc...
for (const value of myMap) {
    console.log(value);  // 1 2 3 4 5
}

// forEach -> permite acceder directamente a todos los elementos de una lista/array/set/mapa etc...
myList2.forEach((value) => {
    console.log(value);  // 1 2 3 4 5
});


// bucle while -> se ejecuta mientras se cumpla una condición
let count: number = 0; // iniciar contador en 0

while (count < myList.length) {
    console.log(myList[count] );  // 1 2 3 4 5
    count++;
}


// clases
// las clases son plantillas para crear objetos
// las clases pueden tener propiedades y metodos

class Persona {
    nombre: string;
    edad: number;

    // instaciar la clase con valores por defecto
    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }
    // metodo contructor = se ejecuta cuando se instancia la clase
}

// llamar la clase y dar valores
let persona: Persona = new Persona('Gio', 21);
console.log(persona);  // Persona { nombre: 'Gio', edad: 21 }
// acceder a las propiedades de la clase
console.log(persona.nombre);  // Gio