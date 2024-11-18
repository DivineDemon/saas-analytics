"use client";

import Link from "next/link";
import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import Card from "@/components/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { client } from "@/lib/client";

const AccountSettings = ({
  discordId: initialDiscordId,
}: {
  discordId: string;
}) => {
  const [discordId, setDiscordId] = useState(initialDiscordId);
  const { mutate: addDiscordId, isPending } = useMutation({
    mutationFn: async (discordId: string) => {
      const response = await client.project.setDiscordId.$post({ discordId });
      return await response.json();
    },
  });

  return (
    <Card className="w-full max-w-xl space-y-4">
      <div className="">
        <Label>Discord ID</Label>
        <Input
          className="mt-1"
          value={discordId}
          onChange={(e) => setDiscordId(e.target.value)}
          placeholder="Enter your Discord ID"
        />
      </div>
      <p className="mt-2 text-sm/6 text-gray-600">
        Don't know how to find your Discord ID ?&nbsp;
        <Link
          href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID"
          className="text-brand-600 hover:text-brand-500"
        >
          Learn how to obtain it here
        </Link>
        .
      </p>
      <div className="pt-4">
        <Button disabled={isPending} onClick={() => addDiscordId(discordId)}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  );
};

export default AccountSettings;
