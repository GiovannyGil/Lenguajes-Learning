interface Avengers {
    name: string
    powerScore: number
    wonBattles: number
    age: number
}

// crear una clase que implemente la interfaz Avengers
class Avengers implements Avengers {
    // readonly name: string // nombre de solo lectura
    // private powerScore: number // propiedad privada (solo se puede acceder desde la clase) en TS se declara la palabra reservada private
    // readonly #wonBattles: number = 0 // valor por defecto, tambien es de solo lectura y privada(con el -> # se hace privada en JS)

    constructor(name: string, powerScore: number) {
        this.name = name
        this.powerScore = powerScore
    }

    // metodo traer/mostrar la informacion del avenger
    get fullName() {
        return `${this.name} - score: ${this.powerScore}`
    }

    set power(newPower: number) {
        if (newPower <= 100) {
            this.powerScore = newPower
        } else {
            console.log('El poder no puede ser mayor a 100')
        }
    }
}


// crear un objeto de tipo Avenger
const antman = new Avengers('Antman', 50)


/**
 * TIpos de propiedadesS
 * 
 * Publicas(PUBLIC) -> se puede acceder desde cualquier lugar, por defecto
 * 
 * Privadas(PRIVATE) -> solo se puede acceder desde la clase
 * 
 * Protegidas(PROTECTED) -> se puede acceder desde la clase y las clases que heredan de ella
 */



