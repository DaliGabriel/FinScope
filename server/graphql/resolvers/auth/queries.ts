import { JwtPayload } from "jsonwebtoken";
import { getUserById } from "../../../services/auth";
import { requireAuth } from "../../../utils/auth";

export const authQueries = {
  currentUser: async (
    _: unknown,
    __: any,
    context: { user: string | JwtPayload | null }
  ) => {
    try {
      const auth = requireAuth(context.user, "AuthError");

      if ("error" in auth) return auth.error;

      const result = await getUserById(auth.userId);

      if ("error" in result) {
        return {
          __typename: "AuthError",
          code: result.error.code,
          message: result.error.message,
        };
      }

      return result;
    } catch (error) {
      return {
        __typename: "AuthError",
        code: "AUTH_GET_USER_FAILED",
        message: "Failed to get the user information.",
      };
    }
  },
};
