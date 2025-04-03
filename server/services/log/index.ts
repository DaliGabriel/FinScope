import { CreateLogInput } from "../../types/log";
import { createLogGraphQL, createLogListGraphQL } from "./logResult";
import { createLogError } from "./logResult";
import { createLog, getAllLogs } from "./logService";

export const getLogs = async () => {
  try {
    const logs = await getAllLogs();
    return createLogListGraphQL(logs);
  } catch (error) {
    return createLogError("FETCH_ERROR", "Failed to fetch logs");
  }
};

export const createLogs = async (input: CreateLogInput) => {
  try {
    const log = await createLog(input);
    return createLogGraphQL(log);
  } catch (error) {
    return createLogError("CREATE_ERROR", "Failed to create log");
  }
};
