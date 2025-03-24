"use client";
import { gql, useQuery } from "@apollo/client";

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      amount
      category
      date
      id
      type
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log({ data });

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Transactions</h1>
      {data.transactions.length == 0 ? (
        <p>No transactions found</p>
      ) : (
        <ul>
          {data.transactions.map((transaction: any) => (
            <li key={transaction.id}>
              {transaction.category}: ${transaction.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
