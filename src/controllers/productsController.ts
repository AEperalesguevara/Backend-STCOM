// backend/controllers/productController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addProduct = async (req: any, res: Response): Promise<void> => {
  try {
    const { name, description, price, category, brand, isOnSale } = req.body;
    const image = req.file?.path;

    if (!image) {
      res
        .status(400)
        .json({ success: false, message: "Se requiere una imagen." });
      return;
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        brand,
        isOnSale: Boolean(isOnSale),
        image,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Producto agregado", product });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al agregar producto", error });
  }
};

// Obtener productos
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al obtener productos", error });
  }
};
