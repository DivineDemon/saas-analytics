import { notFound } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";

import DashboardLayout from "@/components/dashboard-layout";
import { db } from "@/db";

import CategoryPageContent from "./category-page-content";

interface PageProps {
  params: {
    name: string | string[] | undefined;
  };
}

const Page = async ({ params }: PageProps) => {
  const auth = await currentUser();

  if (typeof params.name !== "string") {
    return notFound();
  }

  if (!auth) {
    return notFound();
  }

  const user = await db.user.findUnique({
    where: {
      externalId: auth.id,
    },
  });

  if (!user) {
    return notFound();
  }

  const category = await db.eventCategory.findUnique({
    where: {
      name_userId: {
        name: params.name,
        userId: user.id,
      },
    },
    include: {
      _count: {
        select: {
          events: true,
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }

  const hasEvents = category._count.events > 0;

  return (
    <DashboardLayout title={`${category.emoji} ${category.name} Events`}>
      <CategoryPageContent hasEvents={hasEvents} category={category} />
    </DashboardLayout>
  );
};

export default Page;
