import express, { Response } from "express";
import { env } from "./env";

// Create a new express application instance
const app = express();

// Define a route handler for the default home page
app.get("/", (_req, res: Response) => {
  res.send("Hello World");
});

// Function to start the app
function startApp() {
  app.listen(env.PORT, () => {
    console.log("Server is running on port 3000");
  });
}

// Start the app
startApp();
