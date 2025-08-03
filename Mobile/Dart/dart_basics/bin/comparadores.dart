
// ! Operadores de comparación
// Los operadores de comparación se utilizan para comparar dos valores y devolver un valor booleano (true o false).

bool igualA = (5 == 5); // igual a
bool diferenteDe = (5 != 3); // diferente de
bool mayorQue = (5 > 3); // mayor que
bool menorQue = (5 < 3); // menor que
bool mayorOIgualQue = (5 >= 5); // mayor o igual que
bool menorOIgualQue = (5 <= 3); // menor o igual que

// ! Operadores lógicos
// Los operadores lógicos se utilizan para combinar expresiones booleanas.
bool y = (5 > 3) && (8 > 5); // y
bool o = (5 > 3) || (8 < 5); // o
bool no = !(5 > 3); // no

// ! Operadores de identidad
// Los operadores de identidad se utilizan para comparar si dos objetos son el mismo objeto en memoria.
bool sonIdenticos = identical(5, 5); // verifica si son el mismo objeto
bool noSonIdenticos = identical(5, 3); // verifica si no son el mismo objeto

// ! Operadores de asignación
// Los operadores de asignación se utilizan para asignar valores a variables.
int a = 5; // asignación simple
int b = 10; // asignación simple
int c = a + b; // asignación con expresión

// ! Operadores de incremento y decremento
// Los operadores de incremento y decremento se utilizan para aumentar o disminuir el valor de una variable
// deben ir dentro de una expresión, no se pueden usar solos. (funcion o clase)
int x = 5;
// x++; // incremento (equivalente a x = x + 1)
// x--; // decremento (equivalente a x = x - 1)

// ! Operadores de tipo "is"
// Los operadores de tipo se utilizan para verificar el tipo de una variable.
bool esEntero = 5 is int; // verifica si es un entero -> true
bool esString = 'Hola' is String; // verifica si es un String -> true
bool esDouble = 5.0 is double; // verifica si es un double -> true

// ! operador "as"
// El operador "as" se utiliza para hacer una conversión de tipo explícita.
dynamic variable = 'Hola';
String texto = variable as String; // convierte a String


// ! operador "in"
// El operador "in" se utiliza para verificar si un elemento está presente en una colección (como una lista o un mapa).
List<String> lista = ['a', 'b', 'c'];
// bool estaEnLista = 'a' in lista; // verifica si 'a' está en la lista -> true

// ! operador "??"
// El operador "??" se utiliza para proporcionar un valor predeterminado en caso de que una variable sea nula.
String? nombre;
String nombreFinal = nombre ?? 'Desconocido'; // si nombre es nulo, se usa 'Desconocido'

// ! operador "?."
// El operador "?." se utiliza para acceder a propiedades o métodos de un objeto que puede ser nulo.
String? nombreUsuario;
String? saludo = 'Hola, ${nombreUsuario?.toUpperCase()}'; // si nombreUsuario es nulo, no se llama a toUpperCase()

// ! operador "??="
// El operador "??=" se utiliza para asignar un valor a una variable solo si esa variable es nula.
String? nombreCompleto;
// nombreCompleto ??= 'Desconocido'; // si nombreCompleto es nulo, se usa 'Desconocido'

// ! operador "is!"
// El operador "is!" se utiliza para verificar si un objeto no es de un tipo específico
bool noEsEntero = 5 is! int; // verifica si no es un entero -> false
