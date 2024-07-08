// acceder a la galeria, para agregarle el evento

const galeria = document.getElementById('galeria') // seleccionar/acceder la seccion de galeria

// importar la funcion de cerrar galeria
import cerrarGaleria from "./cerrar-galeria"
// importar la funcion de slideClick
import slideClick from "./slideClick"

// agregar el evento
galeria.addEventListener('click', (e) => {
    const botton = e.target.closest('button') // acceder al boton que se ha hecho click

    // buscat y comprobar si el boton tiene un atributo personalizado, "dataset" = accion -> cerrar-galeria
    if(botton?.dataset?.accion === 'cerrar-galeria'){
        cerrarGaleria() // ejecutar la funcion de cerrar galeria
    }

    // carrusel slide click -> detectar el click en el carrusel
    if(e.target.dataset.id){
        slideClick(e)
    }
})