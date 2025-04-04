import { JwtPayload } from "jsonwebtoken";
import { createTransactions } from "../../../services/transaction";
import { CreateTransactionInput } from "../../../types/transaction";
import { requireAuth } from "../../../utils/auth";

export const transactionMutations = {
  createTransaction: async (
    _: unknown,
    args: CreateTransactionInput,
    context: { user: string | JwtPayload | null }
  ) => {
    const auth = requireAuth(context.user, "TransactionError");

    if ("error" in auth) return auth.error;

    try {
      const result = await createTransactions({
        ...args,
        userId: auth.userId,
      });

      return result;
    } catch (error) {
      console.error("Error creating transaction:", error);
      return {
        __typename: "TransactionError",
        code: "TRANSACTION_CREATION_FAILED",
        message: "Failed to create transaction.",
      };
    }
  },
};
