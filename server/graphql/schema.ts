import { createSchema } from "graphql-yoga";
import { transactionResolvers } from "./resolvers/transaction";
import { logResolvers } from "./resolvers/log";
import { transactionTypeDefs } from "./typeDefs/transaction";
import { logTypeDefs } from "./typeDefs/log";
import { GraphQLContext } from "../types/context";
import { authResolvers } from "./resolvers/auth";
import { authTypeDefs } from "./typeDefs/auth";

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
};

export const schema = createSchema<GraphQLContext>({
  typeDefs: [transactionTypeDefs, logTypeDefs, authTypeDefs],
  resolvers: mergedResolvers,
});
