/***
 *  ingresar dos números enteros positivos (un rango) y luego muestre todos los números primos que se encuentran dentro de ese rango.
 * 
 */


const numero1 = 10
const numero2 = 20

function NumerosPrimosRango(num1, num2){
    let Primos = []

    for (let i = num1; i < num2; i++) {
        if(i % i == 0 && i % 2 != 0 && i % 5 != 0){
            Primos.push(i)
        }

    }
    return Primos
}


NumerosPrimosRango(numero1, numero2)
console.log(NumerosPrimosRango(numero1, numero2))