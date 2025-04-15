
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Key } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface KeyDisplayProps {
  keyValue: string;
  expiresIn: number; // tempo em segundos
}

export function KeyDisplay({ keyValue, expiresIn }: KeyDisplayProps) {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(expiresIn);
  const [copied, setCopied] = useState(false);
  
  // Formata o tempo restante em horas, minutos e segundos
  const formatTimeLeft = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Copia a key para a área de transferência
  const copyToClipboard = () => {
    navigator.clipboard.writeText(keyValue);
    setCopied(true);
    toast({
      title: "Key copiada!",
      description: "A key foi copiada para a área de transferência."
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Contador regressivo
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Determina a cor do contador baseada no tempo restante
  const getTimeColor = () => {
    if (timeLeft > 3600) return "text-green-500"; // mais de 1 hora
    if (timeLeft > 600) return "text-yellow-500"; // mais de 10 minutos
    return "text-red-500"; // menos de 10 minutos
  };

  return (
    <Card className="w-full border-2 border-roblox-red shadow-lg animate-bounce-in">
      <CardHeader className="bg-gradient-to-r from-roblox-red to-red-500 text-white">
        <CardTitle className="flex items-center justify-center gap-2">
          <Key /> Sua Key do Roblox
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="relative">
          <p className="text-center text-lg font-mono bg-gray-100 py-3 px-4 rounded-md border border-gray-200 break-all">
            {keyValue}
          </p>
          <Button
            size="sm"
            variant="outline"
            className={cn(
              "absolute right-2 top-2",
              copied ? "bg-green-500 text-white" : ""
            )}
            onClick={copyToClipboard}
          >
            <Copy size={16} />
          </Button>
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-1">
          <p className="text-sm text-gray-500">Tempo restante:</p>
          <Badge variant="outline" className={cn("text-lg font-mono px-3 py-1", getTimeColor())}>
            {formatTimeLeft()}
          </Badge>
          
          {timeLeft <= 0 && (
            <p className="text-red-500 font-medium text-center mt-2">
              Key expirada! Gere uma nova key.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
