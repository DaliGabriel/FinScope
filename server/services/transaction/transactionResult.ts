import { Transaction } from "../../generated/postgres";

export const createTransactionError = (code: string, message: string) => ({
  error: { code, message },
});

export const createTransactionListGraphQL = (transactions: Transaction[]) => ({
  __typename: "Transaction",
  transactions: transactions.map((transaction) => ({
    id: transaction.id,
    amount: transaction.amount,
    type: transaction.type,
    category: transaction.category,
    date: transaction.date.toISOString(),
  })),
});
