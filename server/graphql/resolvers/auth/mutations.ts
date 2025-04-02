import { login, register } from "../../../services/auth";
import { loginInput, registerInput } from "../../../types/auth";
import {
  inputLoginValidator,
  inputRegisterValidator,
} from "../../../utils/auth";

export const authMutations = {
  register: async (_: unknown, args: registerInput) => {
    const { email, password, name } = args;

    const validationError = inputRegisterValidator(args);
    if (validationError) return validationError;

    try {
      const result = await register(email, password, name);

      if ("error" in result) {
        return {
          __typename: "AuthError",
          code: result.error.code,
          message: result.error.message,
        };
      }

      return result;
    } catch (error: unknown) {
      console.error("Error in register resolver:", error);
      return {
        __typename: "AuthError",
        code: "AUTH_CREATION_FAILED",
        message: "Failed to register.",
      };
    }
  },

  login: async (_: unknown, args: loginInput) => {
    const { email, password } = args;

    const validationError = inputLoginValidator(args);
    if (validationError) return validationError;

    try {
      const loginResult = await login(email, password);

      if ("error" in loginResult) {
        return {
          __typename: "AuthError",
          code: loginResult.error.code,
          message: loginResult.error.message,
        };
      }

      const { accessToken, refreshToken, user } = loginResult;

      return {
        __typename: "LoginSuccess",
        authPayload: {
          accessToken,
          refreshToken,
          user,
        },
      };
    } catch (error) {
      console.error("Error in login resolver:", error);
      return {
        __typename: "AuthError",
        code: "AUTH_CREATION_FAILED",
        message: "Failed to login.",
      };
    }
  },
};
