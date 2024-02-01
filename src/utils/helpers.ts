import { jwt, sign } from "hono/jwt";
import config from "~config";

export interface IPayload {
  sub: string;
  role?: "user" | "admin";
}

export async function jwtSign(payload: IPayload): Promise<string> {
  const token = await sign(payload, config.JWT_SECRET);
  return token;
}

export const jwtVerify = jwt({ secret: config.JWT_SECRET });
