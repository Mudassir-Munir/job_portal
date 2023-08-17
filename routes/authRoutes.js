import express from "express";
import { loginController, registerController } from "../handlers/auth.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
 windowMs: 15 * 60 * 1000, // 15 minutes
 max: 50, // limit each Ip to 50 requests per window(here per 15 minutes)
 standardHeaders: true,
 legacyHeaders: false,
});

// router object
const router = express.Router();

/**
* @swagger
* components:
*  schemas:
*   User:
*    type: object
*    required:
*      - name
*      - lastName
*      - email
*      - password
*    properties:
*      id:
*        type: string
*      name:
*        type: string
*      lastName:
*        type: string
*      email:
*        type: string
*      password:
*         type: string
*      location:
*         type: string
*    example:
*      id: gherfecmnk4hy
*      name: ali
*      lastName: ahmed
*      email: ali34@yopmail.com
*      password: 123456
*      location: islamabad
*   LoginRequest:
*    type: object
*    required:
*     - email
*     - password
*    properties:
*      email:
*        type: string
*      password:
*        type: string
*/

/**
 * @swagger
 * tags:
 *   name: Register
 *   description: user registration apis
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *    summary: register new user
 *    tags: [Register]
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: user created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: internal server error
 */

// routes
// register
router.post("/register", limiter, registerController);

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: login
 *    tags: [Register]
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/LoginRequest'
 *    responses:
 *      200:
 *        description: logged in successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: internal server error
 */

// login
router.post("/login", limiter, loginController);

export default router;