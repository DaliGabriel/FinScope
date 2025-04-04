import {
  createAuthError,
  createLoginSuccess,
  createRegisterSuccess,
  createUserGraphQL,
} from "./authResult";
import { comparePasswords, hashPassword } from "./passwordService";
import { createAccessToken, createRefreshToken } from "./tokenService";
import { createUser, findUserByEmail, findUserById } from "./userService";

export const register = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const existing = await findUserByEmail(email);
    if (existing)
      return createAuthError("USER_ALREADY_EXISTS", "User already exists");

    const hashed = await hashPassword(password);
    const newUser = await createUser({ email, password: hashed, name });

    return createRegisterSuccess(newUser);
  } catch (error) {
    return createAuthError("REGISTRATION_FAILED", "Failed to register user");
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) return createAuthError("USER_NOT_FOUND", "Invalid credentials");

    const isValid = await comparePasswords(password, user.password);
    if (!isValid)
      return createAuthError("INVALID_PASSWORD", "Invalid credentials");

    const accessToken = createAccessToken({ userId: user.id, role: user.role });
    const refreshToken = createRefreshToken({ userId: user.id });

    return createLoginSuccess(accessToken, refreshToken, user);
  } catch (error) {
    return createAuthError("LOGIN_FAILED", "Failed to login");
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await findUserById(id);
    if (!user) {
      return createAuthError("USER_NOT_FOUND", "User not found");
    }

    return createUserGraphQL(user);
  } catch (error) {
    return createAuthError("FETCH_USER_FAILED", "Failed to fetch user");
  }
};
