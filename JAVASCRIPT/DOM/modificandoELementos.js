/**
 * elemento.innerHTML
 * permite cambiar/sobre escribir el contenido HTML de un elemento
 */

const primeraCaja = document.querySelector('.caja')
primeraCaja.innerHTML = '<b>CAJA MODIFICADA</b>' //

/**
 * elemento.attribute
 * nos permite acceder y cambiar atributos del elemento
 * 
 * muchos atributos: id,src, etc...
 */

primeraCaja.id = 'nuevo-id'


/**
 * elemeto.setAttribute
 * permite agregar o cambiar el valor de un atributo del elemento
 */
primeraCaja.setAttribute('clases','caja activa')
primeraCaja.setAttribute('data-id','dataId')

/**
 * elemento.style.property
 * permite cambiar los estilos css de un elemento
 */

const contenerdor2caja1 = document.querySelector('#contenedor2 .caja');contenerdor2caja1.style.backgroundColor = '#000000'
contenerdor2caja1.style.color = '#fff'
contenerdor2caja1.style.textTransform = 'uppercase'

