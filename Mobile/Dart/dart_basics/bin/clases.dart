// class Usuario {
//   String nombre;
//   int edad;

//   Usuario(this.nombre, this.edad);
// }


//* funcion con un constructor y un método
class Usuario {
  String nombre;
  int edad;

  Usuario(this.nombre, this.edad);

  void mostrarInformacion() {
    print('Nombre: $nombre, Edad: $edad');
  }
}

void main() {
  Usuario usuario = Usuario('Juan', 30);
  usuario.mostrarInformacion();
}

// clase básica de Dart
class Persona {
  String nombre = '';
  int edad = 0;

  void saludar() {
    print('Hola, soy $nombre y tengo $edad años');
  }
}


// * crear instancias de la clase
void main2() {
  var persona = Persona();
  persona.nombre = 'Giovanny';
  persona.edad = 30;
  persona.saludar();
}
