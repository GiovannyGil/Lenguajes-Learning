
// ! CONDICIONALES

/**
 * Estructuras de control que permiten ejecutar código de manera condicional.
 * Permiten tomar decisiones en función de condiciones específicas.
 * Se utilizan comúnmente en la programación para controlar el flujo de ejecución.
 * Los condicionales más comunes son: if, else if, else, switch.
 * Los condicionales permiten ejecutar diferentes bloques de código según se cumplan o no ciertas condiciones.
 * 
 */

void main() {
  // ! Condicional if -> else if -> else
  // Se utiliza para ejecutar un bloque de código si una condición es verdadera.
  int edad = 18;

  if (edad < 18) {
    print('Eres menor de edad');
  } else if (edad == 18) {
    print('Tienes la edad exacta para votar');
  } else {
    print('Eres mayor de edad');
  }

  // ! Condicional switch
  // Se utiliza para ejecutar diferentes bloques de código según el valor de una variable.
  String dia = 'Lunes';

  switch (dia) {
    case 'Lunes':
      print('Hoy es lunes');
      break;
    case 'Martes':
      print('Hoy es martes');
      break;
    case 'Miércoles':
      print('Hoy es miércoles');
      break;
    default:
      print('No es un día de la semana válido');
  }

  // ! Condicional ternario
  // Es una forma abreviada de escribir un condicional if-else.
  String resultado = (edad >= 18) ? 'Eres mayor de edad' : 'Eres menor de edad';
  print(resultado);

}