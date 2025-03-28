export const transactionTypeDefs = /* GraphQL */ `
  type Transaction {
    id: ID!
    type: String!
    amount: Float!
    category: String!
    date: String!
  }

  type TransactionCreationSuccess {
    transaction: Transaction!
  }

  type TransactionCreationError {
    code: String!
    message: String!
  }

  union TransactionCreationResult =
      TransactionCreationSuccess
    | TransactionCreationError

  type Query {
    transactions: [Transaction!]!
  }

  type Mutation {
    createTransaction(
      type: String!
      amount: Float!
      category: String!
      date: String!
    ): TransactionCreationResult!
  }
`;
