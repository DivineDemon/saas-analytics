import { Check } from "lucide-react";

import DiscordMessage from "@/components/discord-message";
import Heading from "@/components/heading";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import MockDiscordUI from "@/components/mock-discord-ui";
import ShinyButton from "@/components/shiny-button";
import { AnimatedList } from "@/components/ui/animated-list";

const App = () => {
  return (
    <>
      <section className="relative bg-brand-25 py-24 sm:py-32">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto flex flex-col items-center gap-10 text-center">
            <div className="">
              <Heading>
                <span>Real-Time SaaS Insights,</span>
                <br />
                <span className="relative bg-gradient-to-r from-brand-700 to-brand-800 bg-clip-text text-transparent">
                  Delivered to your Discord
                </span>
              </Heading>
            </div>
            <p className="max-w-prose text-pretty text-center text-base/7 text-gray-600">
              PingPanda is the easiest way to monitor your SaaS. Get instant
              notifications for&nbsp;
              <span className="font-semibold text-gray-700">
                sales, new users, or any other event
              </span>
              &nbsp;sent directly to your Discord
            </p>
            <ul className="flex flex-col items-start space-y-2 text-left text-base/7 text-gray-600">
              {[
                "Real-Time Discord alerts for critical events",
                "Buy once, use forever",
                "Track sales, new users, or any other event",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-1.5 text-left">
                  <Check className="size-5 shrink-0 text-brand-700" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="w-full max-w-80">
              <ShinyButton
                href="/sign-up"
                className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                Start for Free Today
              </ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="relative bg-brand-25 pb-4">
        <div className="absolute inset-x-0 bottom-24 top-24 bg-brand-700" />
        <div className="relative mx-auto">
          <MaxWidthWrapper className="relative">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <MockDiscordUI>
                <AnimatedList>
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="PingPanda Avatar"
                    username="PingPanda"
                    timestamp="Today at 12:35PM"
                    badgeText="SignUp"
                    badgeColor="#43B581"
                    title="👤 New User Signed Up"
                    content={{
                      name: "Mushood Hanif",
                      email: "mohdmushood@yahoo.com",
                    }}
                  />
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="PingPanda Avatar"
                    username="PingPanda"
                    timestamp="Today at 12:35PM"
                    badgeText="Revenue"
                    badgeColor="#FAA61A"
                    title="💰 Payment Received"
                    content={{
                      plan: "PRO",
                      amount: "$49.00",
                      email: "zoe_martinez@yahoo.com",
                    }}
                  />
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="PingPanda Avatar"
                    username="PingPanda"
                    timestamp="Today at 05:11AM"
                    badgeText="Milestone"
                    badgeColor="#5865F2"
                    title="🚀 Revenue Milestone Achieved"
                    content={{
                      recurringRevenue: "$5,000",
                      growth: "+8.2%",
                    }}
                  />
                </AnimatedList>
              </MockDiscordUI>
            </div>
          </MaxWidthWrapper>
        </div>
      </section>
      <section></section>
      <section></section>
    </>
  );
};

export default App;
