function RecorrerArrayEntero(Numero) {
    // Funcion que recorre un array de numeros enteros desde 0 hasta el numero que le pasemos como parametro
    let ArrayEntero = []; // Array vacio
    // Recorremos el array desde 0 hasta el numero que le pasemos como parametro
    for (let i = 0; i <= Numero; i++) {
        // Vamos añadiendo los numeros enteros al array
        // solo añadimos los numeros impares
        if (i % 2 != 0) {
            ArrayEntero.push(i);
        }
        
    }
    return ArrayEntero;

}

console.log(RecorrerArrayEntero(100))