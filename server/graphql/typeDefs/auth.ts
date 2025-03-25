export const authTypeDefs = /* GraphQL */ `
  type User {
    id: ID!
    email: String!
    role: String!
    createdAt: String!
  }

  type AuthPayload {
    accessToken: String!
    user: User!
  }

  type Mutation {
    register(email: String!, password: String!): User!
    login(email: String!, password: String!): AuthPayload!
  }
`;
