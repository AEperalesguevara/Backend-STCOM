// backend/routes/productRoute.ts
import express from "express";
import { addProduct, getProducts } from "../controllers/productsController";
import multer from "multer";
import path from "path";

const productRoutes = express.Router();

// Configuración para subir imágenes
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Endpoint para agregar producto (POST)
productRoutes.post("/add", upload.array("image", 4), addProduct);

// Endpoint para obtener todos los productos (GET)
productRoutes.get("/", getProducts);

export default productRoutes;
