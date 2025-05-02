/**
las excepciones son eventos que pueden ocurrir durante la ejecución de un programa y que interrumpen el flujo normal del programa

 */

 try {
    // Código que puede lanzar una excepción
} catch (e: ExceptionType) {
    // Código para manejar la excepción
} finally {
    // Código que siempre se ejecuta, haya o no excepción
}

fun main() {
    try {
        val result = 10 / 0
        println(result)
    } catch (e: ArithmeticException) {
        println("Error: División por cero no permitida.")
    } finally {
        println("Este bloque siempre se ejecuta.")
    }
}

/**
LANZANDO EXCEPCIONES PROPIAS
 */

 fun checkAge(age: Int) {
    if (age < 18) {
        throw IllegalArgumentException("La edad debe ser 18 o mayor.")
    } else {
        println("Acceso permitido.")
    }
}

fun main() {
    try {
        checkAge(15)
    } catch (e: IllegalArgumentException) {
        println("Excepción: ${e.message}")
    }
}






fun main(){
    try {
    println("Escribir el nombre:")
    val name = readln()
    println("Hola, $name!")
    }
    catch(Exception e) {
        println("algo está mal")
    } finally {
        println("Este bloque siempre se ejecuta, SIEMPRE!!")
    }
}