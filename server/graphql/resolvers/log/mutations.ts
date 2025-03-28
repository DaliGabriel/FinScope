import { createLog } from "../../../services/log";
import { CreateLogInput } from "../../../types/log";

export const logMutations = {
  createLog: async (_: unknown, args: CreateLogInput) => {
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
