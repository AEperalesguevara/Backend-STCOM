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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const paymentRoute = express_1.default.Router();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2024-11-20.acacia",
});
paymentRoute.post("/create-checkout-session", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartItems, totalAmount } = req.body;
        console.log("cartItems recibidos en el backend:", cartItems);
        const lineItems = cartItems.map((item) => {
            // Verifica que item.price y item.name sean valores válidos
            console.log("Procesando ítem:", item);
            // Verificar valores antes de la validación
            console.log("item.name:", item.name);
            console.log("item.price:", item.price);
            console.log("item.quantity:", item.quantity);
            if (typeof item.price !== "number" || typeof item.name !== "string") {
                throw new Error(`Datos inválidos en el ítem con ID ${item.id}`);
            }
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name, // Asignación correcta del nombre del producto
                        quantity: item.quantity,
                    },
                    unit_amount: Math.round(item.price * 100), // Convertir precio a centavos
                },
            };
        });
        console.log("Line Items enviados a Stripe:", JSON.stringify(lineItems, null, 2));
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `https://stcom.vercel.app/cart?success=true`,
            cancel_url: `https://stcom.vercel.app/cart?success=false`,
        });
        res.status(200).json({ url: session.url });
    }
    catch (error) {
        console.error("Error al crear sesión de Stripe Checkout:", error);
        res.status(500).json({ error: "Error al crear sesión" });
    }
}));
exports.default = paymentRoute;
