import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";

import DashboardLayout from "@/components/dashboard-layout";
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
    <DashboardLayout title="Dashboard">
      <DashboardPageContent />
    </DashboardLayout>
  );
};

export default Page;
