import { createTransaction, getTransactions } from "../../services/transaction";
import { CreateTransactionInput } from "../../types/transaction";

export const transactionResolvers = {
  Query: {
    transactions: async () => {
      return getTransactions();
    },
  },
  Mutation: {
    createTransaction: (_: unknown, args: CreateTransactionInput) =>
      createTransaction(args),
  },
};
