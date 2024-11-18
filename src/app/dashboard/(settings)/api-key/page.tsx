import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";

import DashboardLayout from "@/components/dashboard-layout";
import { db } from "@/db";

import ApiKeySettings from "./api-key-settings";

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
    <DashboardLayout title="API Key">
      <ApiKeySettings apiKey={user.apiKey ?? ""} />
    </DashboardLayout>
  );
};

export default Page;
