const  usuario = {
    nombre : 'Carlos',
    edad : 27,
    amigos: ['Alejandro', 'Cesar', 'Manuel'],
    saludo: ()=>{console.log('saludo')},
}

// MÉTODOS PROPIOS -> Métodos creados por los mismos programadore
usuario.saludo()



// Object.keys me devuelve un arreglo que contiene los nombres de las propiedades

// usar el metodo object.key
Object.keys(usuario)


// Object.values me devuelve un arreglo que contiene los valores de las propiedades
Object.values(usuario)


// Object.entries me devuelve un arreglo que contiene los nombres de las propiedades y los valores de las propiedades
Object.entries(usuario)







