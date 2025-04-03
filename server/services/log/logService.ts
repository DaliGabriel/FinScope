import { CreateLogInput } from "../../types/log";

import { mongo } from "../../config/prisma";

export const createLog = async (input: CreateLogInput) => {
  return mongo.logEntry.create({
    data: {
      ...input,
      timestamp: new Date(),
    },
  });
};

export const getAllLogs = async () => {
  return mongo.logEntry.findMany();
};
