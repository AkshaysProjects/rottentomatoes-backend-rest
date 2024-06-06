import "dotenv/config";
import { z } from "zod";

// Define the schema for the environment variables
const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z
    .string({ message: "Database URL is required" })
    .url({ message: "Database URL must be a valid URL" }),
});

// Ensure the parsed environment variables
export const env = envSchema.parse(process.env);
