fun main(){
    // filter -> filta de una lista o array, mediante una condicion en una funcion

    val nombres = listOf("Luis", "Maria", "Pedro", "Arturo")

    // filtar los nombres que tienen letra A
    val nombresRes = nombres.filter { it.contoins ("a", ignoreCase = true)}
    println(nombresRes)

    /** Imprime
        * [Maria, Arturo]
     */

    // map -> mapea los elementos de una lista o array, mediante una funcion

    val numeros = listOf(1, 2, 3, 4, 5)
    val cuadrados = numeros.map { it * it }
    println(cuadrados)
    /** Imprime
        * [1, 4, 9, 16, 25]
     */

     // asim mismo con muchos metodos, como el sum, toString, etc, etc

     // reduce -> toma todos los valores, y los transforma en un solo resultado

//  sumando
    val numeros = listOf(1, 2, 3, 4, 5)
    val suma = numeros.reduce { acc, i -> acc + i }
    // acc -> valor acumulario, i -> valor actual
    println(suma)
    /** Imprime
       * 15
    */

// multiplicando
    val ResMulti = numeros.reduce { acc, i -> acc * i }
    println(ResMulti)
    /** Imprime
       * 120
    */


}