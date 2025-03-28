import React from "react";
import { TransactionSummaryProps } from "../../types/charts";

export const TransactionSummary: React.FC<TransactionSummaryProps> = ({
  transactions,
}) => {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "EXPENSE")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-green-50 p-4 rounded-lg shadow">
        <h4 className="text-sm font-medium text-green-800">Total Income</h4>
        <p className="text-2xl font-bold text-green-600">
          ${totalIncome.toFixed(2)}
        </p>
      </div>
      <div className="bg-red-50 p-4 rounded-lg shadow">
        <h4 className="text-sm font-medium text-red-800">Total Expenses</h4>
        <p className="text-2xl font-bold text-red-600">
          ${totalExpenses.toFixed(2)}
        </p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg shadow">
        <h4 className="text-sm font-medium text-blue-800">Balance</h4>
        <p
          className={`text-2xl font-bold ${
            balance >= 0 ? "text-blue-600" : "text-red-600"
          }`}
        >
          ${balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
