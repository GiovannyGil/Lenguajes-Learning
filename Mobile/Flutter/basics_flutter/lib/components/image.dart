import 'package:flutter/material.dart';

class ImageExample extends StatelessWidget {
  const ImageExample({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Spacer(),

        // llamar a la imagen de internet
        Image.network(
          'https://media.licdn.com/dms/image/v2/D4E03AQFF5XyC1xWKrA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1708202739696?e=1757548800&v=beta&t=H6gQu9lIvyzO_sVfTXJlFH_PF-CBAfWxJGqDlJtrBSo',
          width: 100,
          height: 100,
        ),

        // llamar a la imagen local
        Image.asset('assets/images/fotoPerfilV1.png', width: 100, height: 100),

        const Spacer(),
      ],
    );
  }
}
