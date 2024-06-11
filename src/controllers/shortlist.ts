import { Request, Response } from "express";
import { ObjectId, User } from "../models";

// Get the user's shortlist
export async function getShortlist(_req: Request, res: Response) {
  try {
    // Get the user from the response locals
    const userId = res.locals.user._id;

    // Fetch the user from the database
    const user = await User.findById(userId).populate("shortlist");

    // If the user is not found, return an error
    if (!user) return res.status(404).json({ error: "User not found" });

    // Return the user's shortlist
    return res.json(user.shortlist);
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    else return res.status(500).json({ error: "An error occurred" });
  }
}

// Add a media to the user's shortlist
export async function addToShortlist(req: Request, res: Response) {
  try {
    // Get the user from the response locals
    const userId = res.locals.user._id;

    // Get the media ID from the request parameters
    const mediaId = req.params.id;

    // Fetch the user from the database
    const user = await User.findById(userId);

    // If the user is not found, return an error
    if (!user) return res.status(404).json({ error: "User not found" });

    // Add the job to the user's shortlist
    if (!user.shortlist.some((item) => item.toString() === mediaId))
      user.shortlist.push(new ObjectId(mediaId));

    // Save the user
    await user.save();

    // Populate the shortlist
    await user.populate("shortlist");

    // Return the user shortlist
    return res.json(user.shortlist);
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    else return res.status(500).json({ error: "An error occurred" });
  }
}

// Remove a media from the user's shortlist
export async function removeFromShortlist(req: Request, res: Response) {
  try {
    // Get the user from the response locals
    const userId = res.locals.user._id;

    // Get the media ID from the request parameters
    const mediaId = req.params.id;

    // Fetch the user from the database
    const user = await User.findById(userId);

    // If the user is not found, return an error
    if (!user) return res.status(404).json({ error: "User not found" });

    // Remove the media from the user's shortlist
    user.shortlist = user.shortlist.filter((id) => id.toString() !== mediaId);

    // Save the user
    await user.save();

    // Populate the shortlist
    await user.populate("shortlist");

    // Return the user shortlist
    return res.json(user.shortlist);
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    else return res.status(500).json({ error: "An error occurred" });
  }
}
