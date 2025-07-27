import 'package:dart_basics/dart_basics.dart' as dart_basics;

void main(List<String> arguments) {
  print('Hola!');
  // print('Hola: ${variable}')
}

// Variables
// las variables en Dart son dinámicas, no es necesario declarar el tipo de dato
// aunque se puede hacer si se desea, las variables se pueden declarar
// se crear con la palabra reservada var, o con el tipo de dato
var name = 'Dart'; // forma generica de declarar una variable dinamica

// declarar tipos de varaibles
String name2 = 'Dart'; // tipo de dato String - cadena de texto
int age = 10; // tipo de dato int - entero
double height = 1.80; // tip0o de dato double

num number = 10; // num es un tipo de dato que puede ser int o double
bool isDart = true; // tipo de dato bool - booleano

// tipo fijos
const String country =
    'Colombia'; // constante de tipo String -- se evalua en tiempo de compilación
final String city =
    'Bogotá'; // final es una constante que se puede inicializar en tiempo de ejecución - se evalua en tiempo de ejecución

// convertir variables
String numberString = '10';
int numberInt = int.parse(numberString); // convertir String a int

double numberDouble = double.parse(numberString); // convertir String a double

String numberToString = numberInt.toString(); // convertir int a String

// Operaciones Matematicas con variables
int a = 1;
int b = 2;
int sum = a + b; // suma -> a += b;
int sub = a - b; // resta -> a -= b;
int mul = a * b; // multiplicación -> a *= b;
double div =
    a /
    b; // división --> resultado es un double, por eso la variable debe ser double
int mod = a % b; // módulo/residuo -> a %= b;
int inc =
    a++; // incremento -> a++; (incrementa a en 1, pero devuelve el valor antes de incrementar)
int dec =
    b--; // decremento -> b--; (decrementa b en 1, pero devuelve el valor antes de decrementar)
