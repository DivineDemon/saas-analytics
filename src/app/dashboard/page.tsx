import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";

import CreateEventCategoryModal from "@/components/create-event-category-modal";
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { db } from "@/db";

import DashboardPageContent from "./dashboard-page-content";

const Page = async () => {
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

  return (
    <DashboardLayout
      cta={
        <CreateEventCategoryModal>
          <Button>
            Add Category <Plus className="ml-2 size-4" />
          </Button>
        </CreateEventCategoryModal>
      }
      title="Dashboard"
    >
      <DashboardPageContent />
    </DashboardLayout>
  );
};

export default Page;
