import 'package:flutter_test/flutter_test.dart';
import 'package:imokay/domain/entities/check_in_window.dart';

void main() {
  test('formats the daily window', () {
    const window = CheckInWindow(
      id: 'w',
      userId: 'u',
      startHour: 8,
      startMinute: 0,
      endHour: 12,
      endMinute: 0,
    );
    expect(window.label, '08:00 – 12:00');
  });
}
