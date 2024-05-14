// href obtener la url de la pagina actual
console.log(window.location.href)

// hostname obtener el host de la pagina actual+
console.log(window.location.hostname)


// pathname obtener la ruta y archivo de la pagina actual
console.log(location.pathname)

// protocol obtener el protocolo utilizado
console.log(location.protocol)


// redirigir
const cargaDoc = () =>{
    location.assign('https://www.google.com')
}

// history
const Regresar = ()=>{
    history.back() // volver a la pagina anterior
    history.forward() // volver a la pagina siguiente/adelante
}