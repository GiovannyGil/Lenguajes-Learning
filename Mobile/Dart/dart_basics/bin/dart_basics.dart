
void main(List<String> arguments) {
  // print('Hola!');
  // print('Hola: ${variable}')
}

//* Variables
// las variables en Dart son dinámicas, no es necesario declarar el tipo de dato
// aunque se puede hacer si se desea, las variables se pueden declarar
// se crear con la palabra reservada var, o con el tipo de dato
// tipo nombre = valor;
var name = 'Dart'; // forma generica de declarar una variable dinamica

//* declarar tipos de varaibles
String name2 = 'Dart'; // tipo de dato String - cadena de texto
int age = 10; // tipo de dato int - entero
double height = 1.80; // tipo de dato double

num number = 10; // num es un tipo de dato que puede ser int o double
bool isDart = true; // tipo de dato bool - booleano

// tipo fijos
const String country = 'Colombia'; // constante de tipo String -- se evalua en tiempo de compilación
final String city = 'Bogotá'; // final es una constante que se puede inicializar en tiempo de ejecución - se evalua en tiempo de ejecución

//* convertir variables
String numberString = '10';
int numberInt = int.parse(numberString); // convertir String a int

double numberDouble = double.parse(numberString); // convertir String a double

String numberToString = numberInt.toString(); // convertir int a String

//* Operaciones Matematicas con variables
int a = 1;
int b = 2;
int sum = a + b; // suma -> a += b;
int sub = a - b; // resta -> a -= b;
int mul = a * b; // multiplicación -> a *= b;
double div = a / b; // división --> resultado es un double, por eso la variable debe ser double
int mod = a % b; // módulo/residuo -> a %= b;
int inc = a++; // incremento -> a++; (incrementa a en 1, pero devuelve el valor antes de incrementar)
int dec = b--; // decremento -> b--; (decrementa b en 1, pero devuelve el valor antes de decrementar)


// ! Manejo de nulos
/**
 * * brinda seguridad contra valores nulos
 * es una característica de Dart que ayuda a evitar errores comunes relacionados con valores nulos.
 *
 * String nombre; // -> null
 * print(nombre); // imprime null -> ERROR
 *
 * El modo de usar valores nulos es con el operador de interrogación (?)
 * * String? nombre; // -> null
 * print(nombre); // imprime null -> NO ERROR
 * 
 * if (nombre != null) {
 *   print(nombre); // imprime null -> NO ERROR
 * }
 * print(nombre?.length); // imprime null -> NO ERROR
 * 
 * 
 * El operador de exclamación (!) se utiliza para indicar que una variable no será nula en ese punto del código.
 * String? nombre = null;
 * print(nombre!); // ERROR -> lanza una excepción si nombre es null
 * print(nombre!.length); // ERROR -> lanza una excepción si nombre es null
 * 
 * El operador de coalescencia nula (??) se utiliza para proporcionar un valor predeterminado en caso de que una variable sea nula.
 * String? nombre = null;
 * print(nombre ?? 'Valor por defecto'); // imprime 'Valor por defecto' -> NO ERROR
 * 
*/


// ! Tipo de variable "Lsit<T>" o "List<dynamic>"
// las listas son colecciones ordenadas de elementos, pueden contener elementos de cualquier tipo
List<String> nombres = ['Juan', 'Pedro', 'María']; // lista de Strings
List<int> edades = [20, 30, 25]; // lista de enteros
List<double> alturas = [1.75, 1.80, 1.65]; // lista de dobles
List<bool> esEstudiante = [true, false, true]; // lista de booleanos

List<dynamic> datos = ['Juan', 20, 1.75, true]; // lista de tipo dinámico (puede contener cualquier tipo de dato)

// ! Tipo de variable de agrupaciones/array (Mapas)
// los mapas son colecciones de pares clave-valor, donde cada clave es única
Map<String, int> edadesPorNombre = {
  'Juan': 20,
  'Pedro': 30,
  'María': 25,
}; // mapa que asocia nombres con edades

// ! tipo se variable Set
// los conjuntos (Set) son colecciones no ordenadas de elementos únicos, no permiten duplicados
// se pueden usar para almacenar elementos únicos de cualquier tipo
Set<String> nombresUnicos = {'Juan', 'Pedro', 'María'}; // conjunto de Strings
Set<int> edadesUnicas = {20, 30, 25}; // conjunto de enteros
Set<double> alturasUnicas = {1.75, 1.80, 1.65}; // conjunto de dobles
Set<bool> esEstudianteUnico = {true, false}; // conjunto de booleanos

Set<dynamic> datosUnicos = {'Juan', 20, 1.75, true}; // conjunto de tipo dinámico (puede contener cualquier tipo de dato)

// ! Tipo de variable dinamic
// el tipo dynamic permite que una variable pueda contener cualquier tipo de dato, es similar a var pero más flexible
dynamic variableDinamica = 'Hola'; // puede ser un String
// variableDinamica = 10; // ahora es un int
// variableDinamica = 3.14; // ahora es un double
// variableDinamica = true; // ahora es un bool

// ! Tipo de variable Object
// el tipo Object es el supertipo de todos los tipos en Dart, es similar a dynamic (tipo sabe de todos los objetos)
Object variableObject = 'Hola'; // puede ser un String
// variableObject = 10; // ahora es un int
// variableObject = 3.14; // ahora es un double
// variableObject = true; // ahora es un bool

