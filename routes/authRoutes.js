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

// routes
// register
router.post("/register", limiter, registerController);
// login
router.post("/login", limiter, loginController);

export default router;