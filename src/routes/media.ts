import { Router } from "express";
import { getMedia, getMediaById, getMediaFilters } from "../controllers/media";

// Create a new express router
const mediaRouter = Router();

// Route to get all media
mediaRouter.get("/", getMedia);

// Route to get media by id
mediaRouter.get("/:id", getMediaById);

// Route to get media filters
mediaRouter.get("/filters", getMediaFilters);

export default mediaRouter;
