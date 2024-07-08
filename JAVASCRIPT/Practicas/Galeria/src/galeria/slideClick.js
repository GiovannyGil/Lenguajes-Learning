
//  importar las fotografias
import datos from './../data/fotos'

// importar funcion de cargarImagen
import {cargarImagen} from './cargarImagen'

const slideClick = (e) => {

    let ruta, nombre, descripcion

    // acceder a la informacion del slide
    const id = parseInt(e.target.dataset.id) // acceder al id de la imagen

    // acceder a la galeria
    const galeria = document.getElementById('galeria') // seleccionar/acceder la seccion de galeria
    const categoriaActiva = galeria.dataset.categoria // acceder a la categoria activa

    // acceder a las fotos de la categoria activa, recoriendo el objeto

    datos.fotos[categoriaActiva].forEach((foto) => {
        // si el id de la foto es igual al id del slide, ejecuta el siguiente codigo
        if(foto.id === id){
            // reemplazar los valores
            ruta = foto.ruta
            nombre = foto.nombre
            descripcion = foto.descripcion
        }
        cargarImagen(id, nombre, ruta, descripcion) // cargar la imagen
    })

}

export default slideClick