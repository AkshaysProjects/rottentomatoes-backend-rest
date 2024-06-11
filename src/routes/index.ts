import { Router } from "express";
import mediaRouter from "./media";
import shortlistRouter from "./shortlist";
import userRouter from "./user";

// Create a new express router
const apiRouter = Router();

// Use the user router for the /user path
apiRouter.use("/user", userRouter);

// Use the shortlist router for the /shortlist path
apiRouter.use("/shortlist", shortlistRouter);

// Use the media router for the /media path
apiRouter.use("/media", mediaRouter);

export default apiRouter;
