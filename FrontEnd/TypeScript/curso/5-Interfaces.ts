/**
 * Interfaces
 * 
 * Las interfaces son un tipo de dato que nos permite definir la estructura de un objeto
 */

// Definimos una interfaz
interface Producto {
    id: number;
    nombre: string;
    precio: number;
    quantity: number;
}

// extender interface
interface Zapatilla extends Producto {
    talla: number;
}

// interface anidadas
interface CarritoDeCompras {
    totalPrice: number
    products: Zapatilla[]
}

// definir el carrito

const carrito: CarritoDeCompras={
    totalPrice: 100,
    products: [
        {
            id: 1,
            nombre: 'Camisa',
            precio: 20,
            quantity: 5,
            talla: 40
        }
    ]
}

/**
 * Indicar Funciones en las interfaces
 */

// forma 1
interface CarritoOps {
    add: (product: Zapatilla) => void;
}
// forma 2
interface CarritoOps2 {
    add(product: Zapatilla): void;
}