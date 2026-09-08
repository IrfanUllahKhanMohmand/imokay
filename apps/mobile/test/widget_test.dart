import 'package:flutter_test/flutter_test.dart';
import 'package:imokay/main.dart';

void main() {
  testWidgets('shows check-in home', (tester) async {
    await tester.pumpWidget(const ImOkayApp());

    expect(find.text("I'm Okay"), findsOneWidget);
    expect(find.text("I'm okay"), findsOneWidget);
    expect(find.text('Sara'), findsOneWidget);
  });
}
