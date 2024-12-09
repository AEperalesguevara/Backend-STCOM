import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import userRouter from "./routes/userRoutes";
import authRoutes from "./routes/authRoute";
import reservationRouter from "../src/routes/reservationRoute";
import productRoutes from "./routes/productRoute";
import paymentRoute from "./routes/paymentRoute";
import purchaseRoute from "./routes/purchaseRoute";
const app = express();
const port = 3000;

// Configuración de CORS para permitir solicitudes desde tu frontend
app.use(
  cors({
    origin: "https://stcom.vercel.app", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());
app.use(bodyParser.json());

// Usa tus rutas de la aplicación
app.use("/api", userRouter);
app.use("/api/auth", authRoutes);
app.use("/api/reservation", reservationRouter);
app.use("/api/products", productRoutes);
app.use("/payment", paymentRoute);
app.use("/api/purchase", purchaseRoute);

// Configuración para servir archivos estáticos desde la carpeta `/uploads`
const uploadPath = path.join(__dirname, "../uploads");
app.use("/uploads", express.static(uploadPath));

app.listen(port, () =>
  console.log(`Servidor backend activo en http://localhost:${port}`)
);
