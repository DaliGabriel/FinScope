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

  type UserSuccess {
    currentUser: User!
  }
  type LoginSuccess {
    authPayload: AuthPayload!
  }

  type AuthError {
    code: String!
    message: String!
  }

  union RegisterResult = RegisterSuccess | AuthError
  union UserResult = UserSuccess | AuthError
  union LoginResult = LoginSuccess | AuthError

  type Query {
    currentUser: UserResult!
  }

  type Mutation {
    register(email: String!, password: String!, name: String!): RegisterResult!
    login(email: String!, password: String!): LoginResult!
  }
`;
