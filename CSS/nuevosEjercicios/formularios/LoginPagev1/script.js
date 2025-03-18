const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

// agregar un evento al boton de registro
registerBtn.addEventListener('click', () => {
    container.classList.add('active'); // agregar la clase active al contenedor

})


// agregar un evento al boton de login
loginBtn.addEventListener('click', () => {
    container.classList.remove('active'); // quitar la clase active al contenedor

})