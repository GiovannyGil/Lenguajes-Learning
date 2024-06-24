/**
 * toReversed
 * 
 * es la contraparte de copia del método reverse(). Devuelve una nueva matriz con los elementos en orden inverso.
 * 
 * es decir, devuelve a su estado original una matriz modifcada con reverse()
 */


const items = [1, 2, 3];
console.log(items); // [1, 2, 3]

const reversedItems = items.toReversed();
console.log(reversedItems); // [3, 2, 1]
console.log(items); // [1, 2, 3]
