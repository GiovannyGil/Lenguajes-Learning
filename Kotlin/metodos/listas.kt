/**
as listas son una colección de elementos que pueden ser inmutables (List) o mutables (MutableList). Ambas versiones proporcionan una variedad de métodos para manipular y operar sobre sus elementos.
 */

 //! Devuelve el número de elementos en la lista.
val numbers = listOf(1, 2, 3, 4, 5)
println(numbers.size) // Imprime: 5


//! Verifica si la lista está vacía o no.
val emptyList = listOf<String>()
println(emptyList.isEmpty()) // Imprime: true

val nonEmptyList = listOf("Kotlin", "Java")
println(nonEmptyList.isNotEmpty()) // Imprime: true


//! Devuelve el elemento en la posición dada.
val fruits = listOf("Apple", "Banana", "Cherry")
println(fruits.get(1)) // Imprime: Banana
println(fruits[1]) // Imprime: Banana


//! Verifica si la lista contiene un elemento o una colección de elementos.

val fruits = listOf("Apple", "Banana", "Cherry")

println(fruits.contains("Banana")) // Imprime: true
println(fruits.containsAll(listOf("Apple", "Cherry"))) // Imprime: true


//! Devuelve el índice de la primera y última aparición de un elemento.

val numbers = listOf(1, 2, 3, 2, 1)

println(numbers.indexOf(2)) // Imprime: 1
println(numbers.lastIndexOf(2)) // Imprime: 3


//! Devuelve una vista de una parte de la lista, desde el índice de inicio (inclusive) hasta el índice final (exclusivo)

val numbers = listOf(1, 2, 3, 4, 5)
val subList = numbers.subList(1, 4)
println(subList) // Imprime: [2, 3, 4]


//! Ejecuta una acción para cada elemento de la lista. (bucle)
val fruits = listOf("Apple", "Banana", "Cherry")
fruits.forEach { fruit ->
    println(fruit)
}
// Imprime:
// Apple
// Banana
// Cherry


//! Devuelve una nueva lista que contiene solo los elementos que cumplen con una condición dada.
val numbers = listOf(1, 2, 3, 4, 5)
val evenNumbers = numbers.filter { it % 2 == 0 }
println(evenNumbers) // Imprime: [2, 4]

//! Devuelve una nueva lista que contiene el resultado de aplicar una función a cada elemento de la lista original.

val numbers = listOf(1, 2, 3, 4, 5)
val squares = numbers.map { it * it }
println(squares) // Imprime: [1, 4, 9, 16, 25]


//! Devuelve una nueva lista con los elementos ordenados. sorted() ordena los elementos de manera natural, mientras que sortedBy() ordena según una función de comparación.

val numbers = listOf(5, 2, 8, 3, 1)
val sortedNumbers = numbers.sorted()
println(sortedNumbers) // Imprime: [1, 2, 3, 5, 8]

val fruits = listOf("Banana", "Apple", "Cherry")
val sortedFruits = fruits.sortedBy { it.length }
println(sortedFruits) // Imprime: [Apple, Banana, Cherry]


/**

Métodos Específicos de MutableList
Además de los métodos anteriores, MutableList ofrece métodos para modificar la lista:

add(element: E): Añade un elemento al final de la lista.

remove(element: E): Elimina la primera aparición de un elemento.

clear(): Elimina todos los elementos de la lista.

set(index: Int, element: E): Reemplaza el elemento en el índice 
especificado con un nuevo elemento.

addAll(elements: Collection<E>): Añade todos los elementos de una colección a la lista

*/
val mutableList = mutableListOf("Apple", "Banana")
mutableList.add("Cherry")
println(mutableList) // Imprime: [Apple, Banana, Cherry]

mutableList.remove("Banana")
println(mutableList) // Imprime: [Apple, Cherry]

mutableList[1] = "Blueberry"
println(mutableList) // Imprime: [Apple, Blueberry]

mutableList.clear()
println(mutableList) // Imprime: []
