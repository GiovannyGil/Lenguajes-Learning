const operacion = (tipo, num1,num2)=>{
    let resultado;


    if (tipo === 'suma'){
        resultado = num1 + num2;
    } else if (tipo === 'resta'){
        resultado = num1 - num2;
    }

    return resultado; // el return es la que me indica que estoy devolviendo al finalizar la función
};


const MiVariable = operacion('suma', 20,10)
console.log(MiVariable);