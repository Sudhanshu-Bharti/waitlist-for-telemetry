import { StatisticLiveLogo } from "./statistic-live-logo";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-8">
        <StatisticLiveLogo size="2xl" />
        <Button className="bg-white text-black hover:bg-zinc-200 rounded-none font-semibold px-6">
          Get Early Access
        </Button>
      </div>
    </header>
  );
} 