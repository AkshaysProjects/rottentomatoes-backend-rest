import { z } from "zod";

export const userRegistrationSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const userUpdateSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  email: z.string().email().optional(),
  image: z.string().url().optional(),
});
