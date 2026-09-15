import assert from "node:assert/strict";
import { describe, it } from "node:test";
import request from "supertest";

import { createApp } from "./app.js";
import { ImOkayStore } from "./store/imokay-store.js";

describe("check-in models", () => {
  it("saves a window, contact, and check-in for a user", async () => {
    const api = createApp(new ImOkayStore());
    const user = await request(api)
      .post("/users")
      .send({ displayName: "Amina" });
    assert.equal(user.status, 201);

    const id = user.body.id;
    const window = await request(api).put(`/users/${id}/window`).send({
      startHour: 8,
      startMinute: 0,
      endHour: 12,
      endMinute: 0,
    });
    assert.equal(window.status, 200);
    assert.equal(window.body.startHour, 8);

    const contact = await request(api).post(`/users/${id}/contacts`).send({
      name: "Sara",
      phone: "+1-555-0100",
    });
    assert.equal(contact.status, 201);

    const checkIn = await request(api).post(`/users/${id}/check-ins`);
    assert.equal(checkIn.status, 201);
    assert.equal(typeof checkIn.body.checkedInAt, "string");
  });
});
