import 'package:flutter/material.dart';

import '../../domain/entities/check_in_window.dart';
import '../../domain/entities/contact.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  static const _window = CheckInWindow(
    id: 'window-morning',
    userId: 'user-amina',
    startHour: 8,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
  );

  static const _contact = Contact(
    id: 'contact-sara',
    userId: 'user-amina',
    name: 'Sara',
    phone: '+1-555-0100',
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("I'm Okay")),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Daily check-in',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 8),
            const Text(
              'Tap once during your window. If you miss it, someone you trust '
              'hears from the app.',
            ),
            const SizedBox(height: 24),
            ListTile(
              contentPadding: EdgeInsets.zero,
              title: const Text('Today'),
              subtitle: Text('Window ${_window.label}'),
            ),
            ListTile(
              contentPadding: EdgeInsets.zero,
              title: Text(_contact.name),
              subtitle: const Text('Notified if you miss the window'),
            ),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              child: FilledButton(
                onPressed: () {},
                child: const Text("I'm okay"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
