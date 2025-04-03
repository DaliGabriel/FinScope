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
    ...logResolvers.Query,
  },
  Mutation: {
    ...transactionResolvers.Mutation,
    ...authResolvers.Mutation,
    ...logResolvers.Mutation,
  },
  // Include all other resolvers (including union resolvers) from each module
  ...Object.fromEntries(
    Object.entries({
      ...transactionResolvers,
      ...authResolvers,
      ...logResolvers,
    }).filter(([key]) => key !== "Query" && key !== "Mutation")
  ),
};

export const schema = createSchema<GraphQLContext>({
  typeDefs: [transactionTypeDefs, logTypeDefs, authTypeDefs],
  resolvers: mergedResolvers,
});
