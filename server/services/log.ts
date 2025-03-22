import { mongo } from "../config/prisma";
import { CreateLogInput } from "../types/log";

export const createLog = async (args: CreateLogInput) => {
  return mongo.logEntry.create({
    data: {
      ...args,
      timestamp: new Date()
    }
  });
};

export const getLogs = async () => {
  return mongo.logEntry.findMany();
};

