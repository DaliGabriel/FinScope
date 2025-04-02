import { mongo } from "../../config/prisma";

export const findUserByEmail = async (email: string) => {
  return await mongo.user.findUnique({ where: { email } });
};

export const findUserById = async (id: string) => {
  return await mongo.user.findUnique({ where: { id } });
};

export const createUser = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  return await mongo.user.create({ data });
};
