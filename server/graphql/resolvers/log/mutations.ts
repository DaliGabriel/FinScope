import { JwtPayload } from "jsonwebtoken";
import { createLog } from "../../../services/log";
import { CreateLogInput } from "../../../types/log";
import { requireAuth } from "../../../utils/auth";

export const logMutations = {
  createLog: async (
    _: unknown,
    args: CreateLogInput,
    context: { user: string | JwtPayload | null }
  ) => {
    const auth = requireAuth(context.user, "LogCreationError");

    if ("error" in auth) return auth;

    try {
      const log = await createLog({ ...args });
      return {
        __typename: "LogCreationSuccess",
        log,
      };
    } catch (error) {
      console.error("Error creating log:", error);
      return {
        __typename: "LogCreationError",
        code: "LOG_CREATION_FAILED",
        message: "Failed to create log.",
      };
    }
  },
};
