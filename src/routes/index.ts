import { Router } from "express";
import userRouter from "./user";

// Create a new express router
const apiRouter = Router();

// Use the user router for the /user path
apiRouter.use("/user", userRouter);

export default apiRouter;
