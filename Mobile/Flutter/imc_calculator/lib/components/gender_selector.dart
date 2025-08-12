import 'package:flutter/material.dart';
import 'package:imc_calculator/core/app_color.dart';
import 'package:imc_calculator/core/text_styles.dart';

class GenderSelector extends StatefulWidget {
  const GenderSelector({super.key});

  @override
  State<GenderSelector> createState() => _GenderSelectorState();
}

class _GenderSelectorState extends State<GenderSelector> {
  String? selectedGender; // inicializado en null con el ?

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        // Hombre
        Expanded(
          child: GestureDetector(
            onTap: () {
              // Seleccionar Hombre -> acción al tocar la opcion de hombre
              setState(() {
                // se llama este metodo cuando se modifica la ui en una app Flutter
                selectedGender = "HOMBRE";
              });
            },
            child: Padding(
              padding: const EdgeInsets.only(
                left: 16,
                top: 16,
                right: 8,
                bottom: 16,
              ),
              child: Container(
                decoration: BoxDecoration(
                  color: selectedGender == "HOMBRE"
                      ? AppColors.backgroundComponentSelected
                      : AppColors.backgroundComponent,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Column(
                    children: [
                      Image.asset(
                        "assets/images/male.png",
                        height: 100,
                        width: 100,
                      ),
                      Text("HOMBRE", style: TextStyles.bodyText),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
        // Mujer
        Expanded(
          child: GestureDetector(
            onTap: () {
              // Seleccionar Mujer -> acción al tocar la opcion de mujer
              setState(() {
                selectedGender = "MUJER";
              });
            },
            child: Padding(
              padding: const EdgeInsets.only(
                left: 8,
                top: 16,
                right: 16,
                bottom: 16,
              ),
              child: Container(
                decoration: BoxDecoration(
                  color: selectedGender == "MUJER"
                      ? AppColors.backgroundComponentSelected
                      : AppColors.backgroundComponent,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Column(
                    children: [
                      Image.asset(
                        "assets/images/female.png",
                        height: 100,
                        width: 100,
                      ),
                      Text("MUJER", style: TextStyles.bodyText),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
