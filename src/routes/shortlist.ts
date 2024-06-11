import { Router } from "express";
import {
  addToShortlist,
  getShortlist,
  removeFromShortlist,
} from "../controllers/shortlist";
import authenticate from "../middlewares/authenticate";

// Create a new express router
const shortlistRouter = Router();

// Guard all routes after this
shortlistRouter.use(authenticate);

// Route to get the logged in shortlist
shortlistRouter.get("/", getShortlist);

// Route to logout the logged in shortlist
shortlistRouter.post("/:id", addToShortlist);

// Route to update the logged in shortlist
shortlistRouter.delete("/:id", removeFromShortlist);

export default shortlistRouter;
