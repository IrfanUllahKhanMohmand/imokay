class CheckInWindow {
  const CheckInWindow({
    required this.id,
    required this.userId,
    required this.startHour,
    required this.startMinute,
    required this.endHour,
    required this.endMinute,
  });

  final String id;
  final String userId;
  final int startHour;
  final int startMinute;
  final int endHour;
  final int endMinute;

  String get label {
    return '${_clock(startHour, startMinute)} – ${_clock(endHour, endMinute)}';
  }

  static String _clock(int hour, int minute) {
    final hh = hour.toString().padLeft(2, '0');
    final mm = minute.toString().padLeft(2, '0');
    return '$hh:$mm';
  }
}
