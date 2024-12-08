// routes/purchaseRoute.ts

import express from "express";
import {
  createPurchase,
  getAllPurchases,
  getUserPurchases,
} from "../controllers/purchaseController";

const purchaseRoute = express.Router();

purchaseRoute.post("/create-purchase", createPurchase);
// 🔍 Endpoint para obtener todas las compras
purchaseRoute.get("/all-purchases", getAllPurchases);

// 🔍 Endpoint para obtener compras específicas de un usuario
purchaseRoute.get("/user-purchases/:userId", getUserPurchases);

export default purchaseRoute;
