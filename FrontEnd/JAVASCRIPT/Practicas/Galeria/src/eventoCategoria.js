const contenedorCategorias = document.getElementById('categorias') // seleccionar/acceder el contenedor de categorias

// Acceder a la seccion "galeria"
const galeria = document.getElementById('galeria') // seleccionar/acceder la seccion de galeria

// acceder a la informacion de las fotos
import dataFotos from './data/fotos'
import { cargarImagen } from './galeria/cargarImagen'



// agregar un eveneto
contenedorCategorias.addEventListener('click', (e) => {
    e.preventDefault() // prevenir el comportamiento por defecto del navegador
    console.log(e.target.closest('a')) // ver el elemento que se ha hecho click, buscando de abajo hacia arriaba, arrontrando el elemento que cumpla con la condicion. sino encuentra el elemento retorna null

    // si el elemento que se ha hecho click es un enlace, ejecuta el siguiente codigo
    if(e.target.closest('a')){
        console.log('EJECUTANDO EL CODIGO...')

        // abrir la galeria
        galeria.classList.add('galeria--active') // agregar una clase al elemento, para que abra la galeria
        document.body.style.overflow = 'hidden' // ocultar la barra de desplazamiento


        // acceder a la categoria activa, a la que se le dio click
        const categoriaActiva = e.target.closest('a').dataset.categoria

        // acceder a la categoria y darle un atributo personalizado, que es la categoria activa
        galeria.dataset.categoria = categoriaActiva

        // acceder a las fotos de la categoria activa
        const fotos = dataFotos.fotos[categoriaActiva] 

        // accdeder al carrucel y limpiarlo (eliminar el contenido/slides)
        const carrucel = galeria.querySelector('.galeria__carousel-slides')

        // acceder a la primera foto, y deestructurarla
        const {id,nombre,ruta,descripcion} = fotos[0] // acceder a la primera foto de la categoria activa
        
        // cargar la imagen al abrir la galeria
        cargarImagen(id,nombre,ruta,descripcion) // cargar la imagen por defecto, pasarle los parametros de la primera foto

        // acceder al carrucel y dejarlo en blanco (sin contenido)
        carrucel.innerHTML = ''

        // agregar las fotos al carrusel / slide al abrir la categoria
        fotos.forEach((foto) => {
            const slides = `
                <a href="#" class="galeria__carousel-slide">
					<img class="galeria__carousel-image" src="${foto.ruta}" data-id="${foto.id}" alt="" />
				</a>
            `

            // acceder al carrusel
            galeria.querySelector('.galeria__carousel-slides').innerHTML += slides // agregar los slides al carrusel
        })

        galeria.querySelector('.galeria__carousel-slides').classList.add('galeria__carousel-slides--active') // agregar una clase al carrusel para que se muestre
        
    }



})