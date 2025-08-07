import 'package:flutter/material.dart';

class RowExample extends StatelessWidget {
  const RowExample({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 86.0, left: 16.0, right: 16.0),
      child: Container(
        height: double.infinity, // usar todo el alto de la pantalla
        child: const Row(
          mainAxisAlignment: MainAxisAlignment.center, // vertical alignment
          crossAxisAlignment: CrossAxisAlignment.center, // horizontal alignment
          // mainAxisSize: MainAxisSize.max, // todo el espacio disponible
          children: [
            Text(
              'Hello World!',
              style: TextStyle(fontSize: 12),
              selectionColor: Color.fromARGB(255, 12, 236, 180),
            ),
            Spacer(), // espacio entre los textos
            Expanded(
              child: Text(
                'Welcome to Flutter!',
                style: TextStyle(fontSize: 12),
                selectionColor: Color(
                  0xFF03E9AF, // color del texto
                ),
              ),
            ),
            Spacer(), // espacio entre los textos
            Text(
              'Enjoy coding!',
              style: TextStyle(fontSize: 12),
              selectionColor: Color.fromARGB(255, 12, 236, 180),
            ),
          ],
        ),
      ),
    );
  }
}
