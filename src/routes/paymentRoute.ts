import express from "express";
import Stripe from "stripe";

const paymentRoute = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia",
});

paymentRoute.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems, totalAmount } = req.body;

    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product_name,
        },
        unit_amount: Math.round(item.product_price * 100), // Convertir a centavos
      },
      quantity: item.quantity,
    }));
    console.log(
      "Line Items enviados a Stripe:",
      JSON.stringify(lineItems, null, 2)
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:5173/cart?success=true`,
      cancel_url: `http://localhost:5173/cart?success=false`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error al crear sesión de Stripe Checkout:", error);
    res.status(500).json({ error: "Error al crear sesión" });
  }
});

export default paymentRoute;
