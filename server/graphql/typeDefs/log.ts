export const logTypeDefs = /* GraphQL */ `
  type LogEntry {
    id: ID!
    action: String!
    details: String!
    userId: String!
    timestamp: String!
  }

  type LogCreationSuccess {
    log: LogEntry!
  }

  type LogCreationError {
    code: String!
    message: String!
  }

  union LogCreationResult = LogCreationSuccess | LogCreationError

  type Mutation {
    createLog(
      action: String!
      details: String!
      userId: String!
    ): LogCreationResult!
  }
`;
