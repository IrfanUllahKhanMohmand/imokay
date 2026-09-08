import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  createCheckInWindow,
  isWithinWindow,
} from "./check-in-window.js";

describe("createCheckInWindow", () => {
  it("rejects a window that does not move forward", () => {
    assert.throws(() =>
      createCheckInWindow({
        userId: "user-1",
        startHour: 12,
        startMinute: 0,
        endHour: 8,
        endMinute: 0,
      }),
    );
  });
});

describe("isWithinWindow", () => {
  const window = createCheckInWindow({
    userId: "user-1",
    startHour: 8,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
  });

  it("is true at 9:00", () => {
    const at = new Date(2026, 8, 8, 9, 0, 0);
    assert.equal(isWithinWindow(window, at), true);
  });

  it("is false at 12:00", () => {
    const at = new Date(2026, 8, 8, 12, 0, 0);
    assert.equal(isWithinWindow(window, at), false);
  });
});
