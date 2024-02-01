import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const errorHandler = (err: Error, c: Context) => {
  if (err instanceof HTTPException) {
    console.log("error", err.getResponse());

    const errStatus = err.status || err.getResponse().status || 500;
    const errMsg =
      err.message || err.getResponse().statusText || "Something went wrong.";

    c.status(errStatus);
    return c.json({
      success: false,
      message: errMsg,
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
  }
  c.status(500);
  return c.json({ success: false, message: "Something went wrong." });
};
