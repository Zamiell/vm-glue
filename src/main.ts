import { Hono } from "hono";

const PORT = 6969;

const app = new Hono();

// eslint-disable-next-line @typescript-eslint/require-await
app.post("/browser", async (c) => {
  c.status(200);
});

// eslint-disable-next-line import-x/no-default-export
export default {
  port: PORT,
  fetch: app.fetch,
};
