// rating: z.array(z.number()).length(2).default([0, 100]).optional(),
// languages: z.array(z.string()).default([]).optional(),
// releaseYear: z
//   .array(z.number())
//   .length(2)
//   .default([1900, new Date().getFullYear()])
//   .optional(),
// status: z.array(z.string()).default([]).optional(),
// genres: z.array(z.string()).default([]).optional(),
// type: z.enum([MediaType.MOVIE, MediaType.TV_SHOW]).optional(),

import { MediaType } from "../enums";
import { Filters } from "../schemas/filters";

// query: z.string().optional(),
export default function parseFilters(rawFilters: { [key: string]: string }) {
  const { rating, languages, releaseYear, status, genres, type, query } =
    rawFilters;

  const filters: Filters = {};

  // Parse rating filter
  if (rating) {
    const [min, max] = rating.split(",").map((r) => parseInt(r));
    filters.rating = [min!, max!];
  }

  // Parse languages filter
  if (languages) {
    filters.languages = languages.split(",");
  }

  // Parse releaseYear filter
  if (releaseYear) {
    const [min, max] = releaseYear.split(",").map((r) => parseInt(r));
    filters.releaseYear = [min!, max!];
  }

  // Parse status filter
  if (status) {
    filters.status = status.split(",");
  }

  // Parse genres filter
  if (genres) {
    filters.genres = genres.split(",");
  }

  // Parse type filter
  if (type) {
    filters.type = MediaType[type as keyof typeof MediaType];
  }

  // Parse query filter
  if (query) {
    filters.query = query;
  }

  return filters;
}
