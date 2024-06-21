/***
 * Array.find()
 * 
 * devuelve el primer elemento del array que cumple con la condicion
 * 
 * en caso que no hayan coincidencias, se hace infinito o undefined
 */


// frutas y cantidades

const Frutas = [
    {name: "Manzana", Cantidad: 10},
    {name: "Pera", Cantidad: 20},
    {name: "Uva", Cantidad: 25},
    {name: "Mango", Cantidad: 10},
    {name: "Banano", Cantidad: 15}
]


const resultado = Frutas.find(({name}) => name === 'Mango')
console.log(resultado)
// Object { name: "Mango", Cantidad: 10 }