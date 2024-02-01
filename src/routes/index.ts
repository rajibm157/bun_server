import { Hono } from "hono";
import { authMiddleware } from "~middleware";
import auth from "./auth.routes";
import book from "./book.routes";

const api = new Hono().basePath("/v1");

api.route("/auth", auth);

api.use("/*", authMiddleware);

api.route("/books", book);

export default api;
