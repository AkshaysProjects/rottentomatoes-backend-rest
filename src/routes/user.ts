import { Router } from "express";
import { createUser, loginUser } from "../controllers/user";
import { validateData } from "../middlewares/validation";
import { userLoginSchema, userRegistrationSchema } from "../schemas/user";

// Create a new express router
const userRouter = Router();

// Route to create a new user
userRouter.post("/", validateData(userRegistrationSchema), createUser);

// Route to login a user
userRouter.post("/login", validateData(userLoginSchema), loginUser);

// TODO: Implement after authentication
// Route to get the logged in user
// userRouter.get("/", getUser);

// // Route to update the logged in user
// userRouter.put("/", validateData(userUpdateSchema), updateUser);

// // Route to delete a user by id
// userRouter.delete("/", deleteUser);

export default userRouter;
