import { registerUser, loginUser } from "../../services/auth";

export const authResolvers = {
  Mutation: {
    register: async (_: unknown, { email, password }: any) => {
      return registerUser(email, password);
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
