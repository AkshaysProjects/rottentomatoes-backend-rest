import { z } from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 255
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 8
 *       required:
 *         - name
 *         - email
 *         - password
 */
export const userRegistrationSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 8
 *       required:
 *         - email
 *         - password
 */
export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 255
 *           nullable: true
 *         email:
 *           type: string
 *           format: email
 *           nullable: true
 *         image:
 *           type: string
 *           format: url
 *           nullable: true
 */
export const userUpdateSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  email: z.string().email().optional(),
  image: z.string().url().optional(),
});
