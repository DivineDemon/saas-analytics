"use client";

import { PropsWithChildren, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { client } from "@/lib/client";
import { COLOR_OPTIONS, EMOJI_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  EVENT_CATEGORY_VALIDATOR,
  type EventCategoryForm,
} from "@/lib/validators/category-validator";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Modal } from "./ui/modal";

/* ↓ The only shitty thing about tailwind ↓ */

// bg-[#FF6B6B] ring-[#FF6B6B] Bright Red
// bg-[#4ECDC4] ring-[#4ECDC4] Teal
// bg-[#45B7D1] ring-[#45B7D1] Sky Blue
// bg-[#FFA07A] ring-[#FFA07A] Light Salmon
// bg-[#98D8C8] ring-[#98D8C8] Seafoam Green
// bg-[#FDCB6E] ring-[#FDCB6E] Mustard Yellow
// bg-[#6C5CE7] ring-[#6C5CE7] Soft Purple
// bg-[#FF85A2] ring-[#FF85A2] Pink
// bg-[#2ECC71] ring-[#2ECC71] Emerald Green
// bg-[#E17055] ring-[#E17055] Terracotta

/* ↑ The only shitty thing about tailwind ↑ */

const CreateEventCategoryModal = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate: createCategory, isPending: isCreatingCategory } = useMutation(
    {
      mutationFn: async (data: EventCategoryForm) => {
        await client.category.createCategory.$post(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-event-categories"] });
        setIsOpen(false);
      },
    }
  );

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EventCategoryForm>({
    resolver: zodResolver(EVENT_CATEGORY_VALIDATOR),
  });

  const color = watch("color");
  const selectedEmoji = watch("emoji");

  const onSubmit = (data: EventCategoryForm) => {
    createCategory(data);
  };

  return (
    <>
      <div className="" onClick={() => setIsOpen(true)}>
        {children}
      </div>
      <Modal
        className="max-w-xl p-8"
        showModal={isOpen}
        setShowModal={setIsOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="">
            <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
              New Event Category
            </h2>
            <p className="text-sm/6 text-gray-600">
              Create a new category to organize your events.
            </p>
          </div>
          <div className="space-y-5">
            <div className="">
              <Label htmlFor="name">Name</Label>
              <Input
                autoFocus
                id="name"
                {...register("name")}
                placeholder="e.g. user-signup"
                className="w-full"
              />
              {errors.name ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              ) : null}
            </div>
            <div className="">
              <Label>Color</Label>
              <div className="mt-1.5 flex flex-wrap gap-3">
                {COLOR_OPTIONS.map((preMadeColor) => (
                  <button
                    key={preMadeColor}
                    type="button"
                    className={cn(
                      `bg-[${preMadeColor}]`,
                      "size-10 rounded-full ring-2 ring-offset-2 transition-all",
                      color === preMadeColor
                        ? `scale-110 ring-[${preMadeColor}]`
                        : "ring-transparent hover:scale-105"
                    )}
                    onClick={() => setValue("color", preMadeColor)}
                  />
                ))}
              </div>
              {errors.color ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.color.message}
                </p>
              ) : null}
            </div>
            <div className="">
              <Label>Color</Label>
              <div className="mt-1.5 flex flex-wrap gap-3">
                {EMOJI_OPTIONS.map(({ emoji, label }) => (
                  <button
                    key={emoji}
                    type="button"
                    className={cn(
                      "flex size-10 items-center justify-center rounded-md text-xl transition-all",
                      selectedEmoji === emoji
                        ? "scale-110 bg-brand-100 ring-2 ring-brand-700"
                        : "bg-brand-100 hover:bg-brand-200"
                    )}
                    onClick={() => setValue("emoji", emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              {errors.emoji ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.emoji.message}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-end space-x-3 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isCreatingCategory}>
              {isCreatingCategory ? "Creating..." : "Create Category"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateEventCategoryModal;
