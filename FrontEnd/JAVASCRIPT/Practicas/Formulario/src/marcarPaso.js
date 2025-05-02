

//  marcar el paso completado, accediendo al elemnto span y activar la clase check
const marcarPaso = (paso) => {
	document
		.querySelector(`.linea-pasos [data-paso="${paso}"] .linea-pasos__paso-check`)
		.classList.add('linea-pasos__paso-check--checked');
};

export default marcarPaso;