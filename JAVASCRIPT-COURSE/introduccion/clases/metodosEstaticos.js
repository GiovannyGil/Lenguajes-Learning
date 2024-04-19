/**
 * 
 */

class Usuario{
    constructor(usuario,correo){
        this.usuario = usuario
        this.correo = correo
    }

    static borrar(id_user){
        console.log(`borrar usuario: ${id_user}`)
    }

    static registrados = 1000

}


//const user = new Usuario('Carlos','correo@correo.com')
//console.log(user.borrarUsuario(1))



// usar métodos y propiedades estáticas sin tener que iniciar un objeto primero
Usuario.borrar(1)
console.log(Usuario.registrados)