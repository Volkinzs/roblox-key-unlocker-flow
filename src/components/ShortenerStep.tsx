
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ExternalLink, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShortenerStepProps {
  stepNumber: number;
  url: string;
  onComplete: () => void;
  isActive: boolean;
  isCompleted: boolean;
}

export function ShortenerStep({
  stepNumber,
  url,
  onComplete,
  isActive,
  isCompleted
}: ShortenerStepProps) {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(5);

  // Simulando o processo de encurtador com um temporizador
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isActive && loading && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (isActive && loading && timer === 0) {
      setLoading(false);
      onComplete();
    }
    
    return () => clearInterval(interval);
  }, [isActive, loading, timer, onComplete]);

  const handleClick = () => {
    if (!isActive || isCompleted) return;
    setLoading(true);
    window.open(url, '_blank');
  };

  return (
    <div className={cn(
      "border rounded-lg p-4 transition-all duration-300",
      isActive ? "border-roblox-red" : "border-gray-200 opacity-70",
      isCompleted ? "bg-green-50 border-green-500" : ""
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={cn(
            "w-8 h-8 flex items-center justify-center rounded-full text-white",
            isCompleted ? "bg-green-500" : "bg-roblox-red"
          )}>
            {isCompleted ? <Check size={16} /> : stepNumber}
          </div>
          <h3 className="font-medium">Encurtador {stepNumber}</h3>
        </div>
        
        <Button 
          variant={isCompleted ? "outline" : "default"}
          size="sm" 
          disabled={!isActive || loading || isCompleted}
          onClick={handleClick}
          className={cn(
            "transition-all",
            isCompleted ? "border-green-500 text-green-500" : ""
          )}
        >
          {isCompleted ? (
            "Concluído"
          ) : loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Aguarde {timer}s
            </>
          ) : (
            <>
              <ExternalLink className="mr-2 h-4 w-4" />
              Acessar Link
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
