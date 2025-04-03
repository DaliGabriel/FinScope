import { getTransactions } from "../../../services/transaction";
import { requireAuth } from "../../../utils/auth";
import { JwtPayload } from "jsonwebtoken";

export const transactionQueries = {
  transactions: async (
    _: unknown,
    __: unknown,
    context: { user: string | JwtPayload | null }
  ) => {
    try {
      const auth = requireAuth(context.user, "TransactionError");

      if ("error" in auth) return auth.error;

      const result = await getTransactions(auth.userId);

      if ("error" in result) {
        return {
          __typename: "TransactionError",
          code: result.error.code,
          message: result.error.message,
        };
      }

      return result;
    } catch (error) {
      return {
        __typename: "TransactionError",
        code: "GET_TRANSACTIONS_FAILED",
        message: "Failed to get the transactions.",
      };
    }
  },
};
