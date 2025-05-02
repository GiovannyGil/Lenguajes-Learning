/**
 * ForEach
 * permite recorrer arreglos para mostrar elementos
 */


const amigos = ['Carlos','Cristian', 'Estefania','Erika','Maniel','Laura']


amigos.forEach((amigos, index) => {
    console.log(`El amigo numero ${index} es: ${amigos}`)
})


/**
 * forIn
 * recorrer las propiedades de un objeto
 */

const persona = {
    nombre: 'Carlos',
    edad:27,
    correo: 'correo@correo.com',
}

for (const propiedad in persona) {
    persona[propiedad] = '' // sobreescribir los valores
}


/**
 * forOf
 * recorrer las valores de un objeto iterable como, objetos, arrays, texto, colecciones etc 
 */


const etiquetas = document.head.children

for (const etiqueta of etiquetas) {
    console.log(etiqueta)
} // recorrer los valores de etiquetas
// o transformar en un arreglos y trabajar foreach
[...etiquetas].forEach((Elemento)=>console.log(Elemento)) // lo mismo que el for of