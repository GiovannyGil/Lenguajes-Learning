'use strict';

// acceder a la seccion del producto
const producto$1 = document.getElementById('producto');
// dentro de la seccion, utilizar un query selector para encontrar el elemento con la clase (producto__imagen)
const productoIMG = producto$1.querySelector('.producto__imagen');
// acceder a las thumbs/miniaturas
const thumbs = producto$1.querySelector('.producto__thumbs');


/***
 * acceder a las imagenes del costado, para que se vean en el campo principal
*/

// agregar un evento click a las thumbs, para detectar el click
thumbs.addEventListener('click', (e) => {
    // si el elemento clickeado es una imagen, hacer lo sigiente
    if(e.target.tagName === 'IMG'){
        const imagenSRC = e.target.src; // obtener la url de la imagen clickeada
        // obtener el index de la ultima diagonal
        const lastIndex = imagenSRC.lastIndexOf('/');
        // cortar la cadena despues del lastIndex => nombre de la imagen
        const NombreImagen = imagenSRC.substring(lastIndex + 1); // 'nombreimg.jpg'

        // acceder a la imagen(ruta) para reemplazar la original por la imagen clickeada
        productoIMG.src = `./img/tennis/${NombreImagen}`;
    }
});


/***
 * acceder a los colores y cambiar la imagen al presional un color en el campo principal
*/

// acceder a la propiedad color con el id
const propiedadColor = producto$1.querySelector('#propiedad-color');
propiedadColor.addEventListener('click', (e) => {
    // si el elemento al que se le da click, es un input, mostrar la informacion solitada
    if(e.target.tagName === 'INPUT') {
        productoIMG.src = `./img/tennis/${e.target.value}.jpg`;
    }
});


/**
 * Botones de la cantidad (+) (-) y bloqeuar una cantidad (no poder cambiar la cantidad al bloqeuar el input)
 *
*/

// acceder a los botones
const btnDisminuirCantidad = producto$1.querySelector('#disminuir-cantidad');
const btnIncrementarCantidad = producto$1.querySelector('#incrementar-cantidad');
// acceder al input cantidad
const inputCantidad = producto$1.querySelector('#cantidad');

btnIncrementarCantidad.addEventListener('click', (e) => {
    // tomar el valor de input, e inmcrementar la cantidad de 1 en 1
    inputCantidad.value = parseInt(inputCantidad.value) + 1; 
});

btnDisminuirCantidad.addEventListener('click', (e) => {
    if(parseInt(inputCantidad.value) > 1 ){
        // tomar el valor de input, e inmcrementar la cantidad de 1 en 1
        inputCantidad.value = parseInt(inputCantidad.value) - 1; 
    }
});

var data = {
    productos: [
        {
            id: '1',
            nombre: 'Tennis Converse Standard',
            descripcion: 'Lorem ipsum dolor sit amet',
            precio: 500.0,
            colores: ['negro', 'rojo', 'amarillo'],
            tamaños: ['1.5', '2', '2.5', '3', '4'] ,
        },
        {
            id: '2',
            nombre: 'Tennis Converse 2200',
            descripcion: 'Lorem ipsum dolor sit amet 22000',
            precio: 550.0,
            colores: ['negro', 'rojo', 'amarillo'],
            tamaños: ['1.5', '2', '2.5', '3', '4'] ,
        }
    ]
};

const BotonesAbrirCarrito = document.querySelectorAll('[data-accion="abrir-carrito"]'); // todos los botones de abrir carrito
const BotonesCerrarCarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]'); // cerrar carrito
const ventanaCarito = document.getElementById('carrito'); // acceder al carrito

// formatear moneda -> API JS PASANDO FORMATO EN PROPIEDADES
const formatearMoneda = new Intl.NumberFormat('es-CO', {style: 'currency', currency: 'COP'});

