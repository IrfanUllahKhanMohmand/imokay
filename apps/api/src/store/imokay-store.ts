import { createUser, type User } from "../models/user.js";
import {
  createCheckInWindow,
  type CheckInWindow,
} from "../models/check-in-window.js";
import { createContact, type Contact } from "../models/contact.js";
import { createCheckIn, type CheckIn } from "../models/check-in.js";

export class ImOkayStore {
  private readonly users = new Map<string, User>();
  private readonly windows = new Map<string, CheckInWindow>();
  private readonly contacts = new Map<string, Contact[]>();
  private readonly checkIns = new Map<string, CheckIn[]>();

  createUser(displayName: string): User {
    const user = createUser({ displayName });
    this.users.set(user.id, user);
    this.contacts.set(user.id, []);
    this.checkIns.set(user.id, []);
    return user;
  }

  getUser(id: string): User | undefined {
    return this.users.get(id);
  }

  setWindow(
    userId: string,
    hours: {
      startHour: number;
      startMinute: number;
      endHour: number;
      endMinute: number;
    },
  ): CheckInWindow {
    if (!this.users.has(userId)) {
      throw new Error("user not found");
    }
    const window = createCheckInWindow({ userId, ...hours });
    this.windows.set(userId, window);
    return window;
  }

  getWindow(userId: string): CheckInWindow | undefined {
    return this.windows.get(userId);
  }

  addContact(userId: string, name: string, phone: string): Contact {
    if (!this.users.has(userId)) {
      throw new Error("user not found");
    }
    const contact = createContact({ userId, name, phone });
    this.contacts.get(userId)!.push(contact);
    return contact;
  }

  listContacts(userId: string): Contact[] {
    return [...(this.contacts.get(userId) ?? [])];
  }

  checkIn(userId: string, at = new Date()): CheckIn {
    if (!this.users.has(userId)) {
      throw new Error("user not found");
    }
    const record = createCheckIn({ userId, checkedInAt: at });
    this.checkIns.get(userId)!.push(record);
    return record;
  }

  listCheckIns(userId: string): CheckIn[] {
    return [...(this.checkIns.get(userId) ?? [])];
  }
}

export function serializeUser(user: User) {
  return {
    id: user.id,
    displayName: user.displayName,
    createdAt: user.createdAt.toISOString(),
  };
}

export function serializeCheckIn(checkIn: CheckIn) {
  return {
    id: checkIn.id,
    userId: checkIn.userId,
    checkedInAt: checkIn.checkedInAt.toISOString(),
  };
}
