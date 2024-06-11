import { Request, Response } from "express";
import { Media } from "../models";
import createQuery from "../utils/createQuery";
import parseFilters from "../utils/parseFilters";

// Get all media
export async function getMedia(req: Request, res: Response) {
  try {
    // Get raw cursor and filters
    const { cursorStr, ...rawFilters } = req.query;

    // Parse cursor
    const cursor = parseInt(cursorStr as string) || 1;
    const offset = cursor ? cursor - 1 : 0;

    // Parse filters
    const filters = parseFilters(rawFilters as { [key: string]: string });
    const query = createQuery(filters);

    // Fetch media
    const data = await Media.find(query).skip(offset).limit(20).lean();

    // Return media
    const ret =
      data.length === 20 ? { data, nextCursor: cursor + 20 } : { data };
    return res.status(200).json(ret);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "An error occurred" });
  }
}

// Get a single media
export async function getMediaById(req: Request, res: Response) {
  try {
    // Get media ID from the request parameters
    const { id } = req.params;

    // Fetch media by ID
    const media = await Media.findById(id).lean();

    // If media is not found, return an error
    if (!media) return res.status(404).json({ error: "Media not found" });

    // Return media
    return res.status(200).json(media);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "An error occurred" });
  }
}

// Get available media filters
export async function getMediaFilters(_req: Request, res: Response) {
  try {
    // Fetch distinct languages
    const languages = await Media.distinct("language");

    // Fetch distinct status
    const status = await Media.distinct("status");

    // Fetch distinct genres
    const genres = await Media.aggregate([
      { $unwind: "$genres" },
      { $group: { _id: "$genres" } },
    ]).then((res) => res.map((g) => g._id));

    // Fetch min and max release years
    const releaseYear = await Media.aggregate([
      {
        $group: {
          _id: null,
          releaseYears: { $addToSet: { $year: "$releaseDate" } },
          firstAirYears: { $addToSet: { $year: "$firstAirDate" } },
        },
      },
      {
        $project: {
          releaseYears: { $setUnion: ["$releaseYears", "$firstAirYears"] },
        },
      },
      { $unwind: "$releaseYears" },
      {
        $group: {
          _id: null,
          minReleaseYear: { $min: "$releaseYears" },
          maxReleaseYear: { $max: "$releaseYears" },
        },
      },
      {
        $project: {
          _id: 0,
          minReleaseYear: 1,
          maxReleaseYear: 1,
        },
      },
    ]);

    return res.status(200).json({
      languages,
      status,
      genres,
      releaseYear: Object.values(releaseYear[0]) as [number, number],
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    else return res.status(500).json({ error: "An error occurred" });
  }
}
