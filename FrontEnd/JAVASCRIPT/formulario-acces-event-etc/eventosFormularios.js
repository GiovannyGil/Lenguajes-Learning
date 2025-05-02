const formulario = document.forms['formulario-donacion']

// evento submit -> intentar enviar el formulario


formulario.addEventListener('submit', (e) => {
    e.preventDefault() 
    console.log('enviando datos');
})

// evento change -> cambio de valor (input, select, textarea, etc)
formulario.pais.addEventListener('change', (e) => {
    console.log('cambio de pais -> ' + e.target.value);
})

formulario['cantidad-5'].addEventListener('change', (e) => console.log('cambio de cantidad -> ' + e.target.value))
formulario['cantidad-10'].addEventListener('change', (e) => console.log('cambio de cantidad -> ' + e.target.value))

// focus -> detecta cuando un elemento recibe un "click"

formulario.correo.addEventListener('focus', () => {
    console.log('focus en correo');
})

// blur -> cuando un input pierde el foco/focus

formulario.correo.addEventListener('blur', () => {
    console.log('el input correo ya no es el foco');
})


// keydown -> tecla presionada sobre un input

formulario.correo.addEventListener('keydown', (e) => { console.log(e);})

// keyup -> tecla liberada/levantada sobre un input
formulario.correo.addEventListener('keyup', (e) => {console.log(e);})