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
exports.createPaymentIntent = void 0;
const stripe_1 = __importDefault(require("stripe"));
// Inicializa Stripe con tu clave secreta
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2024-11-20.acacia",
});
const createPaymentIntent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { totalAmount } = req.body;
    if (!totalAmount || typeof totalAmount !== "number") {
        res
            .status(400)
            .json({ error: "El monto total es requerido y debe ser un número." });
        return;
    }
    try {
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // Convertir a centavos
            currency: "usd",
            payment_method_types: ["card"],
        });
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    }
    catch (error) {
        console.error("Error al crear PaymentIntent:", error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.createPaymentIntent = createPaymentIntent;
