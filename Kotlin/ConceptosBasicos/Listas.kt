/**
    LISTAS

    (List) las listas son inmutables -> no se pueden modificar despues de su creacion/instanciacion 
    
    MutableList son un tipo de listas mutables, que se peuden modificar luego de su creacion, NO tienen una longitud definidad, pueden crecer y disminuir
 */

//  LIST
val fruits: List<String> = listOf("Apple", "Banana", "Cherry")
println(fruits) // Imprime: [Apple, Banana, Cherry]
println(fruits[1]) // Imprime: Banana

// MutableList
val fruits: MutableList<String> = mutableListOf("Apple", "Banana", "Cherry")
println(fruits) // Imprime: [Apple, Banana, Cherry]

fruits.add("Date")
println(fruits) // Imprime: [Apple, Banana, Cherry, Date]

fruits.remove("Banana")
println(fruits) // Imprime: [Apple, Cherry, Date]

fruits[1] = "Blueberry"
println(fruits) // Imprime: [Apple, Blueberry, Date]
