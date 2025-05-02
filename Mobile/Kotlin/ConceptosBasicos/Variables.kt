
/*
TODO: DEFINIR VAIRABLES EN KOTLIN

! Estructura:
* palabra reservada + Nombre: + Tipo de Dato = Valor
* val/var variableName: DataType = value


var : variables
val : constante
*/

// !!!! VAL es para variables de solo lectura, VAR para variables modificables

var count: Int = 0
val name: String = "John"
var isTrue: Boolean = true
val price: Double = 5.0
val number: Float = 5.0f
var age: 23
var isAlive: Boolean = true
var country: String = "Colombia"

// ... se peuden reemplazar o cambiar el valor en el flujo del código

/**
! sumar asi mias
 */

val count: Int = 0
// ! sumar de a 1
count = count +1
count += 1
count ++ // 
// ! restar de a 1
count = 10
count = count - 1
count -= 1
count --


val name: String = "Kotlin"
val age: Int = 25
val pi: Double = 3.14159
val city = "Medellín"
var year = 2024
var temperature = 30.5


//! valor null u opcional

var x = null // forma incorrecta -> no se puede reemplazar
var y : String? = null // valor opcional -> null, se puede re asignar

var id: Int? = null

// saber si la variable es null ->
x?.let {
    println("x is not null")
} ?: run {
    println("x is null")
}

// para interactual con la consola

try {
    println("Escribir el nombre:")
    val name = readln()
    println("Hola, $name!")
}
catch(Exception e) {
    println("algo está mal")
}