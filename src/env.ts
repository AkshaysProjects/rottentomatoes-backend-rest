import "dotenv/config";
import { z } from "zod";

// Define the schema for the environment variables
const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z
    .string({ message: "Database URL is required" })
    .url({ message: "Database URL must be a valid URL" }),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number().default(465),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  JWT_SECRET: z.string(),
  CLIENT_URL: z.string().url().default("http://localhost:3000"),
});

// Ensure the parsed environment variables
export const env = envSchema.parse(process.env);
