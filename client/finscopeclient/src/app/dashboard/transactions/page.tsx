"use client";

import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../graphql/transactions/queries";
import { TransactionSummary } from "../../components/charts/TransactionSummary";
import { TransactionsChart } from "../../components/charts/TransactionsChart";
import Loading from "../../components/generic/Loading";
import ErrorMessage from "../../components/generic/ErrorMessage";
import TransactionList from "@/app/components/charts/TransactionList";

export default function TransactionsPage() {
  
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  const transactions = data?.transactions || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>

      {/* Transaction Summary */}
      <TransactionSummary transactions={transactions} />

      {/* Transaction Chart */}
      <TransactionsChart transactions={transactions} />

      {/* Transaction List */}
      <TransactionList transactions={transactions} />
    </div>
  );
}
