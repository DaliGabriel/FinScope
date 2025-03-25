import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { mongo } from "../config/prisma";
import { Request } from "express";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const registerUser = async (email: string, password: string) => {
  const existing = await mongo.user.findUnique({ where: { email } });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  return mongo.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await mongo.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

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

export const verifyAccessToken = (req: Request) => {
  const auth = req.headers.authorization;
  if (!auth) return null;

  try {
    const token = auth.split(" ")[1];
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};
