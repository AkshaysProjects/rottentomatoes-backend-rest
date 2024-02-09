import cookieParser from "cookie-parser";
import express, { Response } from "express";
import swaggerUi from "swagger-ui-express";
import connectDb from "./db";
import { env } from "./env";
import apiRouter from "./routes";
import { swaggerSpec } from "./swagger";

// Create a new express application instance
const app = express();

// Parse the JSON body
app.use(express.json());

// Parse the cookies
app.use(cookieParser());

/**
 * @swagger
 * /:
 *   get:
 *     description: Returns the homepage
 *     responses:
 *       200:
 *         description: hello world
 */
// Define a route handler for the default home page
app.get("/", (_req, res: Response) => {
  res.send("Hello World");
});

// Define a route handler for the /api path
app.use("/api", apiRouter);

// Serve the Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
