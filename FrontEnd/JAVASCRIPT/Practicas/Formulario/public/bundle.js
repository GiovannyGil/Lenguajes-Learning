'use strict';

//  marcar el paso completado, accediendo al elemnto span y activar la clase check
const marcarPaso$1 = (paso) => {
	document
		.querySelector(`.linea-pasos [data-paso="${paso}"] .linea-pasos__paso-check`)
		.classList.add('linea-pasos__paso-check--checked');
};

const siguientePaso = () => {
    // crear un arreglo con los pasos
    const pasos = [...document.querySelectorAll('.linea-pasos__paso')];

    // obtener el pasoactivo en el que nos encontramos
    const pasoActivo = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso');

    // obtener el index del paso activo
    const indexPasoActivo = pasos.indexOf(pasoActivo);


    // acceder al paso activo
    if(indexPasoActivo < pasos.length - 1){
        // eliminar la clase de paso activo
        pasoActivo.querySelector('span').classList.remove('linea-pasos__paso-check--active');

        // agregar la clase al siguiente paso
        pasos[indexPasoActivo + 1].querySelector('span').classList.add('linea-pasos__paso-check--active');


        // Mostramos el siguiente elemento. 
		const id = pasos[indexPasoActivo + 1].dataset.paso;

		document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
			inline: 'start',
			behavior: 'smooth',
		});
    }
};

// acceder al formulario
const formulario$2 = document.getElementById('formulario');


// validar los campos del formulario cuando el usuario escribe
const validarCantidad = () => {
    // expreison para validar que el input cantidad solo reciba inputs
    const ExpressionRegularCantidad = /^\d+(\.\d+)?$/;

    // acceder al input de cantidad
    const InputCantidad = formulario$2.cantidad;


    if(ExpressionRegularCantidad.test(InputCantidad.value)){
        InputCantidad.classList.remove('formulario__input--error');
        return true
    } else {
        InputCantidad.classList.add('formulario__input--error');
        return false
    }
};

// vlidar el boton cuando se quiere continuar sin completar los campos
// acceder al boton formulario
const btnFormulario$1 = document.getElementById('formulario__btn');
btnFormulario$1.addEventListener('click', (e) => {
    e.preventDefault();

    // identificar paso actual
    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;

    // si el paso actual es cantidad, validar la cantidad
    if(pasoActual === 'cantidad'){
        // marcar paso como completado
        marcarPaso;
        validarCantidad();
    }
});

const validarNombre = () => {
	// Aceptamos cualquier digito (0-9), y un punto con decimales (opcional)
	const expRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

	// Obtenemos el input
	const inputNombre = formulario['nombre-receptor'];

	// Comprobamos que el nombre sea correcto.
	if (!expRegNombre.test(inputNombre.value)) {
		inputNombre.classList.add('formulario__input--error');
		return false;
	} else {
		inputNombre.classList.remove('formulario__input--error');
		return true;
	}
};

const validarCorreo = () => {
	// Expresion regular para validar un correo.
	const expRegCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

	// Obtenemos los inputs
	const inputCorreo = formulario['correo-receptor'];

	// Comprobamos que el nombre y correo sean correctos.
	if (!expRegCorreo.test(inputCorreo.value)) {
		inputCorreo.classList.add('formulario__input--error');
		return false;
	} else {
		inputCorreo.classList.remove('formulario__input--error');
		return true;
	}
};

const formulario$1 = document.getElementById('formulario');

// Reiniciando scroll al cargar el formulario.
formulario$1.querySelector('.formulario__body').scrollLeft = 0;

// Eventlistener para comprobar los campos de formulario cuando el usuario corrige.
formulario$1.addEventListener('keyup', (e) => {
	if (e.target.tagName === 'INPUT') {
		if (e.target.id === 'cantidad') {
			validarCantidad();
		} else if (e.target.id === 'nombre-receptor') {
			validarNombre();
		} else if (e.target.id === 'correo-receptor') {
			validarCorreo();
		}
	}
});

const btnFormulario = document.getElementById('formulario__btn');
btnFormulario.addEventListener('click', (e) => {
	e.preventDefault();

	// Validamos el paso actual.
	const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso')
		.dataset.paso;

	if (pasoActual === 'cantidad') {
		if (validarCantidad()) {
			marcarPaso$1('cantidad');
			siguientePaso();
		}
	} else if (pasoActual === 'datos') {
		if (validarNombre() && validarCorreo()) {
			marcarPaso$1('datos');
			siguientePaso();
		}
	} else if (pasoActual === 'metodo') {
		marcarPaso$1('metodo');

		// Paso final, confirmación
		const opciones = { style: 'currency', currency: 'MXN' };
		const formatoMoneda = new Intl.NumberFormat('es-MX', opciones);

		// Obtenemos los valores del formulario y los pasamos a la seccion de confirmar.
		document.querySelector('[data-valor="cantidad"] span').innerText = formatoMoneda.format(
			formulario$1.cantidad.value
		);
		document.querySelector('[data-valor="nombre-receptor"] span').innerText = formulario$1['nombre-receptor'].value;
		document.querySelector('[data-valor="correo-receptor"] span').innerText = formulario$1['correo-receptor'].value;
		document.querySelector('[data-valor="metodo"] span').innerText = formulario$1.metodo.value;

		// Cambiamos el texto del btn a 'Transferir'
		btnFormulario.querySelector('span').innerText = 'Transferir';

		// Agregamos la clase que deshabilita el boton.
		btnFormulario.classList.add('formulario__btn--disabled');

		// Ocultamos el icono de siguiente.
		btnFormulario
			.querySelector('[data-icono="siguiente"]')
			.classList.remove('formulario__btn-contenedor-icono--active');

		// Mostramos el icono del banco.
		btnFormulario.querySelector('[data-icono="banco"]').classList.add('formulario__btn-contenedor-icono--active');

		siguientePaso();

		// Eliminamos la clase de disabled despues de 4 segundos.
		setTimeout(() => {
			btnFormulario.classList.remove('formulario__btn--disabled');
		}, 4000);

		// Comprobamos si estamos en el paso actual y el boton no tiene la clase de disabled
	} else if (pasoActual === 'confirmacion' && !btnFormulario.matches('.formulario__btn--disabled')) {
		// Aqui se haria una peticion al servidor, una redireccion, etc.

		// Cambiamos el texto del btn a 'Transferir'
		btnFormulario.querySelector('span').innerText = 'Transfiriendo';
		// Agregamos la clase que deshabilita el boton.
		btnFormulario.classList.add('formulario__btn--disabled');

		setTimeout(() => {
			formulario$1.classList.add('formulario--hidden');
			document.getElementById('alerta').classList.add('alerta--active');
		}, 4000);
	} else {
		siguientePaso();
	}
});
//# sourceMappingURL=bundle.js.map
