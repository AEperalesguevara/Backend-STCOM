// controllers/purchaseController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { totalPrice, userId, cart } = req.body;

    const purchase = await prisma.purchase.create({
      data: {
        totalPrice,
        isPaid: true,
        userId,
        items: {
          create: cart.map((item: any) => ({
            productId: item.product_id,
            productName: item.product_name,
            productPrice: item.product_price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true, // Incluir los productos asociados
      },
    });

    res.status(201).json(purchase);
  } catch (error) {
    console.error("Error al guardar la orden:", error);
    res.status(500).json({ error: "Error al crear la orden" });
  }
};

// 📚 **Función GET para obtener todas las compras**
export const getAllPurchases = async (req: Request, res: Response) => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        items: true, // Incluir productos asociados
      },
      orderBy: {
        date: "desc",
      },
    });

    res.status(200).json({ success: true, data: purchases });
  } catch (error) {
    console.error("Error al obtener compras:", error);
    res.status(500).json({ success: false, error: "Error al obtener compras" });
  }
};

// 📚 **Función GET para obtener compras específicas por userId**
export const getUserPurchases = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const purchases = await prisma.purchase.findMany({
      where: { userId: Number(userId) },
      include: {
        items: true, // Esto incluye los productos en la consulta
      },
    });
    res.status(200).json(purchases);
  } catch (error) {
    console.error(`Error al obtener compras para el usuario ${userId}:`, error);
    res.status(500).json({ error: "Error al obtener compras del usuario" });
  }
};
