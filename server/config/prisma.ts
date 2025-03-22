import { PrismaClient as PostgresClient } from '../generated/postgres';
import { PrismaClient as MongoClient } from '../generated/mongo';

export const postgres = new PostgresClient();
export const mongo = new MongoClient();