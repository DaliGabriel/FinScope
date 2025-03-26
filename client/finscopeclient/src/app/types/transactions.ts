export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  type: string;
}

export interface TransactionsData {
  transactions: Transaction[];
}

export interface TransactionData {
  transaction: Transaction;
}

export interface CreateTransactionVariables {
  amount: number;
  category: string;
  date: string;
  type: string;
}

export interface UpdateTransactionVariables {
  id: string;
  amount?: number;
  category?: string;
  date?: string;
  type?: string;
}

export interface DeleteTransactionVariables {
  id: string;
}

export interface CreateTransactionResponse {
  createTransaction: Transaction;
}

export interface UpdateTransactionResponse {
  updateTransaction: Transaction;
}

export interface DeleteTransactionResponse {
  deleteTransaction: {
    id: string;
  };
}
