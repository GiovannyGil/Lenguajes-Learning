/**
 * Funciones
 * 
 * en las funciones se recomienda usar el tipo de dato de retorno, asi como el tipo de dato de los parametros
 * 
 * las funciones infieren el tipo de dato de retorno, pero es recomendable definirlo explicitamente
 */


// funcion sencilla de tipo string
function Saludar(name: string){
    console.log(`Hola ${name}`);
}

Saludar('Juan');


// funcion usando un objeto como parametro v1
function Saludar2({name, age}: {name: string, age: number}){
    console.log(`Hola ${name}, tienes ${age} años`);
}
// funcion usando un objeto como parametro v2
function Saludar3(persona: {name: string, age: number}){
    console.log(`Hola ${persona.name}, tienes ${persona.age} años`);
}


// funcion indicando el tipo de dato de retorno
function Saludar4(name: string): string{
    return `Hola ${name}`;
}

// --------------------------------------------- //

/**
 * Funciones con funciones como parametros
 * 
 * Una funcion puede recibir como parametro otra funcion, que ambas funciones tengan el mismo tipo de dato de retorno
 */

const FuncionFromFuncion = (fn: (name: string)=> void) => {
    fn('Giovanny');
}

const DiHola = (name: string): void => {
    console.log(`Hola ${name}`);
}

FuncionFromFuncion(DiHola);


// --------------------------------------------- //
/**
 * Funciones con tipo de dato de retorno
 */

function Sumar(a: number, b: number): number{
    return a + b;
}
console.log(Sumar(5, 5));

/**
 * Funciones never
 * 
 * - Es un tipo de dato que nunca retorna un valor
 */

function MiError(mensaje: string): never{
    throw new Error(mensaje);
}