import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  mobile: z.string().min(10),
  age: z.number(),
  password: z.string().min(6),
});

export const loginValidator = zValidator("json", loginSchema);
export const signupValidator = zValidator("json", signupSchema);

export type ISignup = z.infer<typeof signupSchema>;
export type ILogin = z.infer<typeof loginSchema>;
