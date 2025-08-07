import 'package:basics_flutter/components/button.dart';
import 'package:basics_flutter/components/image.dart';
import 'package:basics_flutter/components/text.dart';
import 'package:basics_flutter/components/textField.dart';
import 'package:basics_flutter/layouts/Column.dart';
import 'package:basics_flutter/layouts/Row.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          // barra de navegación superior -> header
          centerTitle: true, // centrar el título
          title: const Text('Flutter Basics'), // título de la app
          backgroundColor: const Color(
            0xFFE90376,
          ), // color de fondo de la barra de navegación
          foregroundColor:
              Colors.white, // color del texto de la barra de navegación
          actions: [
            // acciones de la barra de navegación -> en este caso botones/iconos
            IconButton(
              icon: const Icon(Icons.add),
              onPressed: () {
                print('Add button pressed');
              },
            ),
          ],
        ),

        backgroundColor: const Color(
          0xFF03E9AF,
        ), // color de fondo de la pantalla por defecto (si asi lo queiro)

        body: const ImageExample(), // llamar el widget principal de mi app

        floatingActionButton: FloatingActionButton(
          onPressed: () {}, // botón flotante
          tooltip:
              'Add', // texto que aparece al mantener presionado el botón flotante (acción)
          backgroundColor: const Color(
            0xFFE90376,
          ), // color de fondo del botón flotante
          child: const Icon(Icons.add), // icono del botón flotante
        ),

        bottomSheet: Container(
          // contenedor para el pie de página
          width: double.infinity, // usar todo el ancho de la pantalla
          color: const Color(0xFF6320A1), // color de fondo del pie de página
          padding: const EdgeInsets.all(16.0), // padding del pie de página
          height: 50, // altura del pie de página
          child: const Center(
            child: Text('Footer'),
          ), // texto centrado en el pie de página
        ),
      ),
    );
  }
}
