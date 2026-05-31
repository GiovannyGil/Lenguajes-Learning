// variables y tipos de datos



// contante -> su valor no cambia
const valorUno = 1;


// conectar al Dom -> id valor
const idValor = document.getElementById('valor');


const nuevoValor = 5;
const nuevoRandom = Math.random(); // generar numero ramdom con librería math

// lista de nuemeros para numero aleatorio
const nuevoRandomList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

// funcion para cambiar el contenido
const cambiarValor = () => {
    idValor.innerText = Math.floor(Math.random() * nuevoRandomList.length) +1; // cambiar el valor del idValor por un numero aleatorio entre 1 y el tamanho de la lista
}

// leer contenido del Dom
console.log('valor de idValor: ', idValor.textContent);