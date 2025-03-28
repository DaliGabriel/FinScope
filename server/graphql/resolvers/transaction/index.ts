import { transactionUnionResolvers } from "./__resolveTypes";
import { transactionMutations } from "./mutations";
import { transactionQueries } from "./queries";

export const transactionResolvers = {
  Query: {
    ...transactionQueries,
  },
  Mutation: {
    ...transactionMutations,
  },
  ...transactionUnionResolvers,
};
