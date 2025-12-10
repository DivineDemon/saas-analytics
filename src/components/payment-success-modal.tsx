"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";

import { client } from "@/lib/client";

import LoadingSpinner from "./loading-spinner";
import { Button } from "./ui/button";
import { Modal } from "./ui/modal";

const PaymentSuccessModal = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { data: userPlan, isPending } = useQuery({
    queryKey: ["user-plan"],
    queryFn: async () => {
      const response = await client.payment.getUserPlan.$get({});
      return await response.json();
    },
    refetchInterval: (query) => {
      return query.state.data?.plan === "PRO" ? false : 1000;
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    router.push("/dashboard");
  };

  const isPaymentSuccessful = userPlan?.plan === "PRO";

  return (
    <Modal
      showModal={isOpen}
      setShowModal={setIsOpen}
      onClose={handleClose}
      className="p-6"
      preventDefaultClose={!isPaymentSuccessful}
    >
      <div className="flex flex-col items-center">
        {isPending || !isPaymentSuccessful ? (
          <div className="flex h-64 flex-col items-center justify-center">
            <div className="mb-4">
              <LoadingSpinner />
            </div>
            <p className="text-lg/7 font-medium text-gray-900">
              Upgrading your account...
            </p>
            <p className="mt-2 text-pretty text-center text-sm/6 text-gray-600">
              Please wait while we process your upgrade, this may take a moment.
            </p>
          </div>
        ) : (
          <>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src="/brand-asset-heart.png"
                alt="success-payment"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-6 flex flex-col items-center gap-1 text-center">
              <p className="text-pretty text-lg/7 font-medium tracking-tight">
                Upgrade Successful! 🎉
              </p>
              <p className="text-pretty text-sm/6 text-gray-600">
                Thankyou for upgrading to Pro, and supporting PingPanda. Your
                account has been upgraded.
              </p>
            </div>
            <div className="mt-8 w-full">
              <Button onClick={handleClose} className="h-12 w-full">
                <Check className="mr-2 size-5" />
                Go to Dashboard
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default PaymentSuccessModal;
