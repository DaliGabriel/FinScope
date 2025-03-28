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
      const user = await register(email, password, name);
      return {
        __typename: "RegisterSuccess",
        user,
      };
    } catch (error: unknown) {
      console.error("Error in register resolver:", error);
      return {
        __typename: "AuthError",
        code: "AUTH_CREATION_FAILED",
        message: "User name has been taken",
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
      } else {
        const { accessToken, user } = loginResult;
        return {
          __typename: "loginSuccess",
          authPayload: {
            accessToken,
            user,
          },
        };
      }
    } catch (error) {
      console.error("Error creating login:", error);
      return {
        __typename: "AuthError",
        code: "AUTH_CREATION_FAILED",
        message: "Failed to login.",
      };
    }
  },
};
