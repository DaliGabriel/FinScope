import { JwtPayload } from "jsonwebtoken";
import { createTransaction, getTransactions } from "../../services/transaction";
import { CreateTransactionInput } from "../../types/transaction";

export const transactionResolvers = {
  Query: {
    transactions: async () => {
      return getTransactions();
    },
  },
  Mutation: {
    createTransaction: (
      _: unknown,
      args: CreateTransactionInput,
      context: { user: string | JwtPayload | null }
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      const userId =
        typeof context.user === "string"
          ? context.user
          : (context.user as JwtPayload).userId;

      return createTransaction({ ...args, userId });
    },
  },
};
