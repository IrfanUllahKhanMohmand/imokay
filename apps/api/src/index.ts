import express from "express";
import { createCheckInWindow, createUser } from "./models/index.js";

const port = Number(process.env.PORT ?? 3002);
const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    name: "imokay-api",
    status: "ok",
  });
});

app.listen(port, () => {
  const user = createUser({ displayName: "Amina" });
  createCheckInWindow({
    userId: user.id,
    startHour: 8,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
  });
  console.log(`I'm Okay API listening on ${port}`);
});
