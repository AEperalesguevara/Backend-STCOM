"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/routes/productRoute.ts
const express_1 = __importDefault(require("express"));
const productsController_1 = require("../controllers/productsController");
const multer_1 = __importDefault(require("multer"));
const productRoutes = express_1.default.Router();
// Configuración para subir imágenes
const storage = multer_1.default.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
// Endpoint para agregar producto (POST)
productRoutes.post("/add", upload.array("image", 4), productsController_1.addProduct);
// Endpoint para obtener todos los productos (GET)
productRoutes.get("/", productsController_1.getProducts);
exports.default = productRoutes;
