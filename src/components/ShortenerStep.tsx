
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ExternalLink, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createLinkvertiseUrl } from "@/services/api";

interface ShortenerStepProps {
  stepNumber: number;
  onComplete: () => void;
  isActive: boolean;
  isCompleted: boolean;
}

export function ShortenerStep({
  stepNumber,
  onComplete,
  isActive,
  isCompleted
}: ShortenerStepProps) {
  const [loading, setLoading] = useState(false);

  // Handle linkvertise redirect completion
  useEffect(() => {
    const handleLinkvertiseReturn = () => {
      // Check if this is a return from linkvertise
      const params = new URLSearchParams(window.location.search);
      const completedStep = params.get('step');
      
      if (completedStep && parseInt(completedStep) === stepNumber) {
        setLoading(false);
        onComplete();
        
        // Clean up URL
        window.history.replaceState({}, '', window.location.pathname);
      }
    };

    handleLinkvertiseReturn();
  }, [stepNumber, onComplete]);

  const handleClick = () => {
    if (!isActive || isCompleted) return;
    setLoading(true);
    
    // Generate linkvertise URL and redirect
    const linkvertiseUrl = createLinkvertiseUrl(stepNumber - 1);
    window.location.href = linkvertiseUrl;
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
          <h3 className="font-medium">Linkvertise {stepNumber}</h3>
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
            "Completed"
          ) : loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Link
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
