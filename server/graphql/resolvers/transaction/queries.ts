import { getTransactions } from "../../../services/transaction";

export const transactionQueries = {
  transactions: async () => getTransactions(),
};
