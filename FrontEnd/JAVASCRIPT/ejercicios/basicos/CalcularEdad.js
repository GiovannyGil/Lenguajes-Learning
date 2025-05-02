/**
 * pida al usuario ingresar su año de nacimiento y luego calcule y muestre la edad actual.
 */

const FechaNacimiento = new Date('03-01-2001')

function Edad(FechaNacimiento) {
    const fechaNace = new Date(FechaNacimiento);
    const fechaActual = new Date()

    /**
     *  let mes = fechaActual.getMonth();
        let dia = fechaActual.getDate();
        let año = fechaActual.getFullYear();

        fechaActual.setDate(dia);
        fechaActual.setMonth(mes);
        fechaActual.setFullYear(año);
    */

    const edad = Math.floor(((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365));
    return edad;

}

const EdadUser = Edad(FechaNacimiento)
console.log(`Edad: ${EdadUser}`);