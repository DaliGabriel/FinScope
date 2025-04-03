import { mongo } from "../../config/prisma";
import { CreateUserInput } from "../../types/auth";

export const findUserByEmail = async (email: string) => {
  return await mongo.user.findUnique({ where: { email } });
};

export const findUserById = async (id: string) => {
  return await mongo.user.findUnique({ where: { id } });
};

export const createUser = async (input: CreateUserInput) => {
  return await mongo.user.create({ data: input });
};
