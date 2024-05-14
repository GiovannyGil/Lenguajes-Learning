/**
 * ALertas, 3 tipos
 * da informacion al usuario sobre algo
 */

// ALert = regular
//alert('HI!')


// COnfirm = de confirmación, verdadero/falso -> aceptar/cancelar

const Ingresar =()=>{
    const accesoP = confirm('es mayor de edad')
    if (accesoP) {
        alert('Bienvenido')
    } else {
        alert('Denegado')
    }
}


// prompt = Ventana con input, donde el usuario puede escribir

const Saludo = ()=>{
    const nombre = prompt('Escribe un nombre')
    alert(`Hola ${nombre}`)
}