/**
 * Variables, Tipos de DATPS e Inferencia de datos
 * 
 * - Inferencia de datos: es la capacidad de TypeScript de deducir el tipo de una variable en base al valor que se le asigna, sin necesidad de dar el tipo de datos explícitamente.
 * 
 * 
 * - Una recomendacion es no usar el tipo de dato, ya que se infiere automaticamente
 */

let nombre = 'Juan'; // inferencia de datos -> nombre es de tipo string
let edad = 25; // inferencia de datos -> edad es de tipo number

const PI = 3.14; // inferencia de datos -> PI es de tipo number

let estaCasado = true; // inferencia de datos -> estaCasado es de tipo boolean



// tipo any: es una varible que puede contener cualquier tipo de dato, pero no infiere el tipo de dato -> tipo de dato dinamico -> no se recomienda usarlo -> tipoDesconocido

let tipoDesconocido: any = 'Hola';
tipoDesconocido = 25;
tipoDesconocido = true;
// no se recomienda usarlo

// tipo unknown: es un dipo de datos desconocido(que no sabemos cual es el tipo de dato que lleva) -> no infiere

let tipoDesconocido2: unknown = 'Hola';

