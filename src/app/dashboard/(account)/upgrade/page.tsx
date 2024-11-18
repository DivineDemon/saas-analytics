import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";

import DashboardLayout from "@/components/dashboard-layout";
import { db } from "@/db";

import UpgradePageContent from "./upgrade-page-content";

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
    <DashboardLayout title="Pro Membership">
      <UpgradePageContent plan={user.plan} />
    </DashboardLayout>
  );
};

export default Page;
