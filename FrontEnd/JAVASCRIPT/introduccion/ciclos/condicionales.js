// CONDICIONALES

// IF - ELSE -> Pregunta -> ¿sí se cumple algo?

/*if(){
    bloque código
}
*/
const usuario = {
    edad:19,
    pais:'colombia',
    tikect:true,
};


if (usuario.edad >= 18) {
    console.log('Puede entrar al concierto, es mayor de edad');
} else {
    console.log('No puede entrar. no es mayor de edad')
}

console.log('------------------------------------');



// Condicion con operadores lógicos
if (usuario.edad >= 18 && usuario.tikect){// si es mayor de edad y el tiene ticket
    console.log('Puede Ingresar')
} else {
    console.log('No puede Ingresar')
}

console.log('------------------------------------');


// ANIDAR CONDICIONALES
if (usuario.edad >= 18) {
    if (usuario.tikect) {
        console.log('Puede Ingresar, es mayor de edad y tiene boleto');
    } else {
        console.log('No puede Ingresar, no tiene boleto');
    }
} else {
    console.log('No puede Ingresar, no tiene boleto');
}

// ELSE-IF
console.log('------------------------------------');

if (usuario.pais === 'mexico') {
    console.log('es mexicano');
} else if (usuario.pais === 'colombia'){
    console.log('es colombiano');
} else if(usuario.pais === 'españa'){
    console.log('es español');
} else {
    console.log('No hay datos');
}


