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

  type TransactionListSuccess {
    transactions: [Transaction!]!
  }

  type TransactionListError {
    code: String!
    message: String!
  }

  union TransactionCreationResult =
      TransactionCreationSuccess
    | TransactionCreationError

  union TransactionListResult = TransactionListSuccess | TransactionListError

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
