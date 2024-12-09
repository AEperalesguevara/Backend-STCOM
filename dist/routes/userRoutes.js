"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
// Rutas para usuarios
userRouter.post("/users", userController_1.createUser); // Crear usuario
userRouter.get("/users", userController_1.getUsers); // Obtener todos los usuarios
userRouter.get("/users/:id", userController_1.getUserById); // Obtener usuario por ID
userRouter.put("/users/:id", userController_1.updateUser); // Actualizar usuario
userRouter.delete("/users/:id", userController_1.deleteUser); // Eliminar usuario
exports.default = userRouter;
