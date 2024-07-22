const BotonesAbrirCarrito = document.querySelectorAll('[data-accion="abrir-carrito"]') // todos los botones de abrir carrito
const BotonesCerrarCarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]') // cerrar carrito
const ventanaCarito = document.getElementById('carrito') // acceder al carrito

// llamar la """base de datos""" <--- simulada
import data from './data/productos'

// formatear moneda -> API JS PASANDO FORMATO EN PROPIEDADES
const formatearMoneda = new Intl.NumberFormat('es-CO', {style: 'currency', currency: 'COP'})

// abrir el carrito(modal del carrito) y mostrar los producto que existan en el carrito
const renderCarrito = () => {
    ventanaCarito.classList.add('carrito--active')

    
    // limpiar el carrito
    const productosAnteriores = ventanaCarito.querySelectorAll('.carrito__producto')
    productosAnteriores.forEach((producto) => producto.remove())
    
    // calcular el total
    let total = 0

    // interface del carrito vacio -> mensaje de "no hay productos en el carrito"
    if(carrito.length < 1){
        ventanaCarito.classList.add('carrito--vacio')
    } else {
        // eliminar la clase carrito--vacio
        ventanaCarito.classList.remove('carrito--vacio')

        // por cada producto, ejecutar una funcioon, si si hay productos en el carrito
        carrito.forEach((productocarrito) => {
            // obtener el precio del producto desde la "base de datos" con el id
            data.productos.forEach((productoBaseDatos) => {
                // si el id de la base datos es igual al id en el item del carrito
                if(productoBaseDatos.id === productocarrito.id){
                    productocarrito.precio = productoBaseDatos.precio

                    total += productoBaseDatos.precio * productocarrito.cantidad
                }
            })

    
            // obtener la ruta de las imagenes
            let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src //acceder al elemento en la posicion 0 y sacar la ruta
            // dependiendo el color -> cambiar la ruta
            if(productocarrito.color === 'rojo'){
                thumbSrc = './img/thumbs/rojo.jpg'
            } else if(productocarrito.color === 'amarillo'){
                thumbSrc = './img/thumbs/amarillo.jpg'
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
            `
            // crear el contenedor para la info del producto
            const itemCarrito = document.createElement('div')
            // agregar la clase del itemCarrito
            itemCarrito.classList.add('carrito__producto')
            // agregar la plantilla al div
            itemCarrito.innerHTML=plantillaProducto
            // agregar el producto a la ventana del carrito
            ventanaCarito.querySelector('.carrito__body').appendChild(itemCarrito)
            
        })
    }

    ventanaCarito.querySelector('.carrito__total').innerText = formatearMoneda.format(total)
}



/**  abrir carrito */
// usar un forEach, para tomar todos los botnes y darles la misma funcion
BotonesAbrirCarrito.forEach((boton) => {
    // agregar un evento al boton selecionado
    boton.addEventListener('click', (e) => {
        renderCarrito()
    })
})

/** cerrar carrito */
BotonesCerrarCarrito.forEach((boton) => {
    // agregar un evento al boton selecionado
    boton.addEventListener('click', (e) => {
        ventanaCarito.classList.remove('carrito--active')
    })
})

/**
 * Agregar un producto al carrito
*/

// detectar el click en el boton agregar carrito
const btnAgregarCarrito = document.getElementById('agregar-al-carrito')
const producto = document.getElementById('producto')
// arreglo del carrito -> info de productos a agregar
let carrito = []
// referencia a la notificacion
const notificacion = document.getElementById('notificacion')

btnAgregarCarrito.addEventListener('click', (e) => {
    // cuando presione el boton, obtener la info del producto
    const id = producto.dataset.productoId // -> data-producto-id === productoId
    const nombre = producto.querySelector('.producto__nombre').innerText
    const cantidad = parseInt(producto.querySelector('#cantidad').value) //acceder al input(valor)
    const color = document.querySelector('#propiedad-color input:checked').value // obtener el valor del input selecionado
    const tamaño = document.querySelector('#propiedad-tamaño input:checked').value // obtener el valor del input selecionado

    // comprobar si ya existe un producto con todas las propiedades, si es así, aunmentar la cantidad
    if(carrito.length > 0){
        let productoEnCarrito = false
        // por cada elemento del carrito, hacer una comprobacion
        carrito.forEach(item => {
            if(item.id === id && item.nombre === nombre && item.color === color && item.tamaño === tamaño){
                item.cantidad += cantidad
                productoEnCarrito = true
            }
        })
        // si el producto no se encuentra en el carrito
        if(!productoEnCarrito){
            carrito.push({
                id: id,
                nombre: nombre,
                cantidad: cantidad,
                color: color,
                tamaño: tamaño,
            })
        }
    }else{
        // agregar el producto al arreglo carrito (elemento -> objeto)
        carrito.push({
            id: id,
            nombre: nombre,
            cantidad: cantidad,
            color: color,
            tamaño: tamaño,
        })
    }

    // establecer la ruta de la imagen a mostrar en la notificacion
    let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src // tomar la imagen en la posicion 0
    if(color === 'rojo'){
        thumbSrc = './img/thumbs/rojo.jpg'
    } else if(color === 'amarillo'){
        thumbSrc = './img/thumbs/amarillo.jpg'
    }
    notificacion.querySelector('img').src = thumbSrc
    // mostrar la notificaicon
    notificacion.classList.add('notificacion--active')
    // cerrar la notificacion
    setTimeout(() => {
        notificacion.classList.remove('notificacion--active')
    }, 5000)

})

// boton eliminar producto del carrito
ventanaCarito.addEventListener('click', (e) => {
    // verificar si lo clickeado es un boton con el data-accion -> eliminar-item-carrito
    if(e.target.closest('button')?.dataset.accion === 'eliminar-item-carrito'){
        // conocer el producto que se desea eliminar del carrito
        const producto = e.target.closest('.carrito__producto')
        // conocer la posicion del producto que se desea eliminar del carrito
        const indexProducto = [...ventanaCarito.querySelectorAll('.carrito__producto')].indexOf(producto) // poner los elementos en un arreglo y devolver la posicion del producto
        
        // si el index es diferente del selecionado, guardarlo -> quitar de la lista/arreglo el index/item selecionado para eliminar
        carrito = carrito.filter((item, index) => {
            if(index !== indexProducto){
                return item
            }
        })
        // renderizar nuevamente el carrito -> se ve graficamente como se elimina el producto del carrito
        renderCarrito()
    }
})



// boton de enviar carrito -> 'comprar'
ventanaCarito.querySelector('#carrito__btn-comprar').addEventListener('click', ()=> {
    // enviar peticion de comprar -> no hay server, entonces solo un console.log
    console.log('enviando peticion de compra!');
    console.log(carrito);
})