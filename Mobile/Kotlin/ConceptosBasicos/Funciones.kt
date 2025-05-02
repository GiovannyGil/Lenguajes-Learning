

/**
    estructura
    se declara con la palabra reservada -> fun + nombre + (parametros) "en caso de tener"
        {cuerpo de la funcion}

    la funcion lleva un return o no dependiendo de si ternona un valor o no, y el valor de retorno depende del tipo de dato
*/

fun main() {
    println("Hello, world!!!")
}

fun main() {
    val nextMeeting = "Next meeting is: "
    val date = "January 1"
    val reminder = nextMeeting + date
    println(reminder)
}


fun suma (a: Int, b: Int){
    val resultado: Int = a + b
    println("El resultado de la suma es: $resultado")
}

/**
 * varias funciones y llamarlas/instanciarlas en la principal
 */

fun main() {
    birthdayGreeting() // instanciar en la funcion principal
}

fun birthdayGreeting() {
    println("Happy Birthday, Rover!")
    println("You are now 5 years old!")
}

// funcion tipada -> retorna un tipo

// tipo predeterminados
// todo: es el tipo de dato equivalente a vacio/void -> no retorna nada

fun Vacia(): Unit{
    println("Esta funcion no retorna nada")
}

fun getGreeting(): String {
    return "Hello, Kotlin!"
}
// reciviendo un parametro tipado
fun sayHello(name: String): String {
    return "Hello, $name!"
}
// todo: llamar una funcion tipada en el main
// todo: funciona igual sin importar la cantidad de parametros y sus tipos
fun main() {
    // instanciar la funcion y pasar el parametro necesario
    println(greetingWithName("Gio")) 
}

// todo: funciones con parametro y nombre/valor
fun birthdayGreeting(name: String = "Rover", age: Int): String {
    return "Happy Birthday, $name! You are now $age years old!"
}
println(birthdayGreeting(age = 5)) // en el main se llamada así
println(birthdayGreeting("Rex", 2)) // se puede sobre escribir el nombre



fun main() {
    var discountPercentage: Int = 0
    var offer: String = ""
    val item = "Google Chromecast"
    discountPercentage = 20
    offer = "Sale - Up to $discountPercentage% discount on $item! Hurry up!"

    println(offer)
}

fun main() {
    val baseSalary: Int = 5000
    val bonusAmount: Int = 1000
    val totalSalary: Int = baseSalary + bonusAmount
    println("Congratulations for your bonus! You will receive a total of $totalSalary (additional bonus).")
}


fun main() {
    val firstNumber = 10
    val secondNumber = 5
    val thirdNumber = 8

    val result = add(firstNumber, secondNumber)
    val anotherResult = add(firstNumber, thirdNumber)

    println("$firstNumber + $secondNumber = $result")
    println("$firstNumber + $thirdNumber = $anotherResult")
}

// Define add() function below this line
fun add(firstNumber: Int, SecondNumber: Int): Int{
    return firstNumber + SecondNumber
}

// funcioens lambda
val sum = {x:Int, y:Int -> x + y}
VAL Result = sum(12, 11)
println(Result)