/**
 * ingresar un número entero positivo n y genere la secuencia de Fibonacci hasta el n-ésimo término. 
 * La secuencia de Fibonacci comienza con 0 y 1, y cada número posterior es la suma de los dos números anteriores. 
 * El programa debe imprimir todos los términos de la secuencia hasta el n-ésimo término.
 */

// 0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597
/**
 * 1
 * 1 + 0 = 1
 * 1 + 1 = 2
 * 2 + 1 = 3
 * 3 + 2 = 5
 * 5 + 3 = 8
 * 8 + 5 = 13
 */

const numero = 10

function SecuenciaFibonaci(numero){
    let a = 0
    let b = 1
    let c = 0
    for(let i = 0; i < numero; i++){
        console.log(`${b} = ${a} + ${c}`)
        c = a + b
        a = b
        b = c
    }
}

SecuenciaFibonaci(numero)



/** fun(n)
 *    let a = 0, b = 1, temp;

    console.log("F(0) = " + a);
    if (n > 0) {
        console.log("F(1) = " + b);
    }
 */

/**
    const numero = 10

    function SecuenciaFibonacci(numero){
        let valor = 0
        let secuencia = 1
        let temp
    
        console.log(`${valor} + ${valor} = ${valor}`);
    
        if (numero > 0){
            console.log(`${secuencia} + ${valor} = ${secuencia}`)
        }
    
        for (let index = 2; index <= numero; index++) {
            temp = valor + secuencia
            console.log(`${secuencia} + ${valor} = ${temp}`)
            valor = secuencia
            secuencia = temp
        }
    }
    SecuenciaFibonacci(numero)
*/
    
    
    // function SecuenciaFibonacci(numero){
    //     let fib = [0, 1]
    //     for (let i = 2; i <= numero; i++) {
    //         fib.push(fib[i - 1] + fib[i - 2])
    //     }
    //     return fib        
    // }
    
    // const mostrar = SecuenciaFibonacci(numero)
    // console.log(mostrar);