// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import authRoutes from "./routes/authRoute";
import reservationRouter from "../src/routes/reservationRoute";
import productRoutes from "./routes/productRoute";
import path from "path";
const app = express();
const port = 3000;

// Configuración de CORS para permitir solicitudes desde tu frontend
app.use(
  cors({
    origin: "*", // Dirección del frontend
  })
);

// Usar las rutas
app.use("/api", userRouter);
app.use("/api/auth", authRoutes);
app.use("/api/reservation", reservationRouter);
app.use("/api/products", productRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Configuración para servir archivos estáticos desde la carpeta `/uploads`
const uploadPath = path.join(__dirname, "../uploads"); // Sube un nivel para llegar a la raíz
app.use("/uploads", express.static(uploadPath));

// Middleware para parsear JSON
app.use(bodyParser.json());
