import React from "react";
import { ChevronRight } from "lucide-react";
import {Button} from "../components/ui/button"
import {Card} from "../components/ui/card"

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

export const ActionCard = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  onClick 
}: ActionCardProps) => ( <Card className="relative overflow-hidden bg-[#1E1E1E] border border-[#333] p-6 hover:border-[#B967FF] transition-colors h-full">
    <div className="absolute top-0 right-0 w-24 h-24 -mt-10 -mr-10 bg-[#B967FF]/10 rounded-full"></div>
    <div className="absolute top-0 right-0 w-16 h-16 -mt-4 -mr-4 bg-[#B967FF]/20 rounded-full"></div>

    <div className="relative z-10 h-full flex flex-col">
      <div className="p-3 rounded-full bg-[#B967FF]/20 w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <p className="text-[#B0B0B0] mb-6 flex-grow">{description}</p>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onClick}
        className="mt-auto w-fit"
      >
        {buttonText}
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  </Card>
);