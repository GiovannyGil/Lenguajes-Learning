// validaciones en un formulario

const formulario = document.getElementById('formulario-donacion')


formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const expressionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/

    // acceder a los valores del formulario
    const datos = {
        correo: formulario.correo.value
    }

    // validaciones
    // verificar si el correo es correcto con la expression regular
    if(!expressionRegular.test(datos.correo)){
        console.log('correo invalido');
        return
    }

    console.log(datos);
})