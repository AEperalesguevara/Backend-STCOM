// src/controllers/userController.ts
import { Request, Response } from "express";
import * as userService from "../services/userService";

// Crear usuario
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    city,
    identityNo,
    phone,
    ruc,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !role ||
    !city ||
    !identityNo ||
    !phone
  ) {
    res.status(400).json({ message: "Faltan campos obligatorios" });
    return;
  }

  try {
    const newUser = await userService.createUser({
      firstName,
      lastName,
      email,
      password,
      role,
      city,
      identityNo,
      phone,
      ruc,
    });
    res.status(201).json(newUser);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    res.status(500).json({ message: errorMessage });
  }
};

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido al crear el usuario";
    res.status(500).json({ message: errorMessage });
  }
};

// Obtener usuario por ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(parseInt(id));
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido al crear el usuario";
    res.status(500).json({ message: errorMessage });
  }
};

// Actualizar usuario
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { firstName, lastName, email, password, role } = req.body;
  try {
    const updatedUser = await userService.updateUser(parseInt(id), {
      firstName,
      lastName,
      email,
      password,
      role,
    });
    if (!updatedUser) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido al crear el usuario";
    res.status(500).json({ message: errorMessage });
  }
};

// Eliminar usuario
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedUser = await userService.deleteUser(parseInt(id));
    if (!deletedUser) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido al crear el usuario";
    res.status(500).json({ message: errorMessage });
  }
};
