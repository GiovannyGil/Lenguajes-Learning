/**
 * permite crear clases, usando las propiedades y métodos de otras clases ya existentes
 */


class Usuario{
    constructor(usuario,password){
        this.usuario = usuario
        this.password = password
    }


    obtenerPosts(){
        const posts = ['posts1', 'posts2', 'posts3']
        return posts
    }
}

// clases con herencia, con extends y de donde o cual clase se hereda

class Moderador extends Usuario{
    constructor(usuario,password,permisos){
            super(usuario,password) // copiar los métodos y propiedades de la clase original, incluyendo el constructor
            this.permisos = permisos
        }

        // método borrar posts, si recibe el 'borrar'
        borrarPosts(id){
            if (this.permisos.includes('borrar')) {
                console.log('El posts ha sido borrado')
            } else {
                console.log('No tienes permisos para borrar posts')
            }
        }
}

// nuevo objeto usuario
const usuario = new Usuario('Carlos','123')
console.log(usuario.obtenerPosts())


// objeto con herencia moderador
const usuario2 = new Moderador('Andres','123', ['borrar','editar'])
console.log(usuario2.obtenerPosts())
console.log(usuario2.permisos)
usuario2.borrarPosts(3)



