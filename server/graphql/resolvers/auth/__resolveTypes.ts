import { GraphQLResolveInfo } from "graphql";
import { GraphQLContext } from "../../../types/context";

export const authUnionResolvers = {
  AuthCreationResult: {
    __resolveType(obj: any, context: GraphQLContext, info: GraphQLResolveInfo) {
      if (obj.__typename) return obj.__typename;
      if ("user" in obj) return "RegisterSuccess";
      if ("authPayload" in obj) return "loginSuccess";
      if ("code" in obj) return "AuthError";
      return null;
    },
  },
};
