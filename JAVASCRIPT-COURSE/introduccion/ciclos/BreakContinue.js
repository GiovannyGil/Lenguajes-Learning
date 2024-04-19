/**
 * Break
 * sirve para detener una condicion, funcion, ciclo etc
 * cuando se cumple la condicion especifica, se detiene el ciclo con break
 */


const nombres = ['Carlos','Cristian', 'Estefania','Erika','Manuel','Laura']
for (let i = 0; i < nombres.length; i++) {
    if (nombres[i][0] !== 'A') { // si encuentra un nombre que no inicie por la letra A, termine la ejecución
        console.log(nombres[i]) // muestra el nombre que no inicia con A
        break;
    } 
    console.log(nombres(i))
}



/**
 * Continue
 * permite saltar a la siguiente iteracion del codigo
 */

const invitados = ['Carlos','Cristian', 'Estefania','Erika','Manuel','Laura']


console.log('Lista de personas aceptadas')

for (let i = 0; i < invitados.length; i++) {
    if(invitados[i] === 'Cristian') { // verifica si existe en invitado
        continue // saltarse a crsitian
    }  
    console.log(invitados[i])
}