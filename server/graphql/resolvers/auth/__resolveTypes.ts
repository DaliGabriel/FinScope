import { GraphQLResolveInfo } from "graphql";
import { GraphQLContext } from "../../../types/context";

export const authUnionResolvers = {
  UserResult: {
    __resolveType(obj: any, context: GraphQLContext, info: GraphQLResolveInfo) {
      if (obj.__typename) return obj.__typename;
      if ("currentUser" in obj) return "UserSuccess";
      if ("code" in obj) return "AuthError";
      return null;
    },
  },
  RegisterResult: {
    __resolveType(obj: any, context: GraphQLContext, info: GraphQLResolveInfo) {
      if (obj.__typename) return obj.__typename;
      if ("user" in obj) return "RegisterSuccess";
      if ("code" in obj) return "AuthError";
      return null;
    },
  },
  LoginResult: {
    __resolveType(obj: any, context: GraphQLContext, info: GraphQLResolveInfo) {
      if (obj.__typename) return obj.__typename;
      if ("authPayload" in obj) return "LoginSuccess";
      if ("code" in obj) return "AuthError";
      return null;
    },
  },
};
