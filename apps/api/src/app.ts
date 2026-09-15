import express from "express";

import {
  ImOkayStore,
  serializeCheckIn,
  serializeUser,
} from "./store/imokay-store.js";

export function createApp(store = new ImOkayStore()) {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ name: "imokay-api", status: "ok" });
  });

  app.post("/users", (req, res) => {
    try {
      const displayName =
        typeof req.body?.displayName === "string" ? req.body.displayName : "";
      const user = store.createUser(displayName);
      res.status(201).json(serializeUser(user));
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "invalid user",
      });
    }
  });

  app.put("/users/:userId/window", (req, res) => {
    try {
      const window = store.setWindow(req.params.userId, {
        startHour: Number(req.body?.startHour),
        startMinute: Number(req.body?.startMinute ?? 0),
        endHour: Number(req.body?.endHour),
        endMinute: Number(req.body?.endMinute ?? 0),
      });
      res.json(window);
    } catch (error) {
      const message = error instanceof Error ? error.message : "invalid window";
      res.status(message === "user not found" ? 404 : 400).json({ error: message });
    }
  });

  app.get("/users/:userId/window", (req, res) => {
    const window = store.getWindow(req.params.userId);
    if (!window) {
      res.status(404).json({ error: "window not found" });
      return;
    }
    res.json(window);
  });

  app.post("/users/:userId/contacts", (req, res) => {
    try {
      const contact = store.addContact(
        req.params.userId,
        typeof req.body?.name === "string" ? req.body.name : "",
        typeof req.body?.phone === "string" ? req.body.phone : "",
      );
      res.status(201).json(contact);
    } catch (error) {
      const message = error instanceof Error ? error.message : "invalid contact";
      res.status(message === "user not found" ? 404 : 400).json({ error: message });
    }
  });

  app.get("/users/:userId/contacts", (req, res) => {
    if (!store.getUser(req.params.userId)) {
      res.status(404).json({ error: "user not found" });
      return;
    }
    res.json(store.listContacts(req.params.userId));
  });

  app.post("/users/:userId/check-ins", (req, res) => {
    try {
      const record = store.checkIn(req.params.userId);
      res.status(201).json(serializeCheckIn(record));
    } catch (error) {
      const message = error instanceof Error ? error.message : "invalid check-in";
      res.status(message === "user not found" ? 404 : 400).json({ error: message });
    }
  });

  app.get("/users/:userId/check-ins", (req, res) => {
    if (!store.getUser(req.params.userId)) {
      res.status(404).json({ error: "user not found" });
      return;
    }
    res.json(store.listCheckIns(req.params.userId).map(serializeCheckIn));
  });

  return app;
}
