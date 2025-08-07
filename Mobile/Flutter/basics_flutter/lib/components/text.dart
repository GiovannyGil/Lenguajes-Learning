import 'package:flutter/material.dart';

class TextExample extends StatelessWidget {
  const TextExample({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [
        Spacer(),
        Text('Texto básico'),
        Text('Texto grande', style: TextStyle(fontSize: 24)),
        Text(
          'Texto grande',
          style: TextStyle(fontWeight: FontWeight.w700, fontSize: 30),
        ),
        Text('Texto curvado', style: TextStyle(fontStyle: FontStyle.italic)),
        Text('Texto color', style: TextStyle(color: Colors.red, fontSize: 24, backgroundColor: Colors.amberAccent)),
        Text('Texto decorator', style: TextStyle(fontSize: 24, decoration: TextDecoration.lineThrough, decorationColor: Colors.blue, decorationStyle: TextDecorationStyle.solid, decorationThickness: 2)),
        Text('Texto espaciado entre letras', style: TextStyle(letterSpacing: 5, fontSize: 20)),
        Text(
          'Texto largo con overflow y ellipsis para que no se salga del contenedor y se muestre "..." al final',
          style: TextStyle(fontSize: 20),
          maxLines: 2, // máximo de líneas a mostrar
          overflow: TextOverflow.ellipsis, // para que no se salga del contenedor
        ),

        Spacer(),
      ],
    );
  }
}
