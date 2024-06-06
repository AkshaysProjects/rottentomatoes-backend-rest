import mongoose from "mongoose";
import { env } from "../env";

// Check URI
const uri = env.DATABASE_URL;

// Connect to database
export default async function connectDb() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
}
