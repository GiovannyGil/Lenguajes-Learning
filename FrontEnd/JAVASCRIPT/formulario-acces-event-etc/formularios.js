document.getElementById('btnEnviar').addEventListener('click', (e) => {
    e.preventDefault() //prevenir el comportamiento por defecto (no se refresque)

    // acceder a la informacion de un input
    const correo = document.querySelector('#formulario-donacion [name="correo"]') // acceder a la valor del input correo
    console.log(correo.value);

    // acceder a la informacion de un selectbox
    console.log(document.forms['formulario-donacion']['pais'].value);
  
    // acceder a la informacion de un radio buttom
    const formulario = document.forms['formulario-donacion']
    console.log(formulario['donacion'].value);

    // acceder a la fecha
    console.log(formulario.fecha.value);

    // acceder a la informacion de un checkbox
    console.log(formulario['terminos-y-condiciones'].checked);
})