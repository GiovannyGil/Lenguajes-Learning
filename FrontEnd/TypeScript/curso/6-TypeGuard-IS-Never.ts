/**
 * uso de type guard, el is y el tipo Never
 * 
 * 
 */

interface Mario {
    nombre: string,
    saltar: () => void
}

interface Sonic {
    nombre: string,
    correr: () => void
}

type Personaje = Mario | Sonic; // type guard -> el personaje puede ser de tipo Mario o Sonic

/**
 * comprobar si el personaje es de tipo Sonic
 * 
 * esta funcion determina si el personaje es de tipo Sonic o no
 */

// determinar si el personaje es de tipo Sonic
function checkIsSinic(personaje: Personaje): personaje is Sonic {
    return (personaje as Sonic).correr !== undefined;
}

// si el personaje es de tipo Sonic, entonces corre, sino(tipo Mario) salta
function jugar(personaje: Personaje) {
    if (checkIsSinic(personaje)) {
        personaje.correr();
    } else {
        personaje.saltar();
    }
}

/**
 * el tipo Never
 */

function fn(x: string | number) {
    if (typeof x === 'string') {
        // hacer algo
    } else if (typeof x === 'number') {
        // hacer algo
    } else {
        // x es de tipo never
    }
}