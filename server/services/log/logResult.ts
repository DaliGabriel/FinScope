import { LogEntry } from "../../generated/mongo";

export const createLogListGraphQL = (logs: LogEntry[]) => ({
  __typename: "LogListSuccess",
  logs: logs.map((log) => ({
    __typename: "LogEntry",
    id: log.id,
    action: log.action,
    details: log.details,
    timestamp: log.timestamp.toISOString(),
    userId: log.userId,
  })),
});

export const createLogGraphQL = (log: LogEntry) => ({
  __typename: "LogCreationSuccess",
  log: {
    __typename: "LogEntry",
    id: log.id,
    action: log.action,
    details: log.details,
    timestamp: log.timestamp.toISOString(),
    userId: log.userId,
  },
});

export const createLogError = (code: string, message: string) => ({
  __typename: "LogError",
  code,
  message,
});
