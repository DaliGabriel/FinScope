import { GraphQLContext } from "../../../types/context";
import { GraphQLResolveInfo } from "graphql";

export const transactionUnionResolvers = {
  TransactionCreationResult: {
    __resolveType(obj: any, context: GraphQLContext, info: GraphQLResolveInfo) {
      if (obj.__typename) return obj.__typename;
      if ("transaction" in obj) return "TransactionCreationSuccess";
      if ("code" in obj) return "TransactionCreationError";
      return null;
    },
  },
  TransactionListResult: {
    __resolveType(obj: any, context: GraphQLContext, info: GraphQLResolveInfo) {
      if (obj.__typename) return obj.__typename;
      if ("transactions" in obj) return "TransactionListSuccess";
      if ("code" in obj) return "TransactionError";
      return null;
    },
  },
};
