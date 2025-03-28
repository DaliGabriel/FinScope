"use client";

import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../graphql/transactions/queries";
import { TransactionSummary } from "../../components/charts/TransactionSummary";
import { TransactionsChart } from "../../components/charts/TransactionsChart";
import Loading from "../../components/Generic/Loading";
import ErrorMessage from "../../components/Generic/ErrorMessage";

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
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction: any) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(parseInt(transaction.date)).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.type}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      transaction.type === "EXPENSE"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    ${transaction.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
