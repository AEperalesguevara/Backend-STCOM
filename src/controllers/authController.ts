import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prismaClient"; // Ajusta según tu configuración de Prisma

const SECRET_KEY = "random#secret"; // Usa una variable de entorno en producción

// Registro

export const registerUser = async (
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
    res
      .status(400)
      .json({ success: false, message: "Faltan campos obligatorios." });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        city,
        identityNo,
        phone,
        ruc,
      },
    });

    res.status(201).json({
      success: true,
      message: "Usuario registrado con éxito.",
      user: newUser,
    });
  } catch (error: any) {
    // Type assertion para tratar el error como `any`
    console.error("Error al registrar el usuario:", error);

    if (error.code === "P2002") {
      const targetField = error.meta?.target?.[0];
      res.status(400).json({
        success: false,
        message: `${targetField} ya está registrado.`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor.",
      });
    }
  }
};

// Login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, message: "Datos incompletos." });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res
        .status(401)
        .json({ success: false, message: "Contraseña incorrecta." });
      return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // Envía el token y el objeto completo del usuario en la respuesta
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        city: user.city,
        identityNo: user.identityNo,
        phone: user.phone,
        ruc: user.ruc,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor." });
  }
};
