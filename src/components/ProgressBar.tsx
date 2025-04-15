
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
}

export function ProgressBar({ value, max }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const percentage = Math.min(100, Math.round((value / max) * 100));

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Progresso</span>
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
      <Progress
        value={progress}
        className={cn("h-3", "bg-roblox-lightgray [&>div]:bg-gradient-to-r [&>div]:from-roblox-red [&>div]:to-red-500")}
      />
    </div>
  );
}
