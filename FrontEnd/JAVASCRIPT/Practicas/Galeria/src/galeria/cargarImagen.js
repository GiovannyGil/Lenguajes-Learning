import data from './../data/fotos.js' // importar las fotos

const galeria = document.getElementById('galeria') // seleccionar/acceder la seccion de galeria


const cargarImagen = (id, nombre, ruta, descripcion) => {
    // acceder a la galeria
    galeria.querySelector('.galeria__imagen').src = ruta // agregar la ruta de la imagen
    galeria.querySelector('.galeria__imagen').dataset.idImagen = id // agregar el id de la imagen, como un atributo personalizado
    // acceder al titulo
    galeria.querySelector('.galeria__titulo').innerText = nombre // agregar el nombre de la imagen
    // acceder a la descripcion
    galeria.querySelector('.galeria__descripcion-imagen-activa').innerText = descripcion // agregar la descripcion de la imagen


    // Eliminamos la clase active de cualquier slide.
	galeria.querySelectorAll('.galeria__carousel-slide--active').forEach((elemento) => {
		elemento.classList.remove('galeria__carousel-slide--active');
	});

    // obtener la categoria actual (de la imagen)
    const categoriaActual = galeria.dataset.categoria
    // acceder a las fotos de la categoria actual
    const fotos = data.fotos[categoriaActual]
    // obtener el indice de la imagen actual
    let indexImgActual;
    fotos.forEach((foto, index) => {
        // comprobar si el id de la foto es igual al id de la imagen actual
        if(foto.id === id){
            indexImgActual = index
        }
    })


    
    // obtener los elementos del carrusel (clase seleccionada)
    // si el slie es mayor a 0, ejecutar el siguiente codigo
    if(galeria.querySelectorAll('.galeria__carrusel-slide').length > 0){
        // imagen activa, eliminar la clase activa, de cualquier slide que la tenga
        galeria.querySelector('.galeria__carrusel-slide--active').classList.remove('galeria__carrusel-slide--active')

        // dar el border a la imagen activa
        galeria.querySelectorAll('.galeria__carrusel-slide')[indexImgActual].classlist.add('galeria__carrusel-slide--active')
    }
}

// cargar la imagen anterior o siguiente, en la galeria dependiendo de la direccion(click al boton)
const CargarAnteriorSiguienteImagen = (direccion) => {
    const categoriaActual = galeria.dataset.categoria // obtener la categoria actual
    const fotos = data.fotos[categoriaActual] // obtener las fotos de la categoria actual
    const idImagenActual = parseInt(galeria.querySelector('.galeria__imagen').dataset.idImagen) // obtener el id de la imagen actual

    // recorrer las imagenes hasta encontrar la imagen actual y obtener su posicion(index)
    let indexImagenActual;
    fotos.forEach((foto, index) => {
        if(foto.id === idImagenActual){
            indexImagenActual = index
            
        }
    })

    if(direccion === 'siguiente'){
        if(fotos[indexImagenActual + 1]){
            const {id, nombre, ruta, descripcion} = fotos[indexImagenActual + 1]
            cargarImagen(id, nombre, ruta, descripcion)
        }
    } else if (direccion === 'anterior'){
        if(fotos[indexImagenActual - 1]){
            const {id, nombre, ruta, descripcion} = fotos[indexImagenActual - 1]
            cargarImagen(id, nombre, ruta, descripcion)
        }
    } 
}






export  {cargarImagen, CargarAnteriorSiguienteImagen }