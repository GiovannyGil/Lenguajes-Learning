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

val users = arrayOf("Luis", "Ramon", "Laura", "Diana")
for (user in users.includes){
    println("[$user, ${users[user]}]")
}
 
// imprime
// [0, Luis]
// [1, Ramon]
// [2, Laura]
// [3, Diana]











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


val list = listOf(1,2,3,4,5)
list.forEach{
    println(it) 
}

/**
imprime 
1
2
3
4
5
 */

 list.forEachIndexed {
    index, elemento -> println("El elemento en el índice $index es $elemento")
 }
 /**
 imprime
    El elemento en el índice 0 es 1
    El elemento en el índice 1 es 2
    El elemento en el índice 2 es 3
    El elemento en el índice 3 es 4
    El elemento en el índice 4 es 5
  */












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

while (i <= 100){
    println(i)
    i = i +5 // incrementa de 5 en 5
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
