/**
 *  ingresar tres números y determine cuál de ellos es el mayor. El programa debe mostrar un mensaje indicando cuál es el número mayor.
 */


const numeroUno = 4
const numeroDos = 17
const numeroTres = 9

function MayorDeTres(num1, num2, num3){
    const numeros = [num1, num2, num3]
    let numMayor = 0
    for (let index = 0; index < numeros.length; index++) {
        const element = numeros[index]
        if(numMayor < element){
            numMayor = element
        }
        
        console.log('elemet', element);
    }
    console.log('NumMayor Final', numMayor);
}

MayorDeTres(numeroUno, numeroDos, numeroTres)


/** OTRA SOLUCION -> CHATGPT
 * 
 * 
 * function MayorDeTres(num1, num2, num3) {
    const numMayor = Math.max(num1, num2, num3);
    console.log('El número mayor es:', numMayor);
    }
 * 
 */