
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProgressBar } from "@/components/ProgressBar";
import { ShortenerStep } from "@/components/ShortenerStep";
import { KeyDisplay } from "@/components/KeyDisplay";
import { Captcha } from "@/components/Captcha";
import { ServiceSelector } from "@/components/ServiceSelector";
import { generateKey } from "@/services/api";
import { Loader2, Gift } from "lucide-react";

export default function Index() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [keyData, setKeyData] = useState<{ key: string; expiresIn: number } | null>(null);
  const [selectedService, setSelectedService] = useState<"linkvertise" | "lootlabs" | null>(null);
  
  // Number of steps for linkvertise
  const totalSteps = 3;
  const progress = completedSteps.length;
  
  // Verifica se todos os passos foram concluídos
  const allStepsCompleted = progress === totalSteps;
  
  // Completa um passo do encurtador
  const completeStep = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps((prev) => [...prev, stepIndex]);
      
      // Avança para o próximo passo se não for o último
      if (stepIndex < totalSteps - 1) {
        setCurrentStep(stepIndex + 1);
      }
    }
  };
  
  // Gera uma nova key
  const handleGenerateKey = async () => {
    if (!allStepsCompleted || !captchaVerified) return;
    
    setIsGeneratingKey(true);
    
    try {
      const data = await generateKey();
      setKeyData(data);
    } catch (error) {
      console.error("Erro ao gerar key:", error);
    } finally {
      setIsGeneratingKey(false);
    }
  };
  
  // Handle service selection
  const handleServiceSelect = (service: "linkvertise" | "lootlabs") => {
    setSelectedService(service);
    // Reset progress when switching services
    setCompletedSteps([]);
    setCurrentStep(0);
    setCaptchaVerified(false);
    setKeyData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-roblox-red to-red-500">
            Roblox Key Unlocker
          </h1>
          <p className="text-gray-600 mt-2">Complete os passos abaixo para desbloquear sua key</p>
        </header>
        
        {!selectedService ? (
          <div className="flex justify-center my-12">
            <ServiceSelector onSelect={handleServiceSelect} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 animate-fade-in">
            <ProgressBar value={progress} max={totalSteps} />
            
            <div className="mt-6 space-y-4">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <ShortenerStep
                  key={index}
                  stepNumber={index + 1}
                  onComplete={() => completeStep(index)}
                  isActive={currentStep === index || completedSteps.includes(index)}
                  isCompleted={completedSteps.includes(index)}
                />
              ))}
            </div>
            
            {allStepsCompleted && (
              <div className="mt-8 space-y-6">
                <Separator />
                
                {!captchaVerified ? (
                  <Captcha onVerify={() => setCaptchaVerified(true)} />
                ) : keyData ? (
                  <KeyDisplay keyValue={keyData.key} expiresIn={keyData.expiresIn} />
                ) : (
                  <div className="flex justify-center">
                    <Button 
                      size="lg" 
                      onClick={handleGenerateKey}
                      disabled={isGeneratingKey}
                      className="bg-gradient-to-r from-roblox-red to-red-500 hover:opacity-90 transition-opacity animate-pulse-border border-2"
                    >
                      {isGeneratingKey ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Gerando Key...
                        </>
                      ) : (
                        <>
                          <Gift className="mr-2 h-5 w-5" />
                          Desbloquear Key
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        <footer className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Roblox Key Unlocker - Todos os direitos reservados
        </footer>
      </Container>
    </div>
  );
}
