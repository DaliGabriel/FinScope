import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createYoga } from "graphql-yoga";
import { schema } from "../graphql/schema";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// GraphQL middleware
const yoga = createYoga({ schema });
app.use("/graphql", yoga);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`🧠 GraphQL at http://localhost:${port}/graphql`);
});
