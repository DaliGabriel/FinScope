import { createSchema } from 'graphql-yoga';
import { transactionResolvers } from './resolvers/transaction';
import { logResolvers } from './resolvers/log';
import { transactionTypeDefs } from './typeDefs/transaction';
import { logTypeDefs } from './typeDefs/log';

// Merge resolvers
const mergedResolvers = {
  Query: {
    ...transactionResolvers.Query,
  },
  Mutation: {
    ...transactionResolvers.Mutation,
    ...logResolvers 
    .Mutation,
  },
};

export const schema = createSchema({
  typeDefs: [transactionTypeDefs, logTypeDefs],
  resolvers: mergedResolvers,
});
