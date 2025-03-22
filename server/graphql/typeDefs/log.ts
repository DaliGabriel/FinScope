export const logTypeDefs = /* GraphQL */ `
  type LogEntry {
    id: ID!
    action: String!
    details: String!
    userId: String!
    timestamp: String!
  }

  type Mutation {
    createLog(
      action: String!
      details: String!
      userId: String!
    ): LogEntry!
  }
`;
