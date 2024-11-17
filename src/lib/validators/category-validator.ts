import { z } from "zod";

export const CATEGORY_NAME_VALIDATOR = z
  .string()
  .min(1, "Category Name is Required.")
  .regex(
    /^[a-zA-Z0-9-]+$/,
    "Category Name can only contain letters, numbers or hyphens"
  );

export const CATEGORY_COLOR_VALIDATOR = z
  .string()
  .min(1, "Color is Required.")
  .regex(/^#[0-9A-Fa-f]{6}$/i, {
    message: "Invalid color format",
  });

export const CATEGORY_EMOJI_VALIDATOR = z
  .string()
  .emoji("Invalid emoji")
  .optional();

export const EVENT_CATEGORY_VALIDATOR = z.object({
  name: CATEGORY_NAME_VALIDATOR,
  color: CATEGORY_COLOR_VALIDATOR,
  emoji: CATEGORY_EMOJI_VALIDATOR,
});

export type EventCategoryForm = z.infer<typeof EVENT_CATEGORY_VALIDATOR>;
