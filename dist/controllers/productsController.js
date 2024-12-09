"use strict";
// backend/controllers/productController.ts
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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, description, price, category, brand, isOnSale } = req.body;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        if (!image) {
            res
                .status(400)
                .json({ success: false, message: "Se requiere una imagen." });
            return;
        }
        const product = yield prisma.product.create({
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
    }
    catch (error) {
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
        res
            .status(500)
            .json({ success: false, message: "Error al obtener productos", error });
    }
});
exports.getProducts = getProducts;
