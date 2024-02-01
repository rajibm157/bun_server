import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { authService } from "~services";
import { IPayload, jwtVerify } from "~utils";

export const authMiddleware = async (c: Context, next: Next) => {
  await jwtVerify(c, async () => {
    try {
      const payload = c.get("jwtPayload") as IPayload;
      const { data } = await authService.profile(payload.sub);
      c.set("user", data);
      await next();
    } catch (error) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }
  });
};
