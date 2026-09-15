import { createApp } from "./app.js";

const port = Number(process.env.PORT ?? 3002);

createApp().listen(port, () => {
  console.log(`I'm Okay API listening on ${port}`);
});
