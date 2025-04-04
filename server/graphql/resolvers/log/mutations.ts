import { JwtPayload } from "jsonwebtoken";
import { createLogs } from "../../../services/log";
import { CreateLogInput } from "../../../types/log";
import { requireAuth } from "../../../utils/auth";

export const logMutations = {
  createLog: async (
    _: unknown,
    args: CreateLogInput,
    context: { user: string | JwtPayload | null }
  ) => {
    const auth = requireAuth(context.user, "LogError");

    if ("error" in auth) return auth.error;

    try {
      const result = await createLogs({ ...args, userId: auth.userId });

      return result;
    } catch (error) {
      console.error("Error creating log:", error);
      return {
        __typename: "LogError",
        code: "LOG_CREATION_FAILED",
        message: "Failed to create log.",
      };
    }
  },
};
