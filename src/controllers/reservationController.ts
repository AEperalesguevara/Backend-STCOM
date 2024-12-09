import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { sendConfirmationEmail } from "../services/mailer";

const prisma = new PrismaClient();

export const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, phone, date, time, desc } = req.body;

  try {
    // Validaciones básicas
    if (!name || !email || !phone || !date || !time || !desc) {
      res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios.",
      });
      return;
    }

    // Crear la reserva en la base de datos
    const reservation = await prisma.service.create({
      data: {
        name,
        email,
        phone,
        date: new Date(date),
        time,
        desc,
      },
    });
    await sendConfirmationEmail({ email, name, date, time, desc });
    // Respuesta exitosa
    res.status(201).json({
      success: true,
      message: "Reserva creada con éxito.",
      reservation,
    });
  } catch (error) {
    console.error("Error al crear la reserva o enviar el correo:", error);
    next(error);
  }
};

// Obtener todas las reservas
export const getReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reservations = await prisma.service.findMany();
    res.status(200).json({ success: true, reservations });
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    next(error);
  }
};
