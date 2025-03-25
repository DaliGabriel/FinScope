import { createLog, getLogs } from "../../services/log";
import { CreateLogInput } from "../../types/log";

export const logResolvers = {
  Query: {
    logs: getLogs(),
  },
  Mutation: {
    createLog: (_: unknown, args: CreateLogInput) => createLog(args),
  },
};
