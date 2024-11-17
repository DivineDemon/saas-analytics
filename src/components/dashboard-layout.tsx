import { ReactNode } from "react";

import { ArrowLeft } from "lucide-react";

import Heading from "./heading";
import { Button } from "./ui/button";

interface DashboardLayoutProps {
  title: string;
  children?: ReactNode;
  hideBackButton?: boolean;
  cta?: ReactNode;
}

const DashboardLayout = ({
  children,
  title,
  hideBackButton,
  cta,
}: DashboardLayoutProps) => {
  return (
    <section className="flex h-full w-full flex-1 flex-col">
      <div className="flex justify-between border-b border-gray-200 p-6 sm:p-8">
        <div className="flex w-full flex-col items-start gap-y-6 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-x-4 sm:gap-x-8">
            {hideBackButton ? null : (
              <Button className="w-fit bg-white" variant="outline">
                <ArrowLeft className="size-4" />
              </Button>
            )}
            <Heading>{title}</Heading>
          </div>
          {cta ? <div className="w-full sm:w-fit">{cta}</div> : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-8">
        {children}
      </div>
    </section>
  );
};

export default DashboardLayout;
