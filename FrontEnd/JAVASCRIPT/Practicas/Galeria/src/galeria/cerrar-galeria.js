// acceder a la galeria
const galeria = document.getElementById('galeria') // seleccionar/acceder la seccion de galeria


const cerrarGaleria = () => {
    galeria.classList.remove('galeria--active') // remover la clase para cerrar la galeria
    document.body.style.overflow = '' // mostrar la barra de desplazamiento
    
}

export default cerrarGaleria // exportar la funcion para poder usarla en otro archivo