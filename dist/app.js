"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const reservationRoute_1 = __importDefault(
  require("./routes/reservationRoute")
);
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const paymentRoute_1 = __importDefault(require("./routes/paymentRoute"));
const purchaseRoute_1 = __importDefault(require("./routes/purchaseRoute"));
const app = (0, express_1.default)();
const port = 3000;
// Configuración de CORS para permitir solicitudes desde tu frontend
app.use(
  (0, cors_1.default)({
    origin: "*",
  })
);
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
// Usa tus rutas de la aplicación
app.use("/api", userRoutes_1.default);
app.use("/api/auth", authRoute_1.default);
app.use("/api/reservation", reservationRoute_1.default);
app.use("/api/products", productRoute_1.default);
app.use("/payment", paymentRoute_1.default);
app.use("/api/purchase", purchaseRoute_1.default);
// Configuración para servir archivos estáticos desde la carpeta `/uploads`
const uploadPath = path_1.default.join(__dirname, "../uploads");
app.use("/uploads", express_1.default.static(uploadPath));
app.listen(port, () =>
  console.log(`Servidor backend activo en http://localhost:${port}`)
);
