import { JwtPayload } from "jsonwebtoken";
import { getUserById } from "../../../services/auth";
import { extractUserId } from "../../../utils/auth";

export const authQueries = {
  currentUser: async (
    _: unknown,
    __: any,
    context: { user: string | JwtPayload | null }
  ) => {
    try {
      const userId = extractUserId(context.user);

      if (!userId) {
        return {
          __typename: "AuthError",
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        };
      }

      const result = await getUserById(userId);

      if ("error" in result) {
        return {
          __typename: "AuthError",
          code: result.error.code,
          message: result.error.message,
        };
      }

      return {
        __typename: "UserSuccess",
        currentUser: result,
      };
    } catch (error) {
      return {
        __typename: "AuthError",
        code: "AUTH_GET_USER_FAILED",
        message: "Failed to get the user information.",
      };
    }
  },
};
