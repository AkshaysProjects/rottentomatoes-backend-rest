import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  loginUser,
  logoutUser,
  resendEmail,
  updateUser,
  verifyEmail,
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

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
userRouter.post("/", validateData(userRegistrationSchema), createUser);

/**
 * @swagger
 * /api/user/verify-email:
 *   get:
 *     summary: Verify a user's email
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Email verification token
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid token
 *       404:
 *         description: User not found
 */
userRouter.get("/verify-email", verifyEmail);

/**
 * @swagger
 * /api/user/resend-email:
 *   get:
 *     summary: Resend a verification email
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: User email address
 *     responses:
 *       200:
 *         description: Verification email resent successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
userRouter.get("/resend-email", resendEmail);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         headers:
 *           Set-Cookie:
 *             description: JWT token cookie
 *             schema:
 *               type: string
 *               example: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9; Path=/; HttpOnly
 *       400:
 *         description: Invalid credentials
 *       401:
 *         description: Email not verified or User not found
 */
userRouter.post("/login", validateData(userLoginSchema), loginUser);

// Guard all routes after this
userRouter.use(authenticate);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get the logged in user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.get("/", getUser);

/**
 * @swagger
 * /api/user/logout:
 *   get:
 *     summary: Logout the logged in user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.get("/logout", logoutUser);

/**
 * @swagger
 * /api/user:
 *   patch:
 *     summary: Update the logged in user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
userRouter.patch("/", validateData(userUpdateSchema), updateUser);

/**
 * @swagger
 * /api/user:
 *   delete:
 *     summary: Delete the logged in user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.delete("/", deleteUser);

export default userRouter;
