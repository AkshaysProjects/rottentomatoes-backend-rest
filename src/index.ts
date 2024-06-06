import express, { Response } from "express";

// Create a new express application instance
const app = express();

// Define a route handler for the default home page
app.get("/", (_req, res: Response) => {
  res.send("Hello World");
});

// Function to start the app
function startApp() {
  // TODO: Use a port from environment variables
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

// Start the app
startApp();
