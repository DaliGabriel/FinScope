import { JwtPayload } from "jsonwebtoken";
import { registerUser, loginUser, getUserById } from "../../services/auth";

export const authResolvers = {
  Query: {
    currentUser: async (
      _: unknown,
      __: any,
      context: { user: string | JwtPayload | null }
    ) => {
      console.log("currentUser", context.user);

      if (!context.user || typeof context.user === "string") return null;

      const userId = (context.user as JwtPayload).userId;
      return getUserById(userId);
    },
  },
  Mutation: {
    register: async (_: unknown, { email, password, name }: any) => {
      return registerUser(email, password, name);
    },
    login: async (_: unknown, { email, password }: any) => {
      const { accessToken, user } = await loginUser(email, password);
      return {
        accessToken,
        user,
      };
    },
  },
};
