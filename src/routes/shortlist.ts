import { Router } from "express";
import {
  addToShortlist,
  getShortlist,
  removeFromShortlist,
} from "../controllers/shortlist";
import authenticate from "../middlewares/authenticate";

// Create a new express router
const shortlistRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Shortlist
 *   description: Shortlist management
 */

// Guard all routes after this
shortlistRouter.use(authenticate);

/**
 * @swagger
 * /api/shortlist:
 *   get:
 *     summary: Get the logged in user's shortlist
 *     tags: [Shortlist]
 *     responses:
 *       200:
 *         description: User's shortlist retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
shortlistRouter.get("/", getShortlist);

/**
 * @swagger
 * /api/shortlist/{id}:
 *   post:
 *     summary: Add media to the logged in user's shortlist
 *     tags: [Shortlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Media ID to add to shortlist
 *     responses:
 *       200:
 *         description: Media added to shortlist successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
shortlistRouter.post("/:id", addToShortlist);

/**
 * @swagger
 * /api/shortlist/{id}:
 *   delete:
 *     summary: Remove media from the logged in user's shortlist
 *     tags: [Shortlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Media ID to remove from shortlist
 *     responses:
 *       200:
 *         description: Media removed from shortlist successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
shortlistRouter.delete("/:id", removeFromShortlist);

export default shortlistRouter;
