import { MediaType } from "../enums";
import { z } from "zod";

// Default values for the filter object
const defaultFilter = {
  rating: [0, 100],
  languages: [],
  releaseYear: [1900, new Date().getFullYear()],
  status: [],
  genres: [],
};

// Define a Zod schema for the filters
export const filtersSchema = z
  .object({
    // Rating should be an array of two numbers, with default values [0, 100]
    rating: z.array(z.number()).length(2).default([0, 100]).optional(),
    // Languages should be an array of strings, with default value []
    languages: z.array(z.string()).default([]).optional(),
    // ReleaseYear should be an array of two numbers, with default values [1900, current year]
    releaseYear: z
      .array(z.number())
      .length(2)
      .default([1900, new Date().getFullYear()])
      .optional(),
    // Status should be an array of strings, with default value []
    status: z.array(z.string()).default([]).optional(),
    // Genres should be an array of strings, with default value []
    genres: z.array(z.string()).default([]).optional(),
    // Type should be an optional enum value of MediaType (MOVIE or TV_SHOW)
    type: z.enum([MediaType.MOVIE, MediaType.TV_SHOW]).optional(),
    // Query should be an optional string
    query: z.string().optional(),
  })
  // Set the default values for the schema
  .default(defaultFilter);

// Infer the TypeScript type from the Zod schema
export type Filters = z.infer<typeof filtersSchema>;
