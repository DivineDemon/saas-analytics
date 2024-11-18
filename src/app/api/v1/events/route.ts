import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { env } from "@/env";
import { FREE_QUOTA, PRO_QUOTA } from "@/lib/constants";
import { DiscordClient } from "@/lib/discord-client";
import { REQUEST_VALIDATOR } from "@/lib/validators/request-validator";

export const POST = async (request: NextRequest) => {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Invalid Auth Header Format. Expected 'Bearer [API_KEY]'" },
        { status: 401 }
      );
    }

    const apiKey = authHeader.split(" ")[1];

    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json(
        { message: "Invalid API Key!" },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        apiKey,
      },
      include: {
        EventCategory: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid API Key!" },
        { status: 401 }
      );
    }

    if (!user.discordId) {
      return NextResponse.json(
        { message: "Please enter your Discord ID in your account settings!" },
        { status: 403 }
      );
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const quota = await db.quota.findUnique({
      where: {
        userId: user.id,
        month: currentMonth,
        year: currentYear,
      },
    });

    const quotaLimit =
      user.plan === "FREE"
        ? FREE_QUOTA.maxEventsPerMonth
        : PRO_QUOTA.maxEventsPerMonth;

    if (quota && quota.count >= quotaLimit) {
      return NextResponse.json(
        {
          message:
            "Monthly Quota Reached, Please Upgrade your Plan for more events!",
        },
        { status: 429 }
      );
    }

    const discord = new DiscordClient(env.DISCORD_BOT_TOKEN);
    const dmChannel = await discord.createDM(user.discordId);

    let requestData: unknown;

    try {
      requestData = await request.json();
    } catch (error) {
      console.log(error);

      return NextResponse.json(
        {
          message: "Invalid JSON request body!",
        },
        { status: 400 }
      );
    }

    const validationResult = REQUEST_VALIDATOR.parse(requestData);
    const category = user.EventCategory.find(
      (cat) => (cat.name = validationResult.category)
    );

    if (!category) {
      return NextResponse.json(
        {
          message: `You do not have a category named ${validationResult.category}`,
        },
        { status: 404 }
      );
    }

    const eventData = {
      title: `${category.emoji || "🔔"} ${category.name.charAt(0).toUpperCase()}${category.name.slice(1)}`,
      description:
        validationResult.description ||
        `A new ${category.name} event has occured!`,
      color: category.color,
      timestamp: new Date().toISOString(),
      fields: Object.entries(validationResult.fields || {}).map(
        ([key, value]) => {
          return {
            name: key,
            value: String(value),
            inline: true,
          };
        }
      ),
    };

    const event = await db.event.create({
      data: {
        name: category.name,
        formattedMessage: `${eventData.title}\n\n${eventData.description}`,
        userId: user.id,
        fields: validationResult.fields || {},
        eventCategoryId: category.id,
      },
    });

    try {
      await discord.sendEmbed(dmChannel.id, eventData);
      await db.event.update({
        where: { id: event.id },
        data: { deliveryStatus: "DELIVERED" },
      });

      await db.quota.upsert({
        where: {
          userId: user.id,
          month: currentMonth,
          year: currentYear,
        },
        update: {
          count: {
            increment: 1,
          },
        },
        create: {
          userId: user.id,
          month: currentMonth,
          year: currentYear,
          count: 1,
        },
      });
    } catch (error) {
      await db.event.update({
        where: { id: event.id },
        data: { deliveryStatus: "FAILED" },
      });

      console.log(error);

      return NextResponse.json(
        {
          message: "Error processing event",
          eventId: event.id,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Event Processed Successfully!",
      eventId: event.id,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
