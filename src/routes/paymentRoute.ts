import express from "express";
import Stripe from "stripe";

const paymentRoute = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia",
});

paymentRoute.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems, totalAmount } = req.body;
    console.log("cartItems recibidos en el backend:", cartItems);
    const lineItems = cartItems.map((item: any) => {
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
          },
          unit_amount: Math.round(item.price * 100), // Convertir precio a centavos
        },
        quantity: item.quantity,
      };
    });

    console.log(
      "Line Items enviados a Stripe:",
      JSON.stringify(lineItems, null, 2)
    );

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
