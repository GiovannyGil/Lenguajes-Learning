/**
 * CICLOS FOR
 * permite recorres objetos o arreglos una cantidad de veces determinada por el tamaño del objeto o pasado al ciclo
 */


const nombres = ['Carlos','Cristian', 'Estefania','Erika','Maniel','Laura']

// ciclo for 
for (let numero = 0; numero < nombres.length; numero++) {
    console.log(nombres[numero])
}
/**
 * repite el ciiclo mientras cumpla la condicion
 */




// foreach

nombres.forEach((nombre)=>{
    console.log(nombre)
})