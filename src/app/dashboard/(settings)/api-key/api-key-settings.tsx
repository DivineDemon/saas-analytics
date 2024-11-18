"use client";

import { useState } from "react";

import { Check, Clipboard } from "lucide-react";

import Card from "@/components/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ApiKeySettings = ({ apiKey }: { apiKey: string }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-xl">
      <div className="">
        <Label>Your API Key</Label>
        <div className="relative mt-1">
          <Input type="password" value={apiKey} readOnly />
          <div className="absolute inset-y-0 right-0 flex items-center space-x-0.5">
            <Button
              variant="ghost"
              onClick={copyApiKey}
              className="w-10 p-1 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {copySuccess ? (
                <Check className="size-4 text-brand-900" />
              ) : (
                <Clipboard className="size-4 text-brand-900" />
              )}
            </Button>
          </div>
        </div>
        <p className="mt-2 text-sm/6 text-gray-600">
          Keep your API key secret and do not share it with others.
        </p>
      </div>
    </Card>
  );
};

export default ApiKeySettings;
