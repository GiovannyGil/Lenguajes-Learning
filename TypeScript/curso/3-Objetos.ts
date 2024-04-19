/**
 * OBJETOS
 * 
 * Los objetos son una colección de propiedades, y una propiedad es una asociación de key (nombre, o clave) y valores.
 * 
 * - typeAlias: es una forma de definir un tipo de dato, que puede ser usado en cualquier parte del codigo
 * 
 * - Optional Properties: son propiedades que pueden o no estar en el objeto, se definen con el signo de interrogacion (?)
 * 
 * - Readonly Properties: son propiedades que no pueden ser modificadas despues de ser creadas, se definen con la palabra reservada "readonly"
 * 
 * - template union type: es una forma de definir un tipo de dato, que puede ser de varios tipos de datos
 * 
 * - Intersection Types: es una forma de definir un tipo de dato, que puede ser de varios tipos de datos
 * 
 * - Type Indexing: es una forma de definir un tipo de dato, que puede ser de varios tipos de datos
 */

let myHero = {
    name: 'Superman',
    age: 30,
    powers: ['Super fuerza', 'Volar', 'Super velocidad'],
    getName(){
        return this.name;
    }
}

type HeroID = `${string}-${string}-${string}-${string}`; // template union type -> usar este tipo(objeto) de dato en el id del objeto Hero

type HeroPowerScale = 'local' | 'planetary' | 'galactic' | 'universal' | 'multiversal' // puede ser local o planetary o galactic o universal o multiversal

type HeroBasicInfo = {
    name: string,
    age: number,
}

// Type Alias - Definir un tipo de dato(objeto)
type HeroProperties = {
    readonly id?: HeroID, // solo lectura, con template union type, el id es de tipo HeroID
    isActive?: boolean, // optional property "?"
    powerScale?: HeroPowerScale, // opcional y con template union type
}

type Hero = HeroBasicInfo & HeroProperties; // Intersection Types -> Hero es de tipo HeroBasicInfo y HeroProperties

// Objetos con Type Alias -> el objeto hero es de tipo Hero
let hero: Hero = {
    name: 'Batman',
    age: 30,
}

// funcion que crea un hero, de tipo Hero, con el tipo de dato HeroBasicInfo como parametro y genera un id aleatorio y demas propiedades para el Hero
function createHero(input: HeroBasicInfo): Hero{
    const {name, age} = input;
    return {
        id: crypto.randomUUID(), // crea un id aleatorio de tipo string
        name,
        age,
        isActive: true
    }
}

// usar funcion
const thor = createHero({name: 'Thor', age: 1500}); // crea el hero con el tipo de dato Hero, que permite que use todas sus propiedades en caso de que el tipo cambie, cresca o disminuya

thor.powerScale = 'universal'; // asignar una propiedad al objeto thor



// --------------------------------------------- //


// otro tipo(objeto) -> type indexing
type Ubicacion = {
    planeta: string,
    pais: string,
    estado: {
        departamento: string,
        ciudad: string,
    }
}

const ubicacion: Ubicacion['estado'] = {
    departamento: 'Antioquia',
    ciudad: 'Medellin'
}

// type from value
const address = {
    departamento: 'Antioquia',
    ciudad: 'Medellin',
}

type Address = typeof address; // type from value -> el tipo de dato Address es el tipo de dato del objeto address

const addressHOME: Address = {
    departamento: 'Antioquia',
    ciudad: 'Medellin',
} // addressHOME es de tipo Address, que es el tipo de dato del objeto address

// --------------------------------------------- //
