// acceder a la seccion del producto
const producto = document.getElementById('producto')
// dentro de la seccion, utilizar un query selector para encontrar el elemento con la clase (producto__imagen)
const productoIMG = producto.querySelector('.producto__imagen')
// acceder a las thumbs/miniaturas
const thumbs = producto.querySelector('.producto__thumbs')


/***
 * acceder a las imagenes del costado, para que se vean en el campo principal
*/

// agregar un evento click a las thumbs, para detectar el click
thumbs.addEventListener('click', (e) => {
    // si el elemento clickeado es una imagen, hacer lo sigiente
    if(e.target.tagName === 'IMG'){
        const imagenSRC = e.target.src // obtener la url de la imagen clickeada
        // obtener el index de la ultima diagonal
        const lastIndex = imagenSRC.lastIndexOf('/')
        // cortar la cadena despues del lastIndex => nombre de la imagen
        const NombreImagen = imagenSRC.substring(lastIndex + 1) // 'nombreimg.jpg'

        // acceder a la imagen(ruta) para reemplazar la original por la imagen clickeada
        productoIMG.src = `./img/tennis/${NombreImagen}`
    }
})


/***
 * acceder a los colores y cambiar la imagen al presional un color en el campo principal
*/

// acceder a la propiedad color con el id
const propiedadColor = producto.querySelector('#propiedad-color')
propiedadColor.addEventListener('click', (e) => {
    // si el elemento al que se le da click, es un input, mostrar la informacion solitada
    if(e.target.tagName === 'INPUT') {
        productoIMG.src = `./img/tennis/${e.target.value}.jpg`
    }
})


/**
 * Botones de la cantidad (+) (-) y bloqeuar una cantidad (no poder cambiar la cantidad al bloqeuar el input)
 *
*/

// acceder a los botones
const btnDisminuirCantidad = producto.querySelector('#disminuir-cantidad')
const btnIncrementarCantidad = producto.querySelector('#incrementar-cantidad')
// acceder al input cantidad
const inputCantidad = producto.querySelector('#cantidad')

btnIncrementarCantidad.addEventListener('click', (e) => {
    // tomar el valor de input, e inmcrementar la cantidad de 1 en 1
    inputCantidad.value = parseInt(inputCantidad.value) + 1 
})

btnDisminuirCantidad.addEventListener('click', (e) => {
    if(parseInt(inputCantidad.value) > 1 ){
        // tomar el valor de input, e inmcrementar la cantidad de 1 en 1
        inputCantidad.value = parseInt(inputCantidad.value) - 1 
    }
})

