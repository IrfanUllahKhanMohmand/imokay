class CheckIn {
  const CheckIn({
    required this.id,
    required this.userId,
    required this.checkedInAt,
  });

  final String id;
  final String userId;
  final DateTime checkedInAt;
}
