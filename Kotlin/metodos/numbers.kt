/**
os tipos numéricos como Int, Double, Float, Long, etc., tienen varios métodos útiles para realizar operaciones y manipulación de datos numéricos.
 */


 //! convertir un number en string
 val number = 123
val numberString = number.toString()
println(numberString) // Imprime: "123"


//!  convertir un number de un tipo a otro
val number = 123.45

val intNumber = number.toInt()
println(intNumber) // Imprime: 123

val doubleNumber = number.toDouble()
println(doubleNumber) // Imprime: 123.45

val longNumber = number.toLong()
println(longNumber) // Imprime: 123


//! metodos para las operaciones metematicas básicas
val a = 10
val b = 5

val sum = a.plus(b)
println(sum) // Imprime: 15

val difference = a.minus(b)
println(difference) // Imprime: 5

val product = a.times(b)
println(product) // Imprime: 50

val quotient = a.div(b)
println(quotient) // Imprime: 2

val remainder = a.rem(b)
println(remainder) // Imprime: 0


//! incrementar o decrementar un valor de uno en uno
var number = 10

number = number.inc()
println(number) // Imprime: 11

number = number.dec()
println(number) // Imprime: 10


//! Crea un rango de números desde el valor actual hasta el valor especificado.

val range = 1.rangeTo(5)
println(range.toList()) // Imprime: [1, 2, 3, 4, 5]


//! devuelve el valor absoluto de un numero

val negativeNumber = -10
println(negativeNumber.absoluteValue) // Imprime: 10

//! Compara el valor del número con otro y devuelve un resultado entero: negativo si es menor, cero si es igual, positivo si es mayor.

val a = 5
val b = 10

println(a.compareTo(b)) // Imprime: -1 (a es menor que b)
println(b.compareTo(a)) // Imprime: 1 (b es mayor que a)
println(a.compareTo(5)) // Imprime: 0 (a es igual a 5)


//! Convierte el número a su representación en cadena en sistemas binario, hexadecimal u octal.

val number = 10

val binary = number.toString(2)
val hex = number.toString(16)
val octal = number.toString(8)

println(binary) // Imprime: "1010"
println(hex) // Imprime: "a"
println(octal) // Imprime: "12"
