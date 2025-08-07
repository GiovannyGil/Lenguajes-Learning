/**
 * Crear estructura base con STL -> selecciona primera opción
 */

import 'package:flutter/material.dart';

class ColumnExample extends StatelessWidget {
  const ColumnExample({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color(0xFF03E9AF),
      width: MediaQuery.of(context).size.width * 0.5, // usar el 50% del ancho de la pantalla
      // usar todo el ancho de la pantalla // width: MediaQuery.of(context).size.width, or width: double.infinity,
      // height: 500,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        mainAxisSize: MainAxisSize.max,
        crossAxisAlignment: CrossAxisAlignment.center,

        children: const [Text('Hello World!'), Text('Welcome to Flutter!')],
      ),
    );
  }
}
