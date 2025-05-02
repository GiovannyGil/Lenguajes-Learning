// arreglo de valores unicos, aunqeu se repitan el el arreglo, al mostrarlos, solo se veran una UNICA vez
// se permite sets de string, numbers, etc

// crear set
const colores = new Set(['rojo', 'verde', 'amarillo', 'rojo'])

// agregar valor a un set
colores.add('azul')

console.log(colores);


// recorrer un set
colores.forEach((color) => {
    console.log('color: ', color);
})