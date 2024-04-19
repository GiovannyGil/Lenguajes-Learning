/**
 * Arrays
 * 
 * Los arrays son estructuras de datos que nos permiten almacenar varios valores y agruparlos.
 */

// Array de tipo string

let lenguajes: string[] = []

lenguajes.push('JavaScript');
lenguajes.push('TypeScript');
lenguajes.push('PHP');
lenguajes.push('Java');

console.log(lenguajes); // [ 'JavaScript', 'TypeScript', 'PHP', 'Java' ]

// Array de tipo number
let numeros: number[] = [1, 2, 3, 4, 5];

console.log(numeros); // [ 1, 2, 3, 4, 5 ]


// Array de tipo string y number
let varios: (string | number)[] = [];

varios.push('Hola');
varios.push(1);
varios.push('Mundo');
varios.push(2);

console.log(varios); // [ 'Hola', 1, 'Mundo', 2 ]

/**
 * MATRICES
 * 
 * Una matriz es un array de dos dimensiones, es decir, un array que contiene otros arrays.
 */

// tipo de contenido que puede tener una celda de la matriz
type CellValue = 'X' | 'O' | '';

// tipo para definir el tamaño

// Row es un array de tipo CellValue "3*3"
// matriz de tuplas
type Row =  [
[CellValue, CellValue, CellValue],
[CellValue, CellValue, CellValue],
[CellValue, CellValue, CellValue]
];

// matriz de tipo Row
const gameBoard: Row = [
    ['X', 'O', 'X'],
    ['O', 'X', 'O'],
    ['X', 'O', 'X']
];


/**
 * TUPLAS
 * 
 * Una tupla es un array de elementos que están tipados. Es decir, se conoce el tipo de dato de cada uno de los elementos que forman un array.
 * 
 * el un arrar que tiene un limite fijo de longitud
 */

const persona: [string, number] = ['Juan', 25];

console.log(persona); // [ 'Juan', 25 ]


// ---------------------------------------------------------- //

/**
 * ENUMS
 * 
 * Los enums son un tipo de dato que permite definir un conjunto de constantes con nombre.
 * 
 * para una coleccion de datos finitos/limitados
 */

// enum de errores

const enum ERROR_TYPES {
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDDEN
}

function mostrarMensaje (tipoDeError: ERROR_TYPES) {
    if (tipoDeError === ERROR_TYPES.NOT_FOUND) {
        console.log('No se ha encontrado el recurso');
    } else if (tipoDeError === ERROR_TYPES.UNAUTHORIZED) {
        console.log('No tienes permisos para acceder');
    } else if (tipoDeError === ERROR_TYPES.FORBIDDEN) {
        console.log('No tienes permisos para acceder');
    }
}

/**
 *  Aserciones de tipo
 */

const canvas = document.getElementById('canvas')


if (canvas instanceof HTMLCanvasElement) { // TS deduce que canvas es una intancia de tipo HTMLCanvasElement
    // canvas es de tipo HTMLElement
    const ctx = canvas.getContext('2d'); // canvas es de tipo HTMLCanvasElement <--- forma correcta de hacer la asercion de tipos
}

/**
 * Fetching de datos
 * 
 * Fetch es una API que nos permite hacer peticiones HTTP desde el navegador.
 */

// fetch('https://jsonplaceholder.typicode.com/users')


// ---------------------------------------------------------- //