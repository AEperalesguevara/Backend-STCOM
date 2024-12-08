import { Request, Response } from "express";
import Stripe from "stripe";

// Inicializa Stripe con tu clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia",
});

export const createPaymentIntent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { totalAmount } = req.body;

  if (!totalAmount || typeof totalAmount !== "number") {
    res
      .status(400)
      .json({ error: "El monto total es requerido y debe ser un número." });
    return;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convertir a centavos
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error al crear PaymentIntent:", (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};
