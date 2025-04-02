import { postgres } from "../../config/prisma";
import { CreateTransactionInput } from "../../types/transaction";

export const getTransactionsByUserId = async (userId: string) => {
  return await postgres.transaction.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      date: "desc",
    },
  });
};

export const createTransaction = async (input: CreateTransactionInput) => {
  return await postgres.transaction.create({
    data: {
      ...input,
      date: new Date(input.date),
      userId: input.userId,
    },
  });
};
