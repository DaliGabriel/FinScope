import { CreateTransactionInput } from "../../types/transaction";
import {
  createTransactionError,
  createTransactionGraphQL,
  createTransactionListGraphQL,
} from "./transactionResult";
import {
  createTransaction,
  getTransactionsByUserId,
} from "./transactionService";

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

export const createTransactions = async (input: CreateTransactionInput) => {
  try {
    const transaction = await createTransaction(input);
    return createTransactionGraphQL(transaction);
  } catch (error) {
    return createTransactionError(
      "CREATION_ERROR",
      "Failed to create transaction"
    );
  }
};