// abrir el carrito(modal del carrito) y mostrar los producto que existan en el carrito
const renderCarrito = () => {
    ventanaCarito.classList.add('carrito--active');

    // limpiar el carrito
    const productosAnteriores = ventanaCarito.querySelectorAll('.carrito__producto');
    productosAnteriores.forEach((producto) => producto.remove());
    
    // pr cada producto, ejecutar una funcioon
    carrito.forEach((productocarrito) => {

        // obtener el precio del producto desde la "base de datos" con el id
        data.productos.forEach((productoBaseDatos) => {
            // si el id de la base datos es igual al id en el item del carrito
            if(productoBaseDatos.id === productocarrito.id){
                productocarrito.precio = productoBaseDatos.precio;
            }
        });


        // obtener la ruta de las imagenes
        let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src; //acceder al elemento en la posicion 0 y sacar la ruta
        // dependiendo el color -> cambiar la ruta
        if(productocarrito.color === 'rojo'){
            thumbSrc = './img/thumbs/rojo.jpg';
        } else if(productocarrito.color === 'amarillo'){
            thumbSrc = './img/thumbs/amarillo.jpg';
        }

        // plantilla dinamica para cada producto añadido al carrito
        // pasar las propiedades de forma dinamica -> img, nombre ...
        const plantillaProducto = `
            <div class="carrito__producto-info">
                <img src="${thumbSrc}" alt="" class="carrito__thumb" />
                <div>
                    <p class="carrito__producto-nombre">
                        <span class="carrito__producto-cantidad">${productocarrito.cantidad} x </span>${productocarrito.nombre}
                    </p>
                    <p class="carrito__producto-propiedades">
                        Tamaño:<span>${productocarrito.tamaño}</span> Color:<span>${productocarrito.color}</span>
                    </p>
                </div>
            </div>
            <div class="carrito__producto-contenedor-precio">
                <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                        />
                    </svg>
                </button>
                <p class="carrito__producto-precio">${formatearMoneda.format(productocarrito.precio * productocarrito.cantidad)}</p>
            </div>
        `;
        // crear el contenedor para la info del producto
        const itemCarrito = document.createElement('div');
        // agregar la clase del itemCarrito
        itemCarrito.classList.add('carrito__producto');
        // agregar la plantilla al div
        itemCarrito.innerHTML=plantillaProducto;
        // agregar el producto a la ventana del carrito
        ventanaCarito.querySelector('.carrito__body').appendChild(itemCarrito);
        
    });
};



/**  abrir carrito */
// usar un forEach, para tomar todos los botnes y darles la misma funcion
BotonesAbrirCarrito.forEach((boton) => {
    // agregar un evento al boton selecionado
    boton.addEventListener('click', (e) => {
        renderCarrito();
    });
});

/** cerrar carrito */
BotonesCerrarCarrito.forEach((boton) => {
    // agregar un evento al boton selecionado
    boton.addEventListener('click', (e) => {
        ventanaCarito.classList.remove('carrito--active');
    });
});

/**
 * Agregar un producto al carrito
 */

// detectar el click en el boton agregar carrito
const btnAgregarCarrito = document.getElementById('agregar-al-carrito');
const producto = document.getElementById('producto');
// arreglo del carrito -> info de productos a agregar
const carrito = [];

btnAgregarCarrito.addEventListener('click', (e) => {
    // cuando presione el boton, obtener la info del producto
    const id = producto.dataset.productoId; // -> data-producto-id === productoId
    const nombre = producto.querySelector('.producto__nombre').innerText;
    const cantidad = parseInt(producto.querySelector('#cantidad').value); //acceder al input(valor)
    const color = document.querySelector('#propiedad-color input:checked').value; // obtener el valor del input selecionado
    const tamaño = document.querySelector('#propiedad-tamaño input:checked').value; // obtener el valor del input selecionado

    // comprobar si ya existe un producto con todas las propiedades, si es así, aunmentar la cantidad
    if(carrito.length > 0){
        let productoEnCarrito = false;
        // por cada elemento del carrito, hacer una comprobacion
        carrito.forEach(item => {
            if(item.id === id && item.nombre === nombre && item.color === color && item.tamaño === tamaño){
                item.cantidad += cantidad;
                productoEnCarrito = true;
            }
        });
        // si el producto no se encuentra en el carrito
        if(!productoEnCarrito){
            carrito.push({
                id: id,
                nombre: nombre,
                cantidad: cantidad,
                color: color,
                tamaño: tamaño,
            });
        }
    }else {
        // agregar el producto al arreglo carrito (elemento -> objeto)
        carrito.push({
            id: id,
            nombre: nombre,
            cantidad: cantidad,
            color: color,
            tamaño: tamaño,
        });
    }

});
