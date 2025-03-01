import { $ } from "bun";
import { Hono } from "hono";
import { z } from "zod";

export const app = new Hono();

const browserSchema = z.object({
  url: z.string().url(),
});

app.get("/", (c) => c.text("server operational"));

app.post("/browser", async (c) => {
  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json(
      {
        error: "validation failed",
        details: "POST data must be JSON",
      },
      400,
    );
  }

  const result = browserSchema.safeParse(body);
  if (!result.success) {
    return c.json(
      {
        error: "validation failed",
        details: result.error.format(),
      },
      400,
    );
  }

  const { url } = result.data;

  // There is no need to wait for the command to complete before returning a response.
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  $`start chrome ${url}`;

  return c.text("200", 200);
});
