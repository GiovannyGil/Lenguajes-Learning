import 'package:flutter/material.dart';

class TextfieldExample extends StatelessWidget {
  const TextfieldExample({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView( // usar ListView para permitir el desplazamiento si el contenido es más grande que la pantalla (UNA LISTA)
      children: [
        SizedBox(height: 100),
        Padding(
          padding: EdgeInsets.all(8.0),
          child: TextField(
            decoration: InputDecoration(hintText: "ingresa tu email"),
          ),
        ),
        SizedBox(height: 32),
        Padding(
          padding: EdgeInsets.all(8.0),
          child: TextField(
            decoration: InputDecoration(
              hintText: "ingresa tu número de teléfono",
              border: OutlineInputBorder(),
            ),
          ),
        ),
        SizedBox(height: 32),
        Padding(
          padding: EdgeInsets.all(8.0),
          child: TextField(
            decoration: InputDecoration(
              hintText: "ingresa tu nombre",
              prefixIcon: Icon(Icons.person_2_sharp),
              border: OutlineInputBorder(),
            ),
          ),
        ),
        SizedBox(height: 32),
        Padding(
          padding: EdgeInsets.all(8.0),
          child: TextField(
            decoration: InputDecoration(
              hintText: "ingresa tu contraseña",
              prefixIcon: Icon(Icons.lock),
              border: OutlineInputBorder(),
            ),
            obscureText: true, // para ocultar el texto ingresado -> contraseña
          ),
        ),
        SizedBox(height: 32),
        Padding(
          padding: EdgeInsets.all(8.0),
          child: TextField(
            decoration: InputDecoration(
              hintText: "ingresa tu comentario",
              prefixIcon: Icon(Icons.comment),
              border: OutlineInputBorder(),
            ),
            maxLines: 3, // para permitir múltiples líneas de texto
            minLines: 1, // para establecer un número mínimo de líneas
            maxLength: 100, // para limitar el número de caracteres
            keyboardType: TextInputType.multiline, // para permitir múltiples líneas de texto
          ),
        ),
      ],
    );
  }
}
