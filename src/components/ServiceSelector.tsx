
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ServiceSelectorProps {
  onSelect: (service: "linkvertise" | "lootlabs") => void;
}

export function ServiceSelector({ onSelect }: ServiceSelectorProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="lg" className="bg-gradient-to-r from-roblox-red to-red-500 hover:opacity-90 transition-opacity">
          <AlertTriangle className="mr-2 h-5 w-5" />
          Select Service
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Choose a service to get your key:</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <Button
            className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90"
            onClick={() => onSelect("linkvertise")}
          >
            LINKVERTISE
          </Button>
          <Button
            className="w-full bg-[#8B3DFF] hover:bg-[#8B3DFF]/90"
            onClick={() => onSelect("lootlabs")}
          >
            LOOTLABS
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
