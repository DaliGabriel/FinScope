import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $amount: Float!
    $category: String!
    $date: String!
    $type: String!
  ) {
    createTransaction(
      amount: $amount
      category: $category
      date: $date
      type: $type
    ) {
      amount
      category
      date
      id
      type
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $id: ID!
    $amount: Float
    $category: String
    $date: String
    $type: String
  ) {
    updateTransaction(
      id: $id
      amount: $amount
      category: $category
      date: $date
      type: $type
    ) {
      amount
      category
      date
      id
      type
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`;
