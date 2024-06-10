import { Request, Response } from "express";
import { User } from "../models";

// Create a new user
export async function createUser(req: Request, res: Response) {
  return new User(req.body)
    .save()
    .then((user) => {
      return res.status(201).json(user);
    })
    .catch((error) => {
      if (error.code === 11000)
        return res.status(400).json({ error: "Email already exists" });
      else return res.status(400).json({ error: error.message });
    });
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

    // TODO: Implement authentication (JWT with cookies)
    // await authenticate(user, res);

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
