// primera version de la funcion -> sin mucho contexto
function f(x, y, z) {
    let a = x + y; // a = suma de x + y
    let b = a * z; // b = multiplicacion de a * z
    let c = Math.sin(b); // c = seno de b
    return c; // devuelve c
}

// segunda version de la funcion -> con mas contexto
function HallarElSeno(x, y, z) {
    // Paso 1: Suma de x e y
    let suma = x + y;
  
    // Paso 2: Multiplicación de la suma por z
    let producto = suma * z;
  
    // Paso 3: Cálculo del seno del producto
    let senoResultado = Math.sin(producto);
  
    // Paso 4: Devuelve el resultado final
    return senoResultado;
  }


console.log(f(1, 2, 3))
console.log('------------------------------')
console.log(HallarElSeno(1, 2, 3))