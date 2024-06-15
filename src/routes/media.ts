import { Router } from "express";
import { getMedia, getMediaById, getMediaFilters } from "../controllers/media";

// Create a new express router
const mediaRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Media management
 */

/**
 * @swagger
 * /api/media:
 *   get:
 *     summary: Get a list of media items
 *     tags: [Media]
 *     parameters:
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: number
 *         description: Cursor for pagination
 *       - in: query
 *         name: rating
 *         schema:
 *           type: string
 *         description: Filter by rating range (e.g., rating=20,100 for min 20 and max 100)
 *       - in: query
 *         name: releaseYear
 *         schema:
 *           type: string
 *         description: Filter by release year range (e.g., releaseYear=2000,2020)
 *       - in: query
 *         name: languages
 *         schema:
 *           type: string
 *         style: form
 *         explode: true
 *         description: Filter by languages (comma-separated list)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         style: form
 *         explode: true
 *         description: Filter by status (comma-separated list)
 *       - in: query
 *         name: genres
 *         schema:
 *           type: string
 *         style: form
 *         explode: true
 *         description: Filter by genres (comma-separated list)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by media type
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Free text search query
 *     responses:
 *       200:
 *         description: A list of media items
 *       500:
 *         description: Internal server error
 */
mediaRouter.get("/", getMedia);

/**
 * @swagger
 * /api/media/filters:
 *   get:
 *     summary: Get available filters for media
 *     tags: [Media]
 *     responses:
 *       200:
 *         description: Media filters retrieved successfully
 *       500:
 *         description: Internal server error
 */
mediaRouter.get("/filters", getMediaFilters);

/**
 * @swagger
 * /api/media/{id}:
 *   get:
 *     summary: Get a media item by ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Media ID to fetch
 *     responses:
 *       200:
 *         description: Media item found
 *       404:
 *         description: Media not found
 *       500:
 *         description: Internal server error
 */
mediaRouter.get("/:id", getMediaById);

export default mediaRouter;
