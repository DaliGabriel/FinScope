import { GraphQLResolveInfo } from "graphql";

export const logUnionResolvers = {
  LogCreationResult: {
    __resolveType(obj: any, info: GraphQLResolveInfo) {
      if (obj.__typename) return obj.__typename;
      if ("log" in obj) return "LogCreationSuccess";
      if ("code" in obj) return "LogCreationError";
      return null;
    },
  },
};
