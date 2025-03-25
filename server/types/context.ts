import { YogaInitialContext } from "graphql-yoga";

export interface GraphQLContext extends YogaInitialContext {
  request: Request;
  user: string | import("jsonwebtoken").JwtPayload | null;
}
