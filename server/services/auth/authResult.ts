import { User } from "../../generated/mongo";

export const createAuthError = (code: string, message: string) => ({
  __typename: "AuthError",
  code,
  message,
});

export const createRegisterSuccess = (user: User) => ({
  __typename: "RegisterSuccess",
  user: {
    __typename: "User",
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role || "USER",
    createdAt: user.createdAt?.toISOString() || new Date().toISOString(),
  },
});

export const createLoginSuccess = (
  accessToken: string,
  refreshToken: string,
  user: User
) => ({
  __typename: "LoginSuccess",
  authPayload: {
    accessToken,
    refreshToken,
    user: {
      __typename: "User",
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || "USER",
      createdAt: user.createdAt?.toISOString() || new Date().toISOString(),
    },
  },
});

export const createUserGraphQL = (user: User) => ({
  __typename: "UserSuccess",
  currentUser: {
    __typename: "User",
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role || "USER",
    createdAt: user.createdAt?.toISOString() || new Date().toISOString(),
  },
});
