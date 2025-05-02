/** los arrays son una colección de elementos de un tipo específico con un tamaño fijo. A diferencia de las listas, los arrays no pueden cambiar de tamaño después de su creación, pero se puede modificar sus elementos 
*/

//! Devuelve el número de elementos en el array.
val numbers = arrayOf(1, 2, 3, 4, 5)
println(numbers.size) // Imprime: 5

//! Devuelve el elemento en la posición dada.
val fruits = arrayOf("Apple", "Banana", "Cherry")
println(fruits.get(1)) // Imprime: Banana
println(fruits[1]) // Imprime: Banana

//! Establece el valor de un elemento en una posición específica.
val numbers = arrayOf(1, 2, 3)
numbers.set(1, 10)
println(numbers[1]) // Imprime: 10

numbers[2] = 20
println(numbers[2]) // Imprime: 20


//! Verifica si el array contiene un elemento específico.
val numbers = arrayOf(1, 2, 3, 4, 5)
println(numbers.contains(3)) // Imprime: true
println(numbers.contains(6)) // Imprime: false


//! Devuelve el índice de la primera y última aparición de un elemento.
val numbers = arrayOf(1, 2, 3, 2, 1)
println(numbers.indexOf(2)) // Imprime: 1
println(numbers.lastIndexOf(2)) // Imprime: 3


//! Ejecuta una acción para cada elemento del arra
val fruits = arrayOf("Apple", "Banana", "Cherry")
fruits.forEach { fruit ->
    println(fruit)
}
// Imprime:
// Apple
// Banana
// Cherry


//! Devuelve una lista que contiene solo los elementos que cumplen con una condición dada.
val numbers = arrayOf(1, 2, 3, 4, 5)
val evenNumbers = numbers.filter { it % 2 == 0 }
println(evenNumbers) // Imprime: [2, 4]


//! Devuelve una lista que contiene el resultado de aplicar una función a cada elemento del array.
val numbers = arrayOf(1, 2, 3, 4, 5)
val squares = numbers.map { it * it }
println(squares) // Imprime: [1, 4, 9, 16, 25]

//! Devuelve una lista con los elementos del array ordenados de manera natural.
val numbers = arrayOf(5, 2, 8, 3, 1)
val sortedNumbers = numbers.sorted()
println(sortedNumbers) // Imprime: [1, 2, 3, 5, 8]

//! Crea una copia del array con el mismo tamaño o con un tamaño diferente.

val original = arrayOf(1, 2, 3)
val copy = original.copyOf()
println(copy.joinToString()) // Imprime: 1, 2, 3

val largerCopy = original.copyOf(5)
println(largerCopy.joinToString()) // Imprime: 1, 2, 3, 0, 0


//! Crea una cadena de texto que representa el contenido del array, con un delimitador entre los elementos.

val fruits = arrayOf("Apple", "Banana", "Cherry")
val fruitString = fruits.joinToString(", ")
println(fruitString) // Imprime: Apple, Banana, Cherry

//! Verifica si el array está vacío o no.
val emptyArray = arrayOf<Int>()
println(emptyArray.isEmpty()) // Imprime: true

val nonEmptyArray = arrayOf(1, 2, 3)
println(nonEmptyArray.isNotEmpty()) // Imprime: true



// leer el array como string
val fruits = arrayOf("Apple", "Banana", "Cherry")
println(fruits.contentToString) // pasar el array a una cadena de texto