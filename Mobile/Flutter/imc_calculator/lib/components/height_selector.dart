import 'package:flutter/material.dart';
import 'package:imc_calculator/core/app_color.dart';
import 'package:imc_calculator/core/text_styles.dart';

class HeightSelector extends StatefulWidget {
  const HeightSelector({super.key});

  @override
  State<HeightSelector> createState() => _HeightSelectorState();
}

class _HeightSelectorState extends State<HeightSelector> {
  double height = 170; // altura inicial en cm
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 16, right: 16),
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.backgroundComponent,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 8.0),
              child: Text("ALTURA", style: TextStyles.bodyText),
            ),
            Text("${height.toStringAsFixed(0)} cm", style: TextStyle(
              color: Colors.white,
              fontSize: 38,
              fontWeight: FontWeight.bold,
            )),
            Slider(
              value: height, // valor
              onChanged: (value) {
                setState(() {
                  height = value; // actualizar la altura
                });
              },
              min: 150, // altura mínima
              max: 220, // altura máxima
              divisions: 70, // divisiones del slider -> cantidad de valores intermedios/decimales
              label: height.toStringAsFixed(0), // dar nombre a la etiqueta
              activeColor: AppColors.primary,
            ),
          ],
        ),
      ),
    );
  }
}
