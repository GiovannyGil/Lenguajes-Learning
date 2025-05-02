/**
    ARRAY

    son una coleccion de elementos del MISMO TIPO que no se puede cambiar desde su creacion.
    los arrays tienen una longitud fija
    el acceso a los elementos es mediante el indice/index 
 */

 // Crear un array de enteros
val numbers: Array<Int> = arrayOf(1, 2, 3, 4, 5)
println(numbers.joinToString()) // Imprime: 1, 2, 3, 4, 5


/**
más formas de declarar arryas
arrayof - 
intarrayof ... -> un array de solo datos enteros
Array<Int>

Array<String>
 */

// Acceder a un elemento
println(numbers[2]) // Imprime: 3

// Modificar un elemento
numbers[2] = 10
println(numbers.joinToString()) // Imprime: 1, 2, 10, 4, 5

// Crear un array de cadenas
val fruits: Array<String> = arrayOf("Apple", "Banana", "Cherry")
println(fruits.joinToString()) // Imprime: Apple, Banana, Cherry

// Array con tamaño fijo y valores iniciales
val zeros = Array(5) { 0 } // Crea un array de 5 elementos, todos inicializados a 0
println(zeros.joinToString()) // Imprime: 0, 0, 0, 0, 0
