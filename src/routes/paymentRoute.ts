import express from "express";
import Stripe from "stripe";

const paymentRoute = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia",
});

paymentRoute.post("/create-checkout-session", async (req, res) => {
  console.log("Datos recibidos en la API:", req.body);
  try {
    const { cartItems, totalAmount } = req.body;

    const lineItems = cartItems.map((item: any) => {
      const price = Number(item.price); // Convertir item.price a un número
      const quantity = Number(item.quantity); // Convertir item.quantity a un número

      if (isNaN(price) || isNaN(quantity)) {
        console.error(
          `Error en el item ${item.name}: precio o cantidad no válidos`
        );
        throw new Error("Precio o cantidad no válidos");
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(price * 100), // Convertir a centavos
        },
        quantity: quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `https://stcom.vercel.app/cart?success=true`,
      cancel_url: `https://stcom.vercel.app/cart?success=false`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error al crear sesión de Stripe Checkout:", error);
    res.status(500).json({ error: "Error al crear sesión" });
  }
});

export default paymentRoute;
