export const transactionTypeDefs = /* GraphQL */ `
  type Transaction {
    id: ID!
    type: String!
    amount: Float!
    category: String!
    date: String!
  }

  type Query {
    transactions: [Transaction!]!
  }

  type Mutation {
    createTransaction(
      type: String!
      amount: Float!
      category: String!
      date: String!
    ): Transaction!
  }
`;
