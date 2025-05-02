//! pasar el texto a MAYUSCULA
val text = "Hello, World!"

val upperText = text.toUpperCase()
println(upperText) // Imprime: HELLO, WORLD!


//! pasar el texto a minuscula
val text = "Hello, World!"

val lowerText = text.toLowerCase()
println(lowerText) // Imprime: hello, world!


//! longitud
val text = "Hello"
println(text.length) // Imprime: 5

//! extraerlo parte de la cadena
val text = "Kotlin Programming"
val subText = text.substring(0, 6) // Desde el índice 0 hasta 5 (el 6 no se incluye)
println(subText) // Imprime: Kotlin

//! limpiar los espacios vacios al inicio y final
val text = "   Kotlin   "
val trimmedText = text.trim()
println(trimmedText) // Imprime: Kotlin


//! reemplazar una parte del texto por otro
val text = "Hello, Kotlin!"
val replacedText = text.replace("Kotlin", "World")
println(replacedText) // Imprime: Hello, World!


//! verifica si una cadena, esta presente en la que se maneja
val text = "Hello, World!"
println(text.contains("World")) // Imprime: true
println(text.contains("Kotlin")) // Imprime: false

//! // verifica si la cadena comienza o temrina con una subcadena especifica
val text = "Kotlin Programming"

println(text.startsWith("Kotlin")) // Imprime: true
println(text.endsWith("Programming")) // Imprime: true

//! divide la cadena o texto en una lista de subcadena, separadas por el delimitador elegido
val text = "Kotlin,Java,Python"
val languages = text.split(",")
println(languages) // Imprime: [Kotlin, Java, Python]

//! devolver el indice donde encuentre la primera coincidencia
val text = "Hello, World!"
println(text.indexOf("o")) // Imprime: 4
//! devolver el indice de la ultima coincidencia
println(text.lastIndexOf("o")) // Imprime: 8

//! verificar si una cadena esta vacia o no (2 formas)
val text1 = ""
val text2 = "Kotlin"

println(text1.isEmpty()) // Imprime: true
println(text2.isNotEmpty()) // Imprime: true
