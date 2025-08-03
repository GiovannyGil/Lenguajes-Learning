
// ! BUCLES

void main() {
  //* Bucle for
  //   for (inicialización; condición; incremento) {
  //   código a ejecutar
  // }

  for (int i = 0; i < 5; i++) {
    print('Iteración: $i');
  }

  //* Bucle for-in
  // for (var elemento in lista) {
    // código con elemento
  // }
  List<String> lista = ['a', 'b', 'c'];
  for (var elemento in lista) {
    print('Elemento: $elemento');
  }

  //* Bucle forEach
  // lista.forEach((elemento) {
  //   código con elemento
  // });
  lista.forEach((elemento) {
    print('Elemento forEach: $elemento');
  });
  

  //* Bucle while
  //   while (condición) {
  //   código a ejecutar
  // }
  int j = 0;
  while (j < 5) {
    print('Iteración: $j');
    j++;
  }

  //* Bucle do-while
  //   do {
  //   código a ejecutar
  //   } while (condición);
  // El código se ejecuta al menos una vez, incluso si la condición es falsa.
  int k = 0;
  do {
    print('Iteración: $k');
    k++;
  } while (k < 5);
}