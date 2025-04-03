import { User } from "../../generated/mongo";

export const createAuthError = (code: string, message: string) => ({
  error: { code, message },
});

export const createRegisterSuccess = (user: User) => ({
  __typename: "RegisterSuccess",
  user: createUserGraphQL(user),
});

export const createLoginSuccess = (
  accessToken: string,
  refreshToken: string,
  user: User
) => ({
  accessToken,
  refreshToken,
  user,
});

export const createUserGraphQL = (user: User) => ({
  __typename: "UserSuccess",
  currentUser: {
    __typename: "User",
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
  },
});
