import { authUnionResolvers } from "./__resolveTypes";
import { authMutations } from "./mutations";
import { authQueries } from "./queries";

export const authResolvers = {
  Query: {
    ...authQueries,
  },
  Mutation: {
    ...authMutations,
  },
  ...authUnionResolvers,
};
