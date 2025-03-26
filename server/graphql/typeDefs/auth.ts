export const authTypeDefs = /* GraphQL */ `
  type User {
    id: ID!
    email: String!
    name: String!
    role: String!
    createdAt: String!
  }

  type AuthPayload {
    accessToken: String!
    user: User!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    register(email: String!, password: String!, name: String!): User!
    login(email: String!, password: String!): AuthPayload!
  }
`;
