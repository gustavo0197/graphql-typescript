import { verify } from "jsonwebtoken";

export function isAuth(token: string) {
  try {
    return verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return false;
  }
}
