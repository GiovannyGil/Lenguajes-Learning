// MÉTODOS PARA ARREGLOS PARTE DOS

// indexOf() conocer el primer elemento de un arreglo, o el que deseo buscar, pasando como parámetro el valor del elemento

const dias = ['Lunes', 'Martes', 'Miércoles','Jueves','Viernes','Sábado', 'Domingo']
dias.indexOf() // Lunes
dias.indexOf("Miércoles") // 2  

// indexOf() conocer el ultimo elemento de un arreglo, también se usa si hay elementos repetidos, muestra el indice del ultimo
dias.lastIndexOf()


// .forEach() sirve para recorrer el arreglo y permite acceder al valor del elemento y modificar o realizar funciones con el
dias.forEach((dia, index)=>{
    console.log(`Hoy es ${dia} (${index})`) // hola de todos los dias del arreglo => recorriendo el arreglo
})


// find recorre un arreglo y permite ejecutar una función por cada elemento, pero devuelve el primer elemento de la función

const resultado = dias.find((dia)=>{
    if (dia[0] === 'M'){
        return dia
    }
})
//console.log(resultado)



// map ejecuta una funcion por cada elemento del arreglo, pero crea un nuevo arreglo que contiene los elementos que devolvamos, con los resultados especificados, si alguno de los elementos no cumple alguna condicion, retorna un indefinido

const nuevosDias = dias.map((dia)=>{
    return dia.toUpperCase() // transformar los elementos a mayúsculas
})
console.log(nuevosDias)


// filter permite ejecutar una funcion por cada elemento, crea un arreglo que contiene los resultados de la funcion, este arreglo solamente trae los resultados que cumplan con una condicion

const newDias = dias.filter(()=>{
    if(dias.length === 5){
        return dias
    }
})

console.log(newDias)


// includes() verifica si el arreglo contiene un elemento especificado

const nuevosDias2 = dias.includes("Lunes") // elemento que busco
console.log(nuevosDias2)

// every permite ejecutar una condicion por cada elemento y devuelve V o F si todos los elementos cumplen con la condicion o no

const NuevDias = dias.every((dia) => {
    if (typeof dia === 'string'){
            return true
        } else {
            return false
        }
})
console.log(NuevDias)



// some similar a every, solo que devuelve verdadero conque solo haya un solo elemento que cumpla la condición, si ninguno la cumple, es falso

const nuevosDias3 = dias.some((dia) => {
    if (typeof dia !== 'string'){
            return true
        } else {
            return false
        }
}) 
console.log(nuevosDias3)