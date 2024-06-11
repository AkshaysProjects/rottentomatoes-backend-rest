import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

export function validateData(schema: z.ZodObject<any, any>) {
  // Return a middleware function
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse the request body
      req.body = schema.parse(req.body);

      // Call the next middleware
      return next();
    } catch (error) {
      // Check if the error is a ZodError
      if (error instanceof ZodError) {
        // Map the errors to a more readable format
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));

        // Return the error response
        res.status(400).json({ error: "Invalid data", details: errorMessages });
      } else {
        // Return a generic error response
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
