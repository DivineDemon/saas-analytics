import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";

import CreateEventCategoryModal from "@/components/create-event-category-modal";
import DashboardLayout from "@/components/dashboard-layout";
import PaymentSuccessModal from "@/components/payment-success-modal";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { createCheckoutSession } from "@/lib/stripe";

import DashboardPageContent from "./dashboard-page-content";
interface PageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const auth = await currentUser();

  if (!auth) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      externalId: auth.id,
    },
  });

  if (!user) {
    redirect("/sign-in");
  }

  const { intent, success } = await searchParams;
  if (intent === "upgrade") {
    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
    });

    if (session.url) {
      redirect(session.url);
    }
  }

  return (
    <>
      {success ? <PaymentSuccessModal /> : null}
      <DashboardLayout
        cta={
          <CreateEventCategoryModal>
            <Button className="w-full sm:w-fit">
              <Plus className="ml-2 size-4" />
              &nbsp;Add Category
            </Button>
          </CreateEventCategoryModal>
        }
        title="Dashboard"
      >
        <DashboardPageContent />
      </DashboardLayout>
    </>
  );
};

export default Page;