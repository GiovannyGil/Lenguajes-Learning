const eliminarCaja =()=>{
    const padre = document.getElementById('contenedor1');
    const cajaEliminar = padre.querySelector('.caja')

    if(cajaEliminar){ // si existe un caja
    padre.removeChild(cajaEliminar) // eliminar caja
    }
}