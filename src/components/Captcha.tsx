
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield } from "lucide-react";

interface CaptchaProps {
  onVerify: () => void;
}

export function Captcha({ onVerify }: CaptchaProps) {
  const [checked, setChecked] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = () => {
    if (!checked) return;
    
    setVerifying(true);
    
    // Simula uma verificação de CAPTCHA
    setTimeout(() => {
      setVerifying(false);
      onVerify();
    }, 1500);
  };

  return (
    <Card className="w-full border shadow-sm">
      <CardHeader className="bg-gray-50 pb-3">
        <CardTitle className="text-sm font-medium text-gray-700 flex items-center justify-center">
          <Shield className="h-4 w-4 mr-2" />
          Verificação de Segurança
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="captcha"
                checked={checked}
                onCheckedChange={(value) => setChecked(!!value)}
              />
              <label
                htmlFor="captcha"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Não sou um robô
              </label>
            </div>
          </div>
          
          <Button 
            size="sm" 
            disabled={!checked || verifying}
            onClick={handleVerify}
          >
            {verifying ? "Verificando..." : "Verificar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
