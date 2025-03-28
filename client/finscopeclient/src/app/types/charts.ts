export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  type: string;
}

export interface TransactionsChartProps {
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  type: string;
  __typename: string;
}

export interface TransactionSummaryProps {
  transactions: Transaction[];
}
