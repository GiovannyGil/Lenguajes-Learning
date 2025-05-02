/**
 * Array.filter
 * 
 * este metodo crea una copia de un metodo anterios, al cual pasa por una prueba de filtro, y solo filtra los elementos que cumplan la condicion o pasen la prueba
 */


const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

// crea una condicion en la que consulta el tañano o cantidad de letras de las palabras, y solo filtra las que tienen más de 6 litras
const result = words.filter((word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]
