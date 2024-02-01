import { Hono } from "hono";
import { authService } from "~services";
import { authMiddleware } from "~middleware";
import { loginValidator, signupValidator } from "~validators";

type Variables = {
  user: any;
};

const auth = new Hono<{ Variables: Variables }>();

auth.post("/login", loginValidator, async (c) => {
  const body = c.req.valid("json");
  const data = await authService.login(body);
  return c.json(data);
});

auth.post("/signup", signupValidator, async (c) => {
  const body = c.req.valid("json");
  const data = await authService.signup(body);
  return c.json(data);
});

auth.get("/profile", authMiddleware, async (c) => {
  const payload = c.get("user");
  return c.json({ data: payload });
});

export default auth;
