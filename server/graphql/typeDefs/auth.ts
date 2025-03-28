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

  type RegisterSuccess {
    user: User!
  }
  type loginSuccess {
    authPayload: AuthPayload!
  }

  type AuthError {
    code: String!
    message: String!
  }

  union RegisterResult = RegisterSuccess | AuthError
  union LoginResult = loginSuccess | AuthError

  type Query {
    currentUser: User
  }

  type Mutation {
    register(email: String!, password: String!, name: String!): RegisterResult!
    login(email: String!, password: String!): LoginResult!
  }
`;
