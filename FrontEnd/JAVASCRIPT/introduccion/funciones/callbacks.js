/**
 * Callbacks
 * es una función que funciona como parámetro que retorna información la cual podemos usar
 */

const obtenerPostsDeUsuario = (usuario, callback)=>{
    console.log('Obteniendo los posts de usuario')

    setTimeout(()=>{
        let posts = ['post1', 'post2', 'post3'];
    },2000)
}

obtenerPostsDeUsuario('Juan', (posts)=>{
    console.log(posts)
})