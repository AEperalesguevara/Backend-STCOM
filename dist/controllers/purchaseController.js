"use strict";
// controllers/purchaseController.ts
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
exports.getUserPurchases = exports.getAllPurchases = exports.createPurchase = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { totalPrice, userId, cart } = req.body;
        const purchase = yield prisma.purchase.create({
            data: {
                totalPrice,
                isPaid: true,
                userId,
                items: {
                    create: cart.map((item) => ({
                        productId: item.product_id,
                        productName: item.product_name,
                        productPrice: item.product_price,
                        quantity: item.quantity,
                    })),
                },
            },
            include: {
                items: true,
            },
        });
        res.status(201).json(purchase);
    }
    catch (error) {
        console.error("Error al guardar la orden:", error);
        res.status(500).json({ error: "Error al crear la orden" });
    }
});
exports.createPurchase = createPurchase;
// 📚 **Función GET para obtener todas las compras**
const getAllPurchases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchases = yield prisma.purchase.findMany({
            include: {
                items: true, // Incluir productos asociados
            },
            orderBy: {
                date: "desc",
            },
        });
        res.status(200).json({ success: true, data: purchases });
    }
    catch (error) {
        console.error("Error al obtener compras:", error);
        res.status(500).json({ success: false, error: "Error al obtener compras" });
    }
});
exports.getAllPurchases = getAllPurchases;
// 📚 **Función GET para obtener compras específicas por userId**
const getUserPurchases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const purchases = yield prisma.purchase.findMany({
            where: { userId: Number(userId) },
            include: {
                items: true, // Esto incluye los productos en la consulta
            },
        });
        res.status(200).json(purchases);
    }
    catch (error) {
        console.error(`Error al obtener compras para el usuario ${userId}:`, error);
        res.status(500).json({ error: "Error al obtener compras del usuario" });
    }
});
exports.getUserPurchases = getUserPurchases;
