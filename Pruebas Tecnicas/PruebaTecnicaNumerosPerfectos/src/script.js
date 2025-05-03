// funciuon para manejar el evento submit del formulario
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault() // Se previene el envío del formulario
    
    // Se obtienen los valores de inicio y fin
    const inicio = document.getElementById('inicio').value
    const fin = document.getElementById('fin').value
    // Se validan los valores ingresados
    if (inicio.trim() === '' || fin.trim() === '') {
        alert('Por favor, ingrese ambos números.')
        return
    }

    // Se convierten los valores a números enteros
    const inicioNum = parseInt(inicio)
    const finNum = parseInt(fin)
    // Se valida que los valores ingresados sean válidos
    if (isNaN(inicioNum) || isNaN(finNum) || inicioNum < 1 || finNum < inicioNum) {
        alert('Entrada inválida. Por favor, ingrese números válidos.')
        return
    }

    // Se encuentran los números perfectos en el rango especificado y se muestra el resultado 
    const numerosPerfectos = encontrarNumerosPerfectos(inicioNum, finNum) // Se obtienen los números perfectos
    const source = document.getElementById('template').innerHTML // Se obtiene el contenido del template
    const template = Handlebars.compile(source) // Se compila el template
    const html = template({ numerosPerfectos }) // Se genera el HTML final

    document.getElementById('resultado').innerHTML = html // Se muestra el resultado en la página
})

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