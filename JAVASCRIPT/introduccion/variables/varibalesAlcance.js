//GLOBALES
/*
Puedo acceder a ellas desde cualquier parte del código
-> const, let, var
*/

let nombre = 'Gio' //<-- variable global

function saludo(){
    console.log(`Hola ${nombre}`) //<-- variable global usada en una función
}



//LOCALES
/*
solo las puedo usar en la función donde fue creada y limitada
*/

function saludar(){
    let nombre = 'Juan' //<-- variable local
    console.log(`Hola ${nombre}`)
}



//BLOQUE

/* 
pertenecen las variables const y let y las que sean creadas en un bloque "{}", solo se puede acceder a ellas en el bloque donde se crearon

si se crea una variable con var en un bloque, si se puede acceder a ella desde afuera
*/

const edad = 19;
if(edad>=18){
    const accesoPermitido = true // variable de bloque

    if(true){
        console.log(accesoPermitido) // accede
    }

    const miFunción = () => {console.log(accesoPermitido)}
    miFunción() // accede
}

console.log(accesoPermitido) // error, no puede acceder a la variable de bloque

