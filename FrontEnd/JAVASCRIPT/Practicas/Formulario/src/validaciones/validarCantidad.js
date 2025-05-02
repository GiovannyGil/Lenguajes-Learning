// acceder al formulario
const formulario = document.getElementById('formulario')


// validar los campos del formulario cuando el usuario escribe
const validarCantidad = () => {
    // expreison para validar que el input cantidad solo reciba inputs
    const ExpressionRegularCantidad = /^\d+(\.\d+)?$/

    // acceder al input de cantidad
    const InputCantidad = formulario.cantidad


    if(ExpressionRegularCantidad.test(InputCantidad.value)){
        InputCantidad.classList.remove('formulario__input--error')
        return true
    } else {
        InputCantidad.classList.add('formulario__input--error')
        return false
    }
}

// vlidar el boton cuando se quiere continuar sin completar los campos
// acceder al boton formulario
const btnFormulario = document.getElementById('formulario__btn')
btnFormulario.addEventListener('click', (e) => {
    e.preventDefault()

    // identificar paso actual
    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso

    // si el paso actual es cantidad, validar la cantidad
    if(pasoActual === 'cantidad'){
        // marcar paso como completado
        marcarPaso
        validarCantidad()
    }
})

export default validarCantidad 