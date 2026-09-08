import 'package:flutter/material.dart';

import 'presentation/pages/home_page.dart';

void main() {
  runApp(const ImOkayApp());
}

class ImOkayApp extends StatelessWidget {
  const ImOkayApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "I'm Okay",
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF4A6FA5)),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}
