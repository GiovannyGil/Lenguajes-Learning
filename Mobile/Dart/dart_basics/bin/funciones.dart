
// ! Funciones en Dart

// Las funciones son bloques de código reutilizables que realizan una tarea específica.
// Se pueden definir funciones con o sin parámetros, y pueden devolver un valor o no.

// tipoDeRetorno nombreFuncion(parámetros) {
//   cuerpo
//   return valor; // en caso de que la función tenga un tipo de retorno
// }

void saludar() {
  print('¡Hola, mundo!');
}

int sumar(int a, int b) {
  return a + b;
}
double dividir(double a, double b) {
  if (b == 0) {
    throw Exception('No se puede dividir por cero');
  }
  return a / b;
}

String concatenar(String a, String b) {
  return a + b;
}

String? obtenerNombre() {
  return 'Juan';
}

// llamar a las funciones
void main() {
  saludar(); // Llama a la función sin parámetros
  int resultadoSuma = sumar(5, 3); // Llama a la función con parámetros
  print('Resultado de la suma: $resultadoSuma');

  try {
    double resultadoDivision = dividir(10, 2); // Llama a la función de división
    print('Resultado de la división: $resultadoDivision');
  } catch (e) {
    print('Error: $e');
  }

  String resultadoConcatenacion = concatenar('Hola, ', 'mundo!'); // Llama a la función de concatenación
  print(resultadoConcatenacion);

  String? nombre = obtenerNombre(); // Llama a la función que devuelve un valor
  print('Nombre obtenido: $nombre');
}

// * Arrow Functions
// int multiplicar(int x, int y) => x * y;

// void saludar() => print('Hola');


// * Funciones anónimas (lambdas)
// var nombres = ['Ana', 'Luis', 'Pedro'];

// nombres.forEach((nombre) {
//   print('Hola $nombre');
// });


// * funciones como parámetros
// void ejecutarOperacion(int a, int b, int Function(int, int) operacion) {
//   print('Resultado: ${operacion(a, b)}');
// }

// int sumar(int x, int y) => x + y;

// ejecutarOperacion(2, 3, sumar); // Resultado: 5

// * funciones con parámetros opcionales
// void saludar(String nombre, [String? apellido]) {
//   if (apellido != null) {
//     print('Hola $nombre $apellido');
//   } else {
//     print('Hola $nombre');
//   }
// }
