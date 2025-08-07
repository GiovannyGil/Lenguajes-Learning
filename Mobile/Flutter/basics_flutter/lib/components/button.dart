import 'package:flutter/material.dart';

class ButtonExample extends StatelessWidget {
  const ButtonExample({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Spacer(),

        ElevatedButton(
          onPressed: () {
            "presionado";
          },
          child: Text("Elevated"),
          onLongPress: () {
            print("Botón 1 presionado");
          },
          style: ButtonStyle(
            backgroundColor: WidgetStateProperty.all(Colors.red),
          ),
        ),

        OutlinedButton(
          onPressed: () {
            "Outlined";
          },
          child: Text("Botón 2"),
        ),

        TextButton(
          onPressed: () {
            "Text";
          },
          child: Text("Botón 3"),
        ),

        FloatingActionButton(onPressed: () {}, child: Icon(Icons.add)),

        IconButton(onPressed: () {}, icon: Icon(Icons.favorite)),

        Spacer(),
      ],
    );
  }
}
