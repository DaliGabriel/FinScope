import React from "react";
import { TransactionsChart } from "./TransactionsChart";
import { TransactionSummary } from "./TransactionSummary";
import TransactionList from "./TransactionList";
import { Transaction } from "../../types/charts";

const Transactions = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>

      {/* Transaction Summary */}
      <TransactionSummary transactions={transactions} />

      {/* Transaction Chart */}
      <TransactionsChart transactions={transactions} />

      {/* Transaction List */}
      <TransactionList transactions={transactions} />
    </>
  );
};

export default Transactions;
