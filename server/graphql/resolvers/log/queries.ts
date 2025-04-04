import { JwtPayload } from "jsonwebtoken";
import { getLogs } from "../../../services/log";
import { requireAuth } from "../../../utils/auth";

export const logQueries = {
  logs: async (
    _: unknown,
    __: unknown,
    context: { user: string | JwtPayload | null }
  ) => {
    try {
      const auth = requireAuth(context.user, "LogError");

      if ("error" in auth) return auth.error;

      const result = await getLogs();

      return result;
    } catch (error) {
      return {
        __typename: "LogError",
        code: "FETCH_ERROR",
        message: "Failed to fetch logs",
      };
    }
  },
};
