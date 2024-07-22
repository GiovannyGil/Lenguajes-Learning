// palabra reservada THIS -> 

// fuera de una funcion -> objeto global de la ventana (window)

// dentro de una funcion tipo fleca
// representa también el objeto global de la ventana (windows)

const mifuncion = () => {
    console.log(this);
}
// mifuncion()


// dentro de un evento ->se refiere al elemento que recibio el elemento, cuando la funcion no es de tipo flecha
document.getElementById('boton1').addEventListener('click', function(){
    console.log(this); // this -> boton1
})


// dentro de un metodo, el this representa el objecto
class usuario {
    constructor(nombre) {
        this.nombre = nombre // hace referencia al objeto de la clase -> tomar el nombre del objeto que se paso, y se le asigna
    }
}

