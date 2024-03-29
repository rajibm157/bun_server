import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import api from "~routes";
import { errorHandler } from "~middleware";
import { STATUS } from "~utils";

const app = new Hono();

app.use("*", logger());
app.use("/api/*", cors());
app.use("*", prettyJSON());

app.get("/", (c) => {
  return c.text("Welcome api Server...");
});

app.onError(errorHandler);

app.route("/api", api);

app.notFound((c) => {
  return c.text("Page not found.", STATUS.NOT_FOUND);
});

export default app;
