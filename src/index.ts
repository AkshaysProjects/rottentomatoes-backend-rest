import express, { Response } from "express";
import connectDb from "./db";
import { env } from "./env";
import apiRouter from "./routes";

// Create a new express application instance
const app = express();

// Parse the JSON body
app.use(express.json());

// Define a route handler for the default home page
app.get("/", (_req, res: Response) => {
  res.send("Hello World");
});

// Define a route handler for the /api path
app.use("/api", apiRouter);

// Function to start the app
async function startApp() {
  // Wait for the database connection
  await connectDb();

  // Start the server
  app.listen(env.PORT, () => {
    console.log("Server is running on port 3000");
  });
}

// Start the app
startApp();
