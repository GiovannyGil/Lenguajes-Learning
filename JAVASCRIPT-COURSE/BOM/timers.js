// setTimeOut permite ejecutar una funcion despues de cierto tiempo

setTimeout(()=>{
    console.log('Hola')
},3000)

const Saludo=()=>{
    console.log('saludo')
}
let id
const iniciar = ()=>{
    console.log('Iniciando Timer')
    id = setTimeout(Saludo, 5000)
}
// parar in timer

const parar = ()=>{
    console.log('Parar Timer')
    clearTimeout(id);
}


// setinterval, permite ejecutar ina funcion cada cierto tiempo de forma infinita hasta que el usuario/programador lo decida

let cuenta = 0
let Idd
const iniciar2 = ()=>{
    Idd = setInterval(()=>{
        console.log(cuenta)
        cuenta++ // esto se ejecutará de forma infinita
    },1000)
}
const parar2 = ()=>{
    console.log('cuenta detenida')
    clearTimeout(Idd);
}