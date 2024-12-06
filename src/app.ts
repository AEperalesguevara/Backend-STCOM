// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import authRoutes from "./routes/authRoute";
import reservationRouter from "../src/routes/reservationRoute";
const app = express();
const port = 3000;

// Configuración de CORS para permitir solicitudes desde tu frontend
app.use(
  cors({
    origin: "*", // Dirección del frontend
  })
);

// Middleware para parsear JSON
app.use(bodyParser.json());

// Usar las rutas
app.use("/api", userRouter);
app.use("/api/auth", authRoutes);
app.use("/api/reservation", reservationRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
