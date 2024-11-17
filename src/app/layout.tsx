import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "PingPanda",
  description:
    "PingPanda is the easiest way to monitor your SaaS. Get instant notifications for sales, new users, or any other event sent directly to your Discord",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
        <body className="flex min-h-[calc(100vh-1px)] flex-col bg-brand-50 font-sans text-brand-950 antialiased">
          <main className="relative flex flex-1 flex-col">
            <Providers>{children}</Providers>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
