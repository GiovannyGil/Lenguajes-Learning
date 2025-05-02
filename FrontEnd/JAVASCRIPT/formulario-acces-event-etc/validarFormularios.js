// validaciones en un formulario

const formulario = document.getElementById('formulario-donacion')


formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    // acceder a los valores del formulario
    const datos = {
        correo: formulario.correo.value,
        pais: formulario.pais.value,
        donacion: formulario.donacion.value,
        fecha: formulario.fecha.value,
        terminos: formulario['terminos-y-condiciones'].checked
    }

    // validaciones
    // tamaño del correo
    if(datos.correo.length <= 2 ){
        console.log('correo invalido');
        return
    }
    // comprobar el pais (selecionado)
    if(datos.pais === ''){
        console.log('pais invalido');
        return
    }
    // donacion
    if(datos.donacion === ''){
        console.log('donacion invalida');
        return
    }
    // fecha
    if(datos.fecha === ''){
        console.log('fecha invalida');
        return
    }
    // terminos y condiciones
    if(!datos.terminos){
        console.log('debe aceptar terminos y condiciones');
        return
    }

    console.log(datos);
})