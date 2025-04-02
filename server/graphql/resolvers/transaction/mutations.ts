import { createTransaction } from "../../../services/transaction";
import { CreateTransactionInput } from "../../../types/transaction";
import { requireAuth } from "../../../utils/auth";
import { JwtPayload } from "jsonwebtoken";

export const transactionMutations = {
  createTransaction: async (
    _: unknown,
    args: CreateTransactionInput,
    context: { user: string | JwtPayload | null }
  ) => {
    const auth = requireAuth(context.user, "TransactionCreationError");

    if ("error" in auth) return auth;

    try {
      const transaction = await createTransaction({
        ...args,
        userId: auth.userId,
      });
      return {
        __typename: "TransactionCreationSuccess",
        transaction,
      };
    } catch (error) {
      console.error("Error creating transaction:", error);
      return {
        __typename: "TransactionCreationError",
        code: "TRANSACTION_CREATION_FAILED",
        message: "Failed to create transaction.",
      };
    }
  },
};
