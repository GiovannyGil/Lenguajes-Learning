// Condicional switch

const usuario = {
    nombre:'Giovanny',
    pais:'Colombia',
};


switch (usuario.pais) {
    case 'Colombia':
        console.log('Colombiano');
        console.log(`es de ${usuario.pais}`);
        break;
    case 'Mexico':
        console.log('Mexicano');
        break;
    case  'España':
        console.log('Español')
        break;
    default:
        console.log('No hay Datos')
        break;
}