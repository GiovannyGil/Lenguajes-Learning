/**
 * son plantillas para crear objetos y encapsular códigos
 */

// definir la clase
class Usuario {
    //propiedades
    tipo = 'usuario'


    //método constructor
    constructor(nombre,apellido){ // para crear un nuevo objeto, debo recibir el nombre y apellido
        this.nombre = nombre // crear y guardar
        this.apellido = apellido

    }


    // métodos/funciones propios de la clase
    obtenerNombreCompleto(){
        return `${this.nombre} ${this.apellido}`
    }
}


// utilizar la clase para crear un nuevo objeto las veces que sea necesario
const usuario1 = new Usuario('Carlos', 'Gonzalez') // nuevo objeto
const usuario2 = new Usuario('Andres', 'Gonzalez') // nuevo objeto
const usuario3 = new Usuario('Alejandro', 'Gonzalez') // nuevo objeto


console.log(usuario1.obtenerNombreCompleto())
console.log(usuario2.nombre)
console.log(usuario3.nombre)





