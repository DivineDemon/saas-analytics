import { headers } from "next/headers";

import Stripe from "stripe";

import { db } from "@/db";
import { env } from "@/env";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  const event = stripe.webhooks.constructEvent(
    body,
    signature ?? "",
    env.STRIPE_WEBHOOK_SECRET ?? ""
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { userId } = session.metadata || { userId: null };

    if (!userId) {
      return new Response("Invalid Metadata", { status: 400 });
    }

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        plan: "PRO",
      },
    });
  }

  return new Response("Plan Upgraded Successfully", { status: 200 });
}
