/**
 * Operador Spread
 * permite tomar los objetos de un arreglo y objeto y expandirlos en otro sitio
 */
const frutas = ['Manzana','Pera','Piña','Melon']
const comidaFav = ['Pizza','Hamburg', ...frutas]
console.log(comidaFav)

const datosLogin = {
    correo:'correo@correo.com',
    contraseña:'123'
}

const user = {
    nombre: 'Carlos',
    edad: 27,
    ...datosLogin, // OPERADOR SPREAD
}

/**
 * Operador Rest
 * permite que una funcion contenga un numero indefinido de parametros, los parametros extra que encuentre los convertirá en un arreglo
 * 
 * 
 */

const registrarUser=(nombre,correo, ...datosAdicionales)=>{
    console.log(nombre,correo,datosAdicionales)
}
registrarUser('Carlos','correo@correo.com', 28,'España')


/**
 * Destructuración de objetos
 *  permite obtener los valores de un arreglo u objeto como si fueran varaibles 
 */
const amigos = ['ALejandro', 'Cesar', 'Manuel']

const [primerA, segundoA, tercerA] = amigos
console.log(segundoA)

const persona = {
    nombre: 'Carlos',
    edad: 27,
    pais: 'Mexico'
}
const {nombre,edad,pais}=persona
console.log(nombre,pais)


const mostrarEdad = ({nombre,edad}) => {
    console.log(`${nombre} tiene ${edad} años`)
}

mostrarEdad(persona)