"use client";

import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../graphql/transactions/queries";
import { TransactionSummary } from "../../components/charts/TransactionSummary";
import { TransactionsChart } from "../../components/charts/TransactionsChart";
import Loading from "../../components/generic/Loading";
import ErrorMessage from "../../components/generic/ErrorMessage";
import TransactionList from "@/app/components/charts/TransactionList";
import Empty from "../../components/generic/Empty";
import Transactions from "@/app/components/charts/Transactions";

export default function TransactionsPage() {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage message={error.message} />;

  const transactions = data?.transactions.transactions || [];

  return (
    <div className="p-6">
      {transactions.length === 0 ? (
        <Empty message="No transactions found" />
      ) : (
        <>
          <Transactions transactions={transactions} />
        </>
      )}
    </div>
  );
}
