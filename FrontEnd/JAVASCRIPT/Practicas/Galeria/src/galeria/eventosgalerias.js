import { CargarAnteriorSiguienteImagen } from "./cargarImagen"
import carrusel from "./Carrusel"

// acceder a la galeria, para agregarle el evento
const galeria = document.getElementById('galeria') // seleccionar/acceder la seccion de galeria

// importar la funcion de cerrar galeria
import cerrarGaleria from "./cerrar-galeria"
// importar la funcion de slideClick
import slideClick from "./slideClick"

// agregar el evento
galeria.addEventListener('click', (e) => {
    const botton = e.target.closest('button') // acceder al boton que se ha hecho click

    // buscar y comprobar si el boton tiene un atributo personalizado, "dataset" = accion -> CERRAR-GALERIA
    if(botton?.dataset?.accion === 'cerrar-galeria'){
        cerrarGaleria() // ejecutar la funcion de cerrar galeria
    }

    // carrusel slide click -> detectar el click en el carrusel
    if(e.target.dataset.id){
        slideClick(e)
    }

    // MOVIEMIENTO DE LAS IMAGENES CON EL BOTON

    // BOTON DE SIGUIENTE IMAGEN
    // buscar el atributo "siguiente" en le dataset
    if(botton?.dataset?.accion == 'siguiente-imagen'){
        CargarAnteriorSiguienteImagen('siguiente')
    }
    
    
    
    // BOTON DE ANTERIOR IMAGEN
    // buscar el atributo "anterior" en le dataset
    if(botton?.dataset?.accion == 'anterior-imagen'){
        CargarAnteriorSiguienteImagen('anterior')
    }


    // MOVIMIENTOS DEL CARRUSEL CON BOTONES

    // CARRUSEL ADELANTE
    // buscar el atributo "siguiente-slide" en le dataset
    if(botton?.dataset?.accion == 'siguiente-slide'){
        carrusel('adelante')
    }
    
    
    
    // CARRUSEL ATRAS
    // buscar el atributo "anterior" en le dataset
    if(botton?.dataset?.accion == 'anterior-slide'){
        carrusel('atras')
    }
    
})