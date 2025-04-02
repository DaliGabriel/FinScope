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

  type TransactionListSuccess {
    transactions: [Transaction!]!
  }

  type TransactionError {
    code: String!
    message: String!
  }

  union TransactionCreationResult =
      TransactionCreationSuccess
    | TransactionError

  union TransactionListResult = TransactionListSuccess | TransactionError

  type Query {
    transactions: TransactionListResult!
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
