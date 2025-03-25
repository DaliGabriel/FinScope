export interface CreateTransactionInput {
  type: string;
  amount: number;
  category: string;
  date: string;
  userId?: string;
}
