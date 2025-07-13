import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "your_stripe_secret_key_here",
  {
    apiVersion: "2025-06-30.basil",
  }
);

//app config
const app = express();

// Automatically allow cross-origin requests (middleware)
app.use(cors({ origin: true }));
app.use(express.json());

// Example endpoint (you can add your own endpoints here)

//http://localhost:5001/clone-6e65f/us-central1/api/
app.get("/", (req, res) => {
  res.status(200).send("Hello from Firebase Functions!");
});

app.post("/payments/create", async (req, res) => {
  try {
    const total = req.body.total;
    console.log("Payment Request Received for this amount >>>", total);

    if (!total || total <= 0) {
      res.status(400).send({
        error: "Invalid amount. Total must be greater than 0.",
      });
      return;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log("Payment intent created successfully:", paymentIntent.id);

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({
      error: "Failed to create payment intent",
    });
  }
});

// Here you would add your payment processing logic using Stripe or another payment processor

// Export the Express app as a Firebase Cloud Function
export const api = functions.https.onRequest(app);

// ✔  functions[api]: http function initialized (http://localhost:5001/clone-6e65f/us-central1/api).
