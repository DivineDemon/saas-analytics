"use client";

import { useRouter } from "next/navigation";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { Check } from "lucide-react";

import Heading from "@/components/heading";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/client";
import { INCLUDED_FEATURES } from "@/lib/constants";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();

  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: async () => {
      const response = await client.payment.createCheckoutSession.$post();
      return await response.json();
    },
    onSuccess: ({ url }) => {
      if (url) {
        router.push(url);
      }
    },
  });

  const handleGetAccess = () => {
    if (user) {
      createCheckoutSession();
    } else {
      router.push("/sign-in?intent=upgrade");
    }
  };

  return (
    <div className="bg-brand-25 py-24 sm:py-32">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-2xl sm:text-center">
          <Heading className="text-center">Simple, no-tricks pricing</Heading>
          <p className="mx-auto mt-6 max-w-prose text-pretty text-center text-base/7 text-gray-600">
            We hate subscriptions, and chances are, you do too. That&apos;s why
            we offer lifetime access to PingPanda for a one-time payment.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl bg-white ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="font-heading text-3xl font-semibold tracking-tight text-gray-900">
              Lifetime access
            </h3>
            <p className="mt-6 text-base/7 text-gray-600">
              Invest once in PingPanda and transform how you monitor your SaaS
              forever. Get instant alerts, track critical metrics and never miss
              a beat in your business.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-brand-600">
                What&apos;s included
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul className="mt-5 grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6">
              {INCLUDED_FEATURES.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <Check className="h-6 w-5 flex-none text-brand-700" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  Pay once, own forever
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    $49
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    USD
                  </span>
                </p>
                <Button className="mt-6 px-20" onClick={handleGetAccess}>
                  Get PingPanda
                </Button>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Secure payment, start monitoring in minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
