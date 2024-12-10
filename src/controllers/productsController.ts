// backend/controllers/productController.ts
import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Controlador para agregar un producto con imágenes
export const addProduct = async (req: any, res: Response): Promise<void> => {
  try {
    const { name, description, price, category, brand, isOnSale } = req.body;

    // Validación de imágenes
    if (!req.files || req.files.length === 0) {
      res
        .status(400)
        .json({ success: false, message: "Se requiere al menos una imagen." });
      return;
    }

    // Subir imágenes a Cloudinary
    const uploadedImages = await Promise.all(
      req.files.map(async (file: Express.Multer.File) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Crear el producto en la base de datos
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        brand,
        isOnSale: Boolean(isOnSale),
        image: uploadedImages, // Arreglo de URLs
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Producto agregado", product });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error al agregar producto", error });
  }
};

// Obtener productos
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error al obtener productos", error });
  }
};
