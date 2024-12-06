// src/routes/userRoutes.ts
import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const userRouter = Router();

// Rutas para usuarios
userRouter.post("/users", createUser); // Crear usuario
userRouter.get("/users", getUsers); // Obtener todos los usuarios
userRouter.get("/users/:id", getUserById); // Obtener usuario por ID
userRouter.put("/users/:id", updateUser); // Actualizar usuario
userRouter.delete("/users/:id", deleteUser); // Eliminar usuario

export default userRouter;
