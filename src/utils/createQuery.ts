import { DateExpression } from "mongoose";
import { Filters } from "../schemas/filters";

// Define the type for the query object
type Query = {
  rating?: { $gte: number; $lte: number };
  language?: { $in: string[] };
  $or?: Array<{
    [key: string]: { $gte: DateExpression; $lte: DateExpression };
  }>;
  status?: { $in: string[] };
  genres?: { $elemMatch: { $in: string[] } };
  type?: string;
  title?: { $regex: string; $options: string };
};

// Function to create a query object based on provided filters
export default function createQuery(filters: Filters) {
  const query: Query = {};

  // Check if rating filter is provided and contains two elements
  if (filters.rating && filters.rating.length === 2) {
    // Add rating range to the query
    query.rating = { $gte: filters.rating[0]!, $lte: filters.rating[1]! };
  }

  // Check if languages filter is provided and is not empty
  if (filters.languages && filters.languages.length) {
    // Add languages to the query
    query.language = { $in: filters.languages };
  }

  // Check if releaseYear filter is provided and contains two elements
  if (filters.releaseYear && filters.releaseYear.length === 2) {
    // Add a condition to match either releaseDate or firstAirDate within the specified range
    query.$or = [
      {
        releaseDate: {
          $gte: new Date(filters.releaseYear[0]!, 0, 1),
          $lte: new Date(filters.releaseYear[1]!, 11, 31),
        },
      },
      {
        firstAirDate: {
          $gte: new Date(filters.releaseYear[0]!, 0, 1),
          $lte: new Date(filters.releaseYear[1]!, 11, 31),
        },
      },
    ];
  }

  // Check if status filter is provided and is not empty
  if (filters.status && filters.status.length) {
    // Add status to the query
    query.status = { $in: filters.status };
  }

  // Check if genres filter is provided and is not empty
  if (filters.genres && filters.genres.length) {
    // Add genres to the query
    query.genres = { $elemMatch: { $in: filters.genres } };
  }

  // Check if type filter is provided
  if (filters.type) {
    // Add type to the query
    query.type = filters.type;
  }

  // Check if the query is provided
  if (filters.query) {
    // Add a condition to match the title with a case-insensitive regex
    query.title = { $regex: filters.query, $options: "i" };
  }

  // Return the constructed query object
  return query;
}
