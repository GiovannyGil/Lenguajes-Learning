/***
* Estructura de condicion IF
* es una estructura que permite dividir el flujo de acuerdo a su una condicion se cumple o no
*
if (condition) {
    // código si la condición es verdadera
} else {
    // código si la condición es falsa
}
*
* debe ser todo con el mismo tipo de datos, no se puedeb cambiar o combinar tipos en las condicioens del when
*/

val number = 10

if (number > 0) {
    println("El número es positivo")
} else if (number < 0) {
    println("El número es negativo")
} else {
    println("El número es cero")
}
/******************************************************** */
// TODO: if devolviendo un valor

val result = if (condition) {
    // código si la condición es verdadera
    value1
} else {
    // código si la condición es falsa
    value2
}
// ejemplo:
val a = 5
val b = 10
val max = if (a > b) a else b
println("El valor máximo es $max")

/********************************************************* */
// TODO: When (switch)
when (value) {
    case1 -> {
        // código si value == case1
    }
    case2 -> {
        // código si value == case2
    }
    else -> {
        // código si ninguno de los casos anteriores coincide
    }
}
// ejemplo:
val day = 3 // dar un numero (para un dia de la semana)

// validar cual dia de la semana es
val dayName = when (day) {
    1 -> "Lunes"
    2 -> "Martes"
    3 -> "Miércoles"
    4 -> "Jueves"
    5 -> "Viernes"
    6 -> "Sábado"
    7 -> "Domingo"
    else -> "Día inválido"
}

println("El día de la semana es $dayName")


//* when como expression, devuelve un valor */
// ejemplo:
val number = 8

val type = when {
    number < 0 -> "Negativo" // cuando el numero es menor que cero, es negativo
    number == 0 -> "Cero" // cuando es igual a cero, "Cero"/"Neutro"
    else -> "Positivo" // cuando no cumple las anteriores, es Positivo
}

println("El número es $type")


// en el when se peden convinar condicionales y bucles

val number = 10

when {
    number % 2 == 0 -> println("El número es par") // si el numero es par
    number % 2 != 0 -> println("El número es impar") // si el numero es impar
    else -> println("El número es cero") // si no es ninguno de los anteriores, es cero
}

val x = 12
when(x) {
    in 1 <= 10 -> println("esta en el rango")
    in 10 <= 20 -> println("esta fuera de rango")
}

/********************************************************* */
// ! EXPRESION ELVIS
// * se usa para manejar valores nulos y proporciona un valor predeterminado cuando la expresion de la izquierda es null
// val result = nullableValue ?: defaultValue
// ejemplo:
val name: String? = null // crear un nombre y es nulo
val displayName = name ?: "Desconocido" // si el nombre es nulo, darle el valor/string "Desconocido"
println("Nombre: $displayName")
