import express from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

// Ruta para registro
router.post("/register", registerUser);

// Ruta para login
router.post("/login", loginUser);

export default router;
