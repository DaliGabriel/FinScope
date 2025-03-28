import React from "react";
import { TransactionsChartProps } from "../../types/charts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const TransactionsChart: React.FC<TransactionsChartProps> = ({
  transactions,
}) => {
  // Format the data for the chart
  const chartData = transactions.map((transaction) => ({
    ...transaction,
    date: new Date(parseInt(transaction.date)).toLocaleDateString(),
    amount:
      transaction.type === "EXPENSE" ? -transaction.amount : transaction.amount,
  }));

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Transaction Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="amount"
            fill="#8884d8"
            name="Amount"
            fillOpacity={0.8}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
