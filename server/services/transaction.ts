import { postgres } from "../config/prisma";
import { CreateTransactionInput } from "../types/transaction";

export const createTransaction = async (args: CreateTransactionInput) => {
  return postgres.transaction.create({
    data: {
      ...args,
      date: new Date(args.date),
      userId: args.userId,
    },
  });
};

export const getTransactions = async () => {
  return await postgres.transaction.findMany();
};
