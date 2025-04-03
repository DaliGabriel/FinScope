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

  type LogListSuccess {
    logs: [LogEntry!]!
  }

  type LogError {
    code: String!
    message: String!
  }

  union LogCreationResult = LogCreationSuccess | LogError
  union LogListResult = LogListSuccess | LogError

  type Query {
    logs: LogListResult!
  }

  type Mutation {
    createLog(action: String!, details: String!): LogCreationResult!
  }
`;
