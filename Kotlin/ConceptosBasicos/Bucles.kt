/*
 ! CICLO FOR
*/
// estructura/sintaxis
for (item in collection) {
    // código a ejecutar para cada item
}
// TODOD: Ejemplos
val items = listOf("manzana", "banana", "cereza")
for (item in items) {
    println(item)
}

val items = listOf("manzana", "banana", "cereza")
for (index in items.indices) {
    println("Item en $index es ${items[index]}")
}


/*
 ! CICLO FOREACH
*/
// estructura/sintaxis
collection.forEach { item ->
    // código a ejecutar para cada item
}
// TODOD: Ejemplos
val items = listOf("manzana", "banana", "cereza")
items.forEach { item ->
    println(item)
}



/*
 ! CICLO WHILE
*/
// estructura/sintaxis
while (condition) {
    // código a ejecutar mientras la condición sea verdadera
}
// TODOD: Ejemplos
var i = 5
while (i > 0) {
    println(i)
    i--
}


/*
 ! CICLO DO WHILE
*/
// estructura/sintaxis
do {
    // código a ejecutar al menos una vez
} while (condition)
// TODOD: Ejemplos

var i = 5
do {
    println(i)
    i--
} while (i > 0)
