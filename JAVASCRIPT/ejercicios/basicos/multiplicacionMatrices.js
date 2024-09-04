/**
 * realice la multiplicación de dos matrices 2x2. 
 * El programa debe solicitar al usuario ingresar los valores de las dos matrices y luego calcular la matriz resultante de la multiplicación. 
 * Finalmente, debe mostrar la matriz resultante en la consola.
 */

const Matriz1 = ['1', '2', '3', '4', '5']
const Matriz2 = ['a', 'b', 'c', 'd', 'e']



function UnificacionMatrices(M1, M2){
    let MatrizResultado = []

    for (let i = 0; i < M1.length; i++) {
        const elementI = M1[i];
        //console.log(elementI);
    
        for (let j = 0; j < M2.length; j++) {
            const elementJ = M2[j];
            //console.log(elementJ);

            MatrizResultado = [elementI, elementJ]
            
            console.log(MatrizResultado);
        }
    }
}


//UnificacionMatrices(Matriz1, Matriz2)


// Definición de las matrices 2x2
const MatrizUno = [
    [1, 2],
    [3, 4]
  ];
  
  const MatrizDos = [
    [5, 6],
    [7, 8]
  ];
  
  function MultiplicacionMatrices(M1, M2) {
      let MatrizResultado = [
          [0, 0],
          [0, 0]
      ];
  
      // Calcular el valor de cada elemento en la matriz resultante
      MatrizResultado[0][0] = M1[0][0] * M2[0][0] + M1[0][1] * M2[1][0];
      MatrizResultado[0][1] = M1[0][0] * M2[0][1] + M1[0][1] * M2[1][1];
      MatrizResultado[1][0] = M1[1][0] * M2[0][0] + M1[1][1] * M2[1][0];
      MatrizResultado[1][1] = M1[1][0] * M2[0][1] + M1[1][1] * M2[1][1];
  
      // Imprimir la matriz resultante
      console.log("Matriz Resultante:");
      console.log(MatrizResultado[0][0] + " " + MatrizResultado[0][1]);
      console.log(MatrizResultado[1][0] + " " + MatrizResultado[1][1]);
  }
  
  MultiplicacionMatrices(MatrizUno, MatrizDos);
  