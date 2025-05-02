// tipar funciones

/** forma 1
 *  :{name:string, age:number} <-- tipado
 */
function saludar({name,age}:{name:string, age:number}){
    console.log(`Hola ${name}, tienes ${age} años`)
}


/**forma 2
 * persona: {name:string,age:number}
 * 
 */
function saludar2(persona: {name:string,age:number}){
    const {name,age}=persona; // sacar de persona
    console.log(`Hola ${name}, tienes ${age} años`)
}

function despedir({name,age}:{name:string, age:number}):number{
    console.log(`Adios ${name}, de ${age} años`)
    return age // infiere el tipo de dato de salida 
}

saludar({name:'Gio', age:22});

// otras formas de declarar y tipar funciones (arrow function)

// recomendada
const sumar = (a:number,b:number):number =>{
    return a+b
}

const restar: (a:number,b:number)=> number = (a,b) =>{
    return a-b
}


// tipo never, es para una funcioon que nunca va a devolver nada
// tipo void, es que no devulve nada, puede hacerlo, pero no se quiere hacerlo