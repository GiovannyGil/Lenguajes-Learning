/*
    CLASES -> indispensantes para POO

    (POO)
    Programacion
    Orientada a
    Objetos

    posee atributos/variables y metodos/funciones

    tiene constructos, primario y secundario
 */


 class Personas {
    // atributos -> variables dentro de una clase
    var nombre = ""
    var edad = 0

    //constructores
    // -> secundario
    constructor(nombre: String, edad: Int){
        this.nombre = nombre
        this.edad = edad
    }


    // metodos
    fun saludar(){
        println("Hola, mi nombre es $nombre y tengo $edad años")
    }
 }

fun main (){
    // instanciar la clase
    val persona = Personas("Gio", 12)

    println(persona.nombre)
    println(persona.edad)
    println(persona.saludar())

    val user = Usuarios("Gio", "gio@gio.com.co")

}


// class usuarios
class Usuarios(private var name: String, private var email: String) {
    fun login(){
        println("El usuario $name ha iniciado sesión")
    }
}
