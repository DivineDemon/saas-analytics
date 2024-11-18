import { createCheckoutSession } from "@/lib/stripe";

import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";

export const paymentRouter = router({
  createCheckoutSession: privateProcedure.mutation(async ({ c, ctx }) => {
    const session = await createCheckoutSession({
      userEmail: ctx.user.email,
      userId: ctx.user.id,
    });

    return c.json({
      url: session.url,
    });
  }),
});
