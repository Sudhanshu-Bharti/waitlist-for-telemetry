"use client";

import { WaitlistForm } from "./waitlist-form";
import { StatisticLiveLogo } from "./statistic-live-logo";
import { MiniDashboardMockup } from "./mini-dashboard-mockup";

export function WaitlistSignup() {
  return (
    <div className="flex flex-col items-center  justify-center">
      <div className="mt-12 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
        <h1 className="text-5xl font-bold tracking-tighter  text-center text-white sm:text-7xl">
          The future of analytics
          <br />
          is loading.
        </h1>
        <p className="text-lg text-zinc-400 text-justify leading-relaxed max-w-xl mx-auto">
          <StatisticLiveLogo /> offers a new perspective on your data. Simple, beautiful, and privacy-focused. Join the waitlist for a breath of fresh air.
        </p>

      </div>
      <div className="mt-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
        <WaitlistForm />
      </div>
      <p className="mt-4 text-sm text-zinc-500 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600">
        Be the first to experience it—sign up now and don&apos;t miss the launch!
      </p>

      <div className="mt-16 w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-800">
        <MiniDashboardMockup />
      </div>
    </div>
  );
}
