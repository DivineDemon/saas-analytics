"use client";

import { useRouter } from "next/navigation";

import { type Plan } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { BarChart } from "lucide-react";

import Card from "@/components/card";
import { client } from "@/lib/client";

const UpgradePageContent = ({ plan }: { plan: Plan }) => {
  const router = useRouter();

  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: async () => {
      const response = await client.payment.createCheckoutSession.$post({});
      return await response.json();
    },
    onSuccess: ({ url }) => {
      if (url) {
        router.push(url);
      }
    },
  });

  const { data: usageData } = useQuery({
    queryKey: ["usage"],
    queryFn: async () => {
      const response = await client.project.getUsage.$get({});
      return await response.json();
    },
  });

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div className="">
        <h1 className="mt-2 text-xl/8 font-medium tracking-tight text-gray-900">
          {plan === "PRO" ? "Plan: Pro" : "Plan: Free"}
        </h1>
        <p className="max-w-prose text-sm/6 text-gray-600">
          {plan === "PRO"
            ? "Thankyou for supporting PingPanda. Find your increased limits below."
            : "Get access to more events, categories and premium support."}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="border-2 border-brand-700">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm/6 font-medium">Total events</p>
            <BarChart className="size-4 text-muted-foreground" />
          </div>
          <div className="">
            <p className="text-2xl font-bold">
              {usageData?.eventsUsed || 0} of&nbsp;
              {usageData?.eventsLimit.toLocaleString() || 100}
            </p>
            <p className="text-xs/5 text-muted-foreground">
              Events this period
            </p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm/6 font-medium">Event categories</p>
            <BarChart className="size-4 text-muted-foreground" />
          </div>
          <div className="">
            <p className="text-2xl font-bold">
              {usageData?.categoriesUsed || 0} of&nbsp;
              {usageData?.categoriesLimit.toLocaleString() || 100}
            </p>
            <p className="text-xs/5 text-muted-foreground">Active categories</p>
          </div>
        </Card>
      </div>
      <p className="text-sm text-gray-500">
        Usage will reset on&nbsp;
        {usageData?.resetDate ? (
          formatDate(usageData.resetDate, "MMM d yyyy")
        ) : (
          <span className="h-4 w-8 animate-pulse bg-gray-200" />
        )}
        &nbsp;
        {plan !== "PRO" ? (
          <span
            onClick={() => createCheckoutSession()}
            className="inline cursor-pointer text-brand-600 underline"
          >
            or upgrade now to increase your limit &rarr;
          </span>
        ) : null}
      </p>
    </div>
  );
};

export default UpgradePageContent;
