import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { User } from "../models";
import { sendVerificationEmail } from "../utils/mailer";

// Create a new user
export async function createUser(req: Request, res: Response) {
  // Create a new user
  return new User(req.body)
    .save() // Save the user to the database
    .then(async (user) => {
      // Verification Token
      const verificationToken = await user.generateVerificationToken();

      // Resend Token
      const resendToken = await user.generateResendToken();

      // Verification Link
      const verificationLink = `${env.CLIENT_URL}/api/user/verify-email?token=${verificationToken}`;

      // Resend Link
      const resendLink = `${env.CLIENT_URL}/api/user/resend-email?token=${resendToken}`;

      // Send a verification email
      sendVerificationEmail(
        user.email,
        user.name,
        verificationLink,
        resendLink
      );

      // Return the user
      return res.status(201).json({
        success: true,
        user: { id: user._id, email: user.email, name: user.name },
      });
    })
    .catch((error) => {
      if (error.code === 11000)
        return res.status(400).json({ error: "Email already exists" });
      else return res.status(400).json({ error: error.message });
    });
}

// Verify a user's email
export async function verifyEmail(req: Request, res: Response) {
  // Get the token from the request
  const token = req.query.token as string;

  // Check if the token is provided
  if (!token) return res.status(400).json({ error: "Token not provided" });

  // Verify the token
  try {
    const { email } = jwt.verify(token, env.JWT_SECRET) as {
      email: string;
    };

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if the email is already verified
    if (user.emailverified)
      return res.status(400).json({ error: "Email already verified" });

    // Update the user
    user.emailverified = true;

    // Save the user
    await user.save();

    // Get the jwt token
    const jwtToken = await user.generateToken();

    // Set the jwt token in the cookie
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "Email verified" });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError)
      return res.status(400).json({ error: "Invalid token" });
    else return res.status(500).json({ error: "An error occurred" });
  }
}

// Resend a verification email
export async function resendEmail(req: Request, res: Response) {
  // Get the token from the request
  const token = req.query.token as string;

  // Check if the token is provided
  if (!token) return res.status(400).json({ error: "Token not provided" });

  // Verify the token
  try {
    const { email } = jwt.verify(token, env.JWT_SECRET) as {
      email: string;
    };

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if the email is already verified
    if (user.emailverified)
      return res.status(400).json({ error: "Email already verified" });

    // Verification Token
    const verificationToken = await user.generateVerificationToken();

    // Resend Token
    const resendToken = await user.generateResendToken();

    // Verification Link
    const verificationLink = `${env.CLIENT_URL}/api/user/verify-email?token=${verificationToken}`;

    // Resend Link
    const resendLink = `${env.CLIENT_URL}/api/user/resend-email?token=${resendToken}`;

    // Send a verification email
    sendVerificationEmail(user.email, user.name, verificationLink, resendLink);

    return res.status(200).json({ message: "Verification Email Resent" });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError)
      return res.status(400).json({ error: "Invalid token" });
    else return res.status(500).json({ error: "An error occurred" });
  }
}

// Login a user
export async function loginUser(req: Request, res: Response) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (!user.emailverified)
      return res.status(401).json({ error: "Email not verified" });

    const passwordMatch = await user.comparePassword(req.body.password);
    if (!passwordMatch)
      return res.status(401).json({ error: "Invalid credentials" });

    // Get the jwt token
    const jwtToken = await user.generateToken();

    // Set the jwt token in the cookie
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "An error occurred" });
  }
}

// TODO: Implement after authentication
// Get the logged in user
// export function getUser(req: Request, res: Response) {}
// // Update the logged in user
// export function updateUser(req: Request, res: Response) {}

// // Delete the logged in user
// export function deleteUser(req: Request, res: Response) {}
