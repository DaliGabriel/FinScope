import { JwtPayload } from "jsonwebtoken";
import { getUserById } from "../../../services/auth";
import { extractUserId } from "../../../utils/auth";

export const authQueries = {
  currentUser: async (
    _: unknown,
    __: any,
    context: { user: string | JwtPayload | null }
  ) => {
    const userId = extractUserId(context.user);

    if (!userId) {
      return {
        __typename: "AuthCreationError",
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      };
    }

    return await getUserById(userId);
  },
};
