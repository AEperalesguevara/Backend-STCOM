"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.addProduct = void 0;
// backend/controllers/productController.ts
const cloudinary_1 = require("cloudinary");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Controlador para agregar un producto con imágenes
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const uploadedImages = yield Promise.all(req.files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield cloudinary_1.v2.uploader.upload(file.path, {
                resource_type: "image",
            });
            return result.secure_url;
        })));
        // Crear el producto en la base de datos
        const product = yield prisma.product.create({
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
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ success: false, message: "Error al agregar producto", error });
    }
});
exports.addProduct = addProduct;
// Obtener productos
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.product.findMany();
        res.status(200).json({ success: true, products });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ success: false, message: "Error al obtener productos", error });
    }
});
exports.getProducts = getProducts;
