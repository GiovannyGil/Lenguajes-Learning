/**
 * ingresar dos matrices de tamaño 𝑛×𝑚 (número de filas y columnas) y luego sume ambas matrices. 
 * El programa debe mostrar la matriz resultante de la suma.
 */

// Función para sumar dos matrices de tamaño n x m
function sumarMatrices(matrizA, matrizB) {
    // Verificamos que ambas matrices tengan el mismo número de filas y columnas
    if (matrizA.length !== matrizB.length || matrizA[0].length !== matrizB[0].length) {
        console.log("Las matrices deben tener el mismo tamaño");
        return;
    }

    // Creamos una nueva matriz vacía para almacenar el resultado
    let matrizResultado = [];

    // Recorremos cada fila de las matrices
    for (let i = 0; i < matrizA.length; i++) {
        let filaResultado = [];
        // Recorremos cada columna de las matrices
        for (let j = 0; j < matrizA[i].length; j++) {
            // Sumamos los elementos de la misma posición en ambas matrices
            filaResultado.push(matrizA[i][j] + matrizB[i][j]);
        }
        // Añadimos la fila resultante a la matriz de resultado
        matrizResultado.push(filaResultado);
    }

    // Retornamos la matriz con los resultados
    return matrizResultado;
}

// Ejemplo de matrices de 2x3
let matrizA = [
    [1, 2, 3],
    [4, 5, 6]
];

let matrizB = [
    [7, 8, 9],
    [10, 11, 12]
];

// Llamada a la función y almacenamos el resultado
let matrizSuma = sumarMatrices(matrizA, matrizB);

// Imprimimos la matriz resultante
console.log("Matriz resultante de la suma:");
console.table(matrizSuma);
