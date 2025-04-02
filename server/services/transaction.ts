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

export const getTransactions = async (userId: string) => {
  try {
    const transactions = await postgres.transaction.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        date: "desc",
      },
    });
    return transactions || []; // Ensure we always return an array
  } catch (error) {
    console.error("Error in getTransactions:", error);
    return []; // Return empty array on error
  }
};
