console.log('Cargando CargarCategorias.js...')

// Importar dataCategorias
import dataCategorias from './data/categorias'
// ver la data de categorias por consola
console.log(dataCategorias)


const {categorias} = dataCategorias // destructuring -> extraer la propiedad categorias de dataCategorias
console.log(categorias) // ver categorias por consola

const contenedorCategorias = document.getElementById('categorias')

categorias.forEach((categoria) => {
    // crear un elemento por cada categoria
    const NuevaCategoria = document.createElement('a')

    // definir una plantilla
    const plantilla = `
            <img class="categoria__img" src="${categoria.imagenPortada}" alt="" />
			<div class="categoria__datos">
				<p class="categoria__nombre">${categoria.nombre}</p>
				<p class="categoria__numero-fotos">${categoria.numeroFotos} Fotos</p>
			</div>
        `

        // agregar la plantilla al elemento
        NuevaCategoria.innerHTML = plantilla
        // agregar los atrtiutos al elemento
        NuevaCategoria.classList.add('categoria') // agregar una clase
        NuevaCategoria.href = '#' // agregar un enlace
        NuevaCategoria.dataset.categoria = categoria.id // agregar un atributo personalizado

        // agregar el elemento al contenedor -> agregar plantilla al DOM
        contenedorCategorias.append(NuevaCategoria)


})