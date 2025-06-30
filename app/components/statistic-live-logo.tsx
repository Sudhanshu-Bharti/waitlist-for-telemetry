import { cn } from "@/lib/utils";

type SizeProp = "default" | "2xl";

interface StatisticLiveLogoProps {
  size?: SizeProp;
}

export function StatisticLiveLogo({ size = "default" }: StatisticLiveLogoProps) {
  const styles = {
    default: {
      text: "text-xl",
      dot: "text-3xl",
    },
    "2xl": {
      text: "text-2xl",
      dot: "text-4xl",
    },
  };

  const currentStyle = styles[size];

  return (
    <span className={cn("inline-flex items-baseline", currentStyle.text)}>
      <span className="font-semibold text-white">statistic</span>
      <span className={cn("mx-px leading-none text-green-500", currentStyle.dot)}>.</span>
      <span className="font-semibold text-white">live</span>
    </span>
  );
} 