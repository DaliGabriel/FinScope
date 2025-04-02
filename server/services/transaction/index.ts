import { postgres } from "../../config/prisma";
import { CreateTransactionInput } from "../../types/transaction";
import {
  createTransactionError,
  createTransactionListGraphQL,
} from "./transactionResult";
import { getTransactionsByUserId } from "./transactionService";

export const getTransactions = async (userId: string) => {
  try {
    const transactions = await getTransactionsByUserId(userId);
    return createTransactionListGraphQL(transactions);
  } catch (error) {
    return createTransactionError(
      "FETCH_ERROR",
      "Failed to fetch transactions"
    );
  }
};

export const createTransaction = async (input: CreateTransactionInput) => {
  try {
    const transaction = await postgres.transaction.create({
      data: {
        ...input,
        date: new Date(input.date),
      },
    });
    return createTransactionListGraphQL([transaction]);
  } catch (error) {
    return createTransactionError(
      "CREATION_ERROR",
      "Failed to create transaction"
    );
  }
};
