export interface Contact {
  id: string;
  userId: string;
  name: string;
  phone: string;
}

export function createContact(input: {
  userId: string;
  name: string;
  phone: string;
  id?: string;
}): Contact {
  const name = input.name.trim();
  const phone = input.phone.trim();
  if (!input.userId.trim()) {
    throw new Error("userId is required");
  }
  if (!name) {
    throw new Error("name is required");
  }
  if (!phone) {
    throw new Error("phone is required");
  }

  return {
    id: input.id ?? crypto.randomUUID(),
    userId: input.userId,
    name,
    phone,
  };
}
