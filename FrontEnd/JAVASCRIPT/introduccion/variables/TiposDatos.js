
// TIPOS DE DATOS
/*
string = cadena de texto
number = valores numericos
bollean = valoreas booleanos => True(verdadero) / False(falso)
Objects = objetos
function = funciones

null = sin valor, no tenga ningun tipo de valor
undefined = valor por defecto => valor sin definir
*/


/*
string
es un tipo de datos de texto, permite usar cadenas de texto
let texto = "hsdgshdsgdshjdshd"
let texto2 = 'dsdghsdshhsdhsd'

Numbers

pisitivo = 3
negativo = -2
decimal = 1.1
etc...



Booleans
edad = 19;
mayor de edad = true;

let mayorque = 1>2; -> false;
let mayorque = 2>1; -> true;


arrays/arreglos
permiten guardan multiples valores
const arreglo = [1,2,3,4,5,6,7,8,9];
const arreglo2 = ['hola', 2, true, 'adios', {edad:19}, [1,2,3]] -> guardando muchos valores y tipos de valores

Objetos
guarda informacion en 'parejas', en propiedad y valor
{propiedad:valor}
let persona = {nombre:'Gio} -> propiedad nombre, valor -> 'Gio'
incluso dentro de un objeto, se puede tener otro objeto, y varias parejas

let personas{
    nombre: 'GIo',
    edad: 19,
    vehiculo : {
        carro:negro,
        marca:'nissan'
    },
}

*/

const personas = {
    nombre: 'Gio',
    edad: 19,
    vehiculo : {
        carro:'negro',
        marca:'nissan'
    },
}
//console.log(personas)


// Json => array de objetos
const integrantes = [
    {
        nombre:'Gio',
        apellido:'Gil',
        edad:19,
    },
    {
        nombre:'Gio',
        apellido:'Gil',
        edad:19,
    },
    {
        nombre:'Gio',
        apellido:'Gil',
        edad:19,
    },
    {
        nombre:'Gio',
        apellido:'Gil',
        edad:19,
    },

]

//console.log(integrantes)


/*
tipo dato => Finciones
son funciones que permiten reutilizar código llamando las funciones y ahorrar código

function(parametros){
    // bloque de codigo de la funcion
}


tipo null
es darle el valor a una variable o constate de nulo
let nombre = null;


tipo undefined
es un tipo de valor que no se debe usar, indica que no tiene valor
let nombre2 = undefined;
*/
