import { startOfMonth } from "date-fns";
import { z } from "zod";

import { db } from "@/db";
import { parseColor } from "@/lib/utils";
import {
  CATEGORY_COLOR_VALIDATOR,
  CATEGORY_EMOJI_VALIDATOR,
  CATEGORY_NAME_VALIDATOR,
} from "@/lib/validators/category-validator";

import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";

export const categoryRouter = router({
  getEventCategories: privateProcedure.query(async ({ c, ctx }) => {
    const categories = await db.eventCategory.findMany({
      where: {
        userId: ctx.user.id,
      },
      select: {
        id: true,
        name: true,
        color: true,
        emoji: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const now = new Date();
        const firstDayOfMonth = startOfMonth(now);

        const [uniqueFieldCount, eventsCount, lastPing] = await Promise.all([
          db.event
            .findMany({
              where: {
                eventCategory: {
                  id: category.id,
                },
                createdAt: { gte: firstDayOfMonth },
              },
              select: {
                fields: true,
              },
              distinct: ["fields"],
            })
            .then((events) => {
              const fieldNames = new Set<string>();

              events.forEach((event) => {
                Object.keys(event.fields as object).forEach((fieldName) => {
                  fieldNames.add(fieldName);
                });
              });

              return fieldNames.size;
            }),
          db.event.count({
            where: {
              eventCategory: {
                id: category.id,
              },
              createdAt: { gte: firstDayOfMonth },
            },
          }),
          db.event.findFirst({
            where: {
              eventCategory: {
                id: category.id,
              },
            },
            select: {
              createdAt: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          }),
        ]);

        return {
          ...category,
          uniqueFieldCount,
          eventsCount,
          lastPing: lastPing?.createdAt || null,
        };
      })
    );

    return c.superjson({
      categories: categoriesWithCounts,
    });
  }),
  deleteCategory: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ c, input, ctx }) => {
      const { name } = input;

      try {
        const deleted = await db.eventCategory.delete({
          where: {
            name_userId: {
              name,
              userId: ctx.user.id,
            },
          },
        });

        if (!deleted) {
          return c.json({
            success: false,
          });
        }

        return c.json({
          success: true,
        });
      } catch (error) {
        return c.json({
          success: false,
          error,
        });
      }
    }),
  createCategory: privateProcedure
    .input(
      z.object({
        name: CATEGORY_NAME_VALIDATOR,
        color: CATEGORY_COLOR_VALIDATOR,
        emoji: CATEGORY_EMOJI_VALIDATOR,
      })
    )
    .mutation(async ({ c, ctx, input }) => {
      const { color, name, emoji } = input;

      try {
        const eventCategory = await db.eventCategory.create({
          data: {
            name: name.toLowerCase(),
            color: parseColor(color),
            emoji,
            userId: ctx.user.id,
          },
        });

        if (!eventCategory) {
          return c.json({
            success: false,
          });
        }

        return c.json({
          success: true,
        });
      } catch (error) {
        return c.json({
          success: false,
          error,
        });
      }
    }),
});
