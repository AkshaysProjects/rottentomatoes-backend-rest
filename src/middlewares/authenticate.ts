import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { env } from "../env";
import { User } from "../models";

export default async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Fetch the token from the cookies
  const token = req.cookies.token as string;

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Verify the token
  try {
    const { email } = jwt.verify(token, env.JWT_SECRET) as {
      email: string;
    };

    // Find the user by email
    const user = await User.findOne({ email }).lean();

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach the user to the request
    res.locals.user = user;

    // Call the next middleware
    return next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(400).json({ error: "Invalid token" });
    } else {
      return res.status(500).json({ error: "An error occurred" });
    }
  }
}
