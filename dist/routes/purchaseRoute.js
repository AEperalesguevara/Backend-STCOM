"use strict";
// routes/purchaseRoute.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchaseController_1 = require("../controllers/purchaseController");
const purchaseRoute = express_1.default.Router();
purchaseRoute.post("/create-purchase", purchaseController_1.createPurchase);
// 🔍 Endpoint para obtener todas las compras
purchaseRoute.get("/all-purchases", purchaseController_1.getAllPurchases);
// 🔍 Endpoint para obtener compras específicas de un usuario
purchaseRoute.get("/user-purchases/:userId", purchaseController_1.getUserPurchases);
exports.default = purchaseRoute;
