// src/services/userService.ts
import prisma from "../prisma/prismaClient"; // Asumiendo que tienes tu cliente Prisma configurado

// Crear usuario
export const createUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  city: string;
  identityNo: string;
  phone: string;
  ruc?: string;
}) => {
  return prisma.user.create({
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      city: userData.city,
      identityNo: userData.identityNo,
      phone: userData.phone,
      ruc: userData.ruc, // Este es opcional
    },
  });
};

// Obtener todos los usuarios
export const getUsers = async () => {
  return await prisma.user.findMany();
};

// Obtener un usuario por ID
export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

// Actualizar usuario
export const updateUser = async (
  id: number,
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }
) => {
  return await prisma.user.update({
    where: { id },
    data: userData,
  });
};

// Eliminar usuario
export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};
