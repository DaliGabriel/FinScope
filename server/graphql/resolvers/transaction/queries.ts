import { getTransactions } from "../../../services/transaction";
import { extractUserId } from "../../../utils/auth";
import { JwtPayload } from "jsonwebtoken";

export const transactionQueries = {
  transactions: async (
    _: unknown,
    __: unknown,
    context: { user: string | JwtPayload | null }
  ) => {
    try {
      const userId = extractUserId(context.user);

      if (!userId) {
        return {
          __typename: "TransactionListError",
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        };
      }

      const transactions = await getTransactions(userId);

      // Ensure we're returning an array
      if (!Array.isArray(transactions)) {
        console.error("Transactions is not an array:", transactions);
        return {
          __typename: "TransactionListError",
          code: "INVALID_DATA",
          message: "Invalid transaction data received",
        };
      }

      return {
        __typename: "TransactionListSuccess",
        transactions,
      };
    } catch (error) {
      console.error("Error in transactions query:", error);
      return {
        __typename: "TransactionListError",
        code: "FETCH_ERROR",
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch transactions",
      };
    }
  },
};
