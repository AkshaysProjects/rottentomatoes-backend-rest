import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  loginUser,
  resendEmail,
  updateUser,
  verifyEmail,
  logoutUser,
} from "../controllers/user";
import authenticate from "../middlewares/authenticate";
import { validateData } from "../middlewares/validation";
import {
  userLoginSchema,
  userRegistrationSchema,
  userUpdateSchema,
} from "../schemas/user";

// Create a new express router
const userRouter = Router();

// Route to create a new user
userRouter.post("/", validateData(userRegistrationSchema), createUser);

// Route to verify a user's email
userRouter.get("/verify-email/", verifyEmail);

// Route to resend a verification email
userRouter.get("/resend-email/", resendEmail);

// Route to login a user
userRouter.post("/login", validateData(userLoginSchema), loginUser);

// Guard all routes after this
userRouter.use(authenticate);

// Route to get the logged in user
userRouter.get("/", getUser);

// Route to logout the logged in user
userRouter.get("/logout", logoutUser);

// Route to update the logged in user
userRouter.patch("/", validateData(userUpdateSchema), updateUser);

// Route to delete a user by id
userRouter.delete("/", deleteUser);

export default userRouter;
