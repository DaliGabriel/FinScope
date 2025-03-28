import { createSchema } from "graphql-yoga";
import { GraphQLContext } from "../types/context";

import { transactionResolvers } from "./resolvers/transaction";
import { authTypeDefs } from "./typeDefs/auth";
import { logTypeDefs } from "./typeDefs/log";
import { transactionTypeDefs } from "./typeDefs/transaction";
import { authResolvers } from "./resolvers/auth";
import { logResolvers } from "./resolvers/log";

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
  RegisterResult: authResolvers.AuthCreationResult,
  LoginResult: authResolvers.AuthCreationResult,
  LogCreationResult: logResolvers.LogCreationResult,
};

export const schema = createSchema<GraphQLContext>({
  typeDefs: [transactionTypeDefs, logTypeDefs, authTypeDefs],
  resolvers: mergedResolvers,
});
