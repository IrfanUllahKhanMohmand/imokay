export interface CheckInWindow {
  id: string;
  userId: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}

function assertClock(hour: number, minute: number, label: string): void {
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    throw new Error(`${label} hour must be 0–23`);
  }
  if (!Number.isInteger(minute) || minute < 0 || minute > 59) {
    throw new Error(`${label} minute must be 0–59`);
  }
}

function toMinutes(hour: number, minute: number): number {
  return hour * 60 + minute;
}

export function createCheckInWindow(input: {
  userId: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  id?: string;
}): CheckInWindow {
  if (!input.userId.trim()) {
    throw new Error("userId is required");
  }
  assertClock(input.startHour, input.startMinute, "start");
  assertClock(input.endHour, input.endMinute, "end");
  if (
    toMinutes(input.startHour, input.startMinute) >=
    toMinutes(input.endHour, input.endMinute)
  ) {
    throw new Error("window must end after it starts");
  }

  return {
    id: input.id ?? crypto.randomUUID(),
    userId: input.userId,
    startHour: input.startHour,
    startMinute: input.startMinute,
    endHour: input.endHour,
    endMinute: input.endMinute,
  };
}

export function isWithinWindow(
  window: CheckInWindow,
  at: Date,
): boolean {
  const minutes = at.getHours() * 60 + at.getMinutes();
  const start = toMinutes(window.startHour, window.startMinute);
  const end = toMinutes(window.endHour, window.endMinute);
  return minutes >= start && minutes < end;
}
