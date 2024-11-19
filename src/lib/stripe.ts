import Stripe from "stripe";



import { env } from "@/env";


export const stripe = new Stripe(env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-10-28.acacia",
  typescript: true,
});

export const createCheckoutSession = async ({
  userEmail,
  userId,
}: {
  userEmail: string;
  userId: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1QMLujIOPH7LokqWZP4hTftu",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/dashboard?success=true",
    cancel_url: "http://localhost:3000/pricing",
    customer_email: userEmail,
    metadata: {
      userId,
    },
  });

  return session;
};