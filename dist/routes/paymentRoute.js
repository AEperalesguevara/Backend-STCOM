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
        const lineItems = cartItems.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.product_name,
                },
                unit_amount: Math.round(item.product_price * 100), // Convertir a centavos
            },
            quantity: item.quantity,
        }));
        console.log("Line Items enviados a Stripe:", JSON.stringify(lineItems, null, 2));
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `http://localhost:5173/cart?success=true`,
            cancel_url: `http://localhost:5173/cart?success=false`,
        });
        res.status(200).json({ url: session.url });
    }
    catch (error) {
        console.error("Error al crear sesión de Stripe Checkout:", error);
        res.status(500).json({ error: "Error al crear sesión" });
    }
}));
exports.default = paymentRoute;
