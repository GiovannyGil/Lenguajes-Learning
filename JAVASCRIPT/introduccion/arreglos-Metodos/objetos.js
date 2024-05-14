//OBJETOS


// -> {Propidad:Valor}

const personaObj = {
    nombre:'Gio',
    edad:22,
    correo:'correo@correo.com',
    subs:{
        web:true,
        correo:true,
    },
    saludo: function(){
        alert('Hola!!')
    }
}
console.log(personaObj) // mostrar todo el objeto
console.log(personaObj.nombre) // mostrar solo el nombre
console.log(personaObj['edad']) // mostrar solo la edad
console.log(personaObj.subs.correo) // mostrar el valor bool del correo de subs

// agregar una nueva propiedad al obj
personaObj.pais = 'Colombia'; // con el valor deseado
console.log(personaObj);

 personaObj.saludo(); // acceder al metodo del obj
