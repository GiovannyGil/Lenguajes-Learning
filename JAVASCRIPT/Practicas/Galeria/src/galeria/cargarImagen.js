const galeria = document.getElementById('galeria') // seleccionar/acceder la seccion de galeria


const cargarImagen = (id, nombre, ruta, descripcion) => {
    // acceder a la galeria
    galeria.querySelector('.galeria__imagen').src = ruta // agregar la ruta de la imagen
    galeria.querySelector('.galeria__imagen').dataset.idImagen = id // agregar el id de la imagen, como un atributo personalizado
    // acceder al titulo
    galeria.querySelector('.galeria__titulo').innerText = nombre // agregar el nombre de la imagen
    // acceder a la descripcion
    galeria.querySelector('.galeria__descripcion-imagen-activa').innerText = descripcion // agregar la descripcion de la imagen
}




export  {cargarImagen}