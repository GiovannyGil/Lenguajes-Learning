

const siguientePaso = () => {
    // crear un arreglo con los pasos
    const pasos = [...document.querySelectorAll('.linea-pasos__paso')]

    // obtener el pasoactivo en el que nos encontramos
    const pasoActivo = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso')

    // obtener el index del paso activo
    const indexPasoActivo = pasos.indexOf(pasoActivo)


    // acceder al paso activo
    if(indexPasoActivo < pasos.length - 1){
        // eliminar la clase de paso activo
        pasoActivo.querySelector('span').classList.remove('linea-pasos__paso-check--active')

        // agregar la clase al siguiente paso
        pasos[indexPasoActivo + 1].querySelector('span').classList.add('linea-pasos__paso-check--active')


        // Mostramos el siguiente elemento. 
		const id = pasos[indexPasoActivo + 1].dataset.paso;

		document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
			inline: 'start',
			behavior: 'smooth',
		});
    }
}

export default siguientePaso