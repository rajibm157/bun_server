import { HTTPException } from "hono/http-exception";
import { User } from "~schemas";
import { ILogin, ISignup } from "~validators";
import { STATUS, jwtSign } from "~utils";

export const login = async (params: ILogin) => {
  const user = await User.findOne({ email: params.email });

  if (!user) {
    throw new HTTPException(STATUS.BAD_REQUEST, { message: "Email not exist." });
  }

  const isMatch = await Bun.password.verify(params.password, user.password);

  if (!isMatch) {
    throw new HTTPException(STATUS.BAD_REQUEST, { message: "Password not match." });
  }

  const token = await jwtSign({ sub: user._id as any, role: "user" });

  return { data: { user, token } };
};

export const signup = async (params: ISignup) => {
  const isEmailExist = await User.findOne({ email: params.email });

  if (isEmailExist) {
    throw new HTTPException(STATUS.BAD_REQUEST, { message: "Email already exist." });
  }

  const hashPassword = await Bun.password.hash(params.password);

  const user = new User({ ...params, password: hashPassword });

  await user.save();

  const token = await jwtSign({ sub: user._id as any, role: "user" });

  return { data: { user, token } };
};

export const profile = async (id: string): Promise<{ data: User }> => {
  const user = await User.findById(id);
  if (!user) {
    throw new HTTPException(STATUS.UNAUTHORIZED, { message: "Unauthorized" });
  }

  return { data: user };
};
