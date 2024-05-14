/**
 * PROMESAS
 * 
 * estructuras que se pueden definir para decirle al navegador que espere, que se haga una operación, y que se le envía un aviso y datos para recibir una respuesta
 */

// definir promesas

const promesa = new Promise((resolve, reject)=>{
    // acción que se quiere ejecutar, cuando este listo
    setTimeout(()=>{
        const exito = false
        if(exito){
            resolve('éxito')
        }else{
            reject('error')
        }
    },4000)
})


// llamar la promesa, cuando la operación tenga éxito, ejecutar esta función
promesa.then((mensaje)=>{
    alert(mensaje)
})
// llamar la promesa, cuando la operación falle, ejecutar esta función
promesa.catch((mensaje)=>{
    alert(mensaje)
})