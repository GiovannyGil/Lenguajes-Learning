/**
 * Array.sort
 * 
 * 
 * es un metodo que organiza de forma ascendente o alfabetica un array modificandolo
 * 
 * hace la modificacion pasando todos los valores a tipo string
 */

const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// Expected output: Array ["Dec", "Feb", "Jan", "March"]

const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// Expected output: Array [1, 100000, 21, 30, 4]


const numbers = [1,5,7,2,3,6,9,0,4,8]
numbers.sort()
console.log(numbers)
