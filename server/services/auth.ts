import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { mongo } from "../config/prisma";
import { LoginErrorResult, LoginSuccessResult } from "../types/auth";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const register = async (
  email: string,
  password: string,
  name: string
) => {
  const existing = await mongo.user.findUnique({ where: { email } });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  return mongo.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};

export const login = async (
  email: string,
  password: string
): Promise<LoginSuccessResult | LoginErrorResult> => {
  const user = await mongo.user.findUnique({ where: { email } });
  if (!user) {
    return {
      error: {
        code: "USER_NOT_FOUND",
        message: "Invalid credentials",
      },
    };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return {
      error: {
        code: "INVALID_PASSWORD",
        message: "Invalid credentials",
      },
    };
  }

  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken, user };
};

export const getUserById = async (id: string) => {
  return await mongo.user.findUnique({ where: { id } });
};
