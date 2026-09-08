export interface CheckIn {
  id: string;
  userId: string;
  checkedInAt: Date;
}

export function createCheckIn(input: {
  userId: string;
  checkedInAt?: Date;
  id?: string;
}): CheckIn {
  if (!input.userId.trim()) {
    throw new Error("userId is required");
  }

  return {
    id: input.id ?? crypto.randomUUID(),
    userId: input.userId,
    checkedInAt: input.checkedInAt ?? new Date(),
  };
}
