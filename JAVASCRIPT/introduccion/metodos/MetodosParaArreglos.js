const colores = ['Verde','Azul','Rojo'] // Arreglo
console.log(colores)
//METODOS PARA LOS ARREGLOS

//.length -> contar la cantidad de datos en el  arreglo
console.log(colores.length) // 3

// .toString -> transforma el arreglo en una cadena de texto
console.log(colores.toString()) // "Verde,Azul,Rojo"

// join() -> transforma el arreglo en una cadena de texto y separa cada elemento con  el valor "letra/valor" elegido
console.log(colores.join("-")) // "Verde-Azul-Rojo" 

// sort() -> permite ordenar las cadenas de texto de un arreglo alfabéticamente, con números de forma ordenada, menor a mayor
console.log(colores.sort()) // Azul,Rojo,Verde =/= 1,2,3,4,5

// reverse() ordena texto y números de forma descendente
console.log(colores.reverse()) // 5,4,3,2,1 


// concat() permite unir o "concatenar" arreglos y juntarlos en uno solos
const arr1 = [1,2,4]
const arr2 = [3,5,6]
const arr3 = arr1.concat(arr2) // [1,2,4,3,5,6]

// push() un nuevo elemento al final de un arreglo
colores.push("Amarillo") // ['Verde','Azul','Rojo', 'Amarillo']

// pop() elimina el ultimo elemento del arreglo
colores.pop() // ['Verde','Azul','Rojo']

// shift() elimina el primer elemento, se puede capturar el elemento eliminado

const ColDelete = colores.shift() //['Verde'] =/= ['Azul','Rojo']

// unshift agrega un elemento al inicio del arreglo
colores.unshift("Verde") // ['Verde','Azul','Rojo']

// splice() permite agregar o reemplazar un elemento a un arreglo, eligiendo en la posición elegida
colores.splice(1,0,"Amarillo") // ['Verde','Amarillo','Azul','Rojo'] --> quiero agregar en la posición 1, quiero eliminar 0 elementos, valor a agregar "Amarillo"

// slice permite copiar una parte de un arreglo a otro arreglo, - primer parametro, posiciondonde quiero inciar - segundo parametro, hasta que posicion quiero copiar
const arr4 = arr3.slice(2,4) // 4,3,5

