import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createYoga } from "graphql-yoga";
import { schema } from "../graphql/schema";
import jwt, { JwtPayload } from "jsonwebtoken";
import { GraphQLContext } from "../types/context";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const yoga = createYoga<GraphQLContext>({
  schema,
  context: ({ request }) => {
    let user: string | JwtPayload | null = null;

    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        user = jwt.verify(token, process.env.JWT_SECRET!);
      } catch {
        user = null;
      }
    }

    return {
      request,
      user,
    };
  },
});

app.use("/graphql", yoga.requestListener);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`🧠 GraphQL at http://localhost:${port}/graphql`);
});
