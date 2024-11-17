import Link from "next/link";

import { UserButton } from "@clerk/nextjs";

import { SIDEBAR_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { buttonVariants } from "./ui/button";

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  return (
    <div className="relative z-20 flex h-full flex-col space-y-4 md:space-y-6">
      <p className="hidden text-lg/7 font-semibold text-brand-900 sm:block">
        Ping<span className="text-brand-700">Panda</span>
      </p>

      <div className="flex-grow">
        <ul>
          {SIDEBAR_ITEMS.map(({ category, items }) => (
            <li key={category} className="mb-4 md:mb-8">
              <p className="text-xs font-medium leading-6 text-zinc-500">
                {category}
              </p>
              <div className="-mx-2 flex flex-1 flex-col">
                {items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "group flex w-full items-center justify-start gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium leading-6 text-zinc-700 transition hover:bg-gray-50"
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="size-4 text-zinc-500 group-hover:text-zinc-700" />
                    {item.text}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col">
        <hr className="my-4 h-px w-full bg-gray-100 md:my-6" />

        <UserButton
          showName
          appearance={{
            elements: {
              userButtonBox: "flex-row-reverse",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
