import { getLogs } from "../../../services/log";

export const logQueries = {
  logs: async () => getLogs(),
};
