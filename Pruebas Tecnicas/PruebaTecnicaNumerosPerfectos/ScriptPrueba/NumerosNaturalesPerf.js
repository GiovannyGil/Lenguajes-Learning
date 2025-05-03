// funcion para determinar si un nuemro es perfecto
function esNumeroPerfecto(numero) {
    let sumaDivisores = 0 // Se inicializa la suma de los divisores en 0
    //  Se recorre la mitad de los números menores al número a evaluar
    for (let i = 1; i <= numero / 2; i++) {
        if (numero % i === 0) {
            sumaDivisores += i // Se suma el divisor al total
        }
    }
    return sumaDivisores === numero // Se retorna si la suma de los divisores es igual al número
}

// Función para encontrar los números perfectos en un rango
function encontrarNumerosPerfectos(inicio, fin) {
    let numerosPerfectos = [] // Se inicializa el arreglo de números perfectos
    // Se recorre el rango de números
    for (let i = inicio; i <= fin; i++) {
        //  Si el número es perfecto, se agrega al arreglo
        if (esNumeroPerfecto(i)) {
            numerosPerfectos.push(i) // Se agrega el número al arreglo
        }
    }
    return numerosPerfectos // Se retorna el arreglo de números perfectos
}

// Se exporta la función para encontrar números perfectos en un rango
const readline = require('readline').createInterface({
    input: process.stdin, // Se crea la interfaz de lectura
    output: process.stdout // Se crea la interfaz de escritura
})

// Se solicita al usuario que ingrese el rango de números
readline.question('Ingrese el inicio del rango: ', inicio => {
    readline.question('Ingrese el fin del rango: ', fin => {

        // Se convierten los valores a números enteros
        const inicioNum = parseInt(inicio)
        const finNum = parseInt(fin)

        // Se valida que los valores ingresados sean válidos
        if (isNaN(inicioNum) || isNaN(finNum) || inicioNum < 1 || finNum < inicioNum) {
            console.log('Entrada inválida. Por favor, ingrese números válidos.')
        } else {
            // Se encuentran los números perfectos en el rango especificado
            const numerosPerfectos = encontrarNumerosPerfectos(inicioNum, finNum)
            if (numerosPerfectos.length === 0) {
                console.log('No se encontraron números perfectos en el rango especificado.');
            } else {
                console.log('Números perfectos encontrados en el rango:')
                console.log(numerosPerfectos.join(', '))
            }
        }
        //  Se cierra la interfaz de lectura
        readline.close()
    })
})
