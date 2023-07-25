import express from "express";
import { registerController } from "../handlers/auth.js";

// router object
const router = express.Router();

// routes
router.post("/register", registerController);

export default router;