import { logUnionResolvers } from "./__resolveTypes";
import { logMutations } from "./mutations";
import { logQueries } from "./queries";

export const logResolvers = {
  Query: {
    ...logQueries,
  },
  Mutation: {
    ...logMutations,
  },
  ...logUnionResolvers,
};
