

// ! Tipo de variable "Lsit<T>" o "List<dynamic>"
// las listas son colecciones ordenadas de elementos, pueden contener elementos de cualquier tipo
List<String> nombres = ['Juan', 'Pedro', 'María']; // lista de Strings
List<int> edades = [20, 30, 25]; // lista de enteros
List<double> alturas = [1.75, 1.80, 1.65]; // lista de dobles
List<bool> esEstudiante = [true, false, true]; // lista de booleanos

List<dynamic> datos = [
  'Juan',
  20,
  1.75,
  true,
]; // lista de tipo dinámico (puede contener cualquier tipo de dato)

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

Set<dynamic> datosUnicos = {
  'Juan',
  20,
  1.75,
  true,
}; // conjunto de tipo dinámico (puede contener cualquier tipo de dato)
