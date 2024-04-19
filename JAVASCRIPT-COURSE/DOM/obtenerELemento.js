/**
 * getElementById
 * Permite obtener un elemento "HTML" mediante su atributo ID
 */


const contenedor1 = document.getElementById('contenedor1')

/**
 * children
 * permite obtener los elementos hijos de un elemento/objeto
 */
console.log(contenedor1.children)

/**
 * parentELemento
 * permite obtener el elemento padre de un elemento/objeto
 */

console.log(contenedor1.parentElement)


/**
 * getElementByTagName
 * permite obtener elementos mediante las etiquetas
 * ejemplo. obtener todos los elementos "div","a","i" ...
 * 
 * 
 * estos tienen propiedades como length etc ...
 */

const divs = document.getElementsByTagName('div')
console.log(divs)



/**
 * getElementByClassName
 * obtener los elementos en base a su clase
 */

const contenedores = document.getElementsByClassName('contenedor')
console.log(contenedores)


/**
 * querySelector
 * obtener el primer elemento que coincide con un selector estilo css
 */
const caja = document.querySelector('#contenedor1 .caja')
console.log(caja)

/**
 * querySelectorAll
 * obtener todos los elementos que coinciden con un selector estilo css
 */
const cajas = document.querySelectorAll('#contenedor1 .caja')
console.log(cajas)


/**
 * closest
 * permite buscar de adentro hacia afuera de una elemento/objeto
 */


const ultimaCaja = document.querySelector('#contenedor2 .caja:last-child')
console.log(ultimaCaja)
console.log(ultimaCaja.closest('.contenedor-principal'))


/**
 * se pueden encadenar todos los métodos visto aquí
 */
const contenedor2 = document.getElementById('contenedor2')
console.log(contenedor2.querySelectorAll('.caja'))