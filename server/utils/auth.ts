import { JwtPayload } from "jsonwebtoken";
import { ValidatorOutput, loginInput, registerInput } from "../types/auth";

export function extractUserId(user: string | JwtPayload | null): string | null {
  if (!user) return null;
  return typeof user === "string" ? user : user.userId;
}

export function inputRegisterValidator({
  email,
  name,
  password,
}: registerInput): ValidatorOutput | undefined {
  if (!email || !password || !name) {
    return {
      __typename: "AuthError",
      code: "INVALID_INPUT",
      message: "Invalid input",
    };
  }
  return undefined;
}

export function inputLoginValidator({
  email,
  password,
}: loginInput): ValidatorOutput | undefined {
  if (!email || !password) {
    return {
      __typename: "AuthError",
      code: "INVALID_INPUT",
      message: "Invalid input",
    };
  }
  return undefined;
}
