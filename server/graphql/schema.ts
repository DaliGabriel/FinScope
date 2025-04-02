import { createSchema } from "graphql-yoga";
import { GraphQLContext } from "../types/context";

import { transactionResolvers } from "./resolvers/transaction";
import { authTypeDefs } from "./typeDefs/auth";
import { logTypeDefs } from "./typeDefs/log";
import { transactionTypeDefs } from "./typeDefs/transaction";
import { authResolvers } from "./resolvers/auth";
import { logResolvers } from "./resolvers/log";
import { authUnionResolvers } from "./resolvers/auth/__resolveTypes";

// Merge resolvers
const mergedResolvers = {
  Query: {
    ...transactionResolvers.Query,
    ...authResolvers.Query,
  },
  Mutation: {
    ...transactionResolvers.Mutation,
    ...authResolvers.Mutation,
    ...logResolvers.Mutation,
  },

  TransactionCreationResult: transactionResolvers.TransactionCreationResult,
  UserResult: authUnionResolvers.UserResult,
  RegisterResult: authUnionResolvers.RegisterResult,
  LoginResult: authUnionResolvers.LoginResult,
  LogCreationResult: logResolvers.LogCreationResult,
};

export const schema = createSchema<GraphQLContext>({
  typeDefs: [transactionTypeDefs, logTypeDefs, authTypeDefs],
  resolvers: mergedResolvers,
});
