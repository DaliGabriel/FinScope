import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      ... on TransactionListSuccess {
        __typename
        transactions {
          amount
          category
          date
          id
          type
        }
      }
      ... on TransactionError {
        __typename
        code
        message
      }
    }
  }
`;
