import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SessionItemProps {
  session: {
    id: number;
    title: string;
    skills: string[];
    location: string;
    jobType: string;
    status: string;
    candidates: { id: number; status: string }[];
    endDate: string;
  };
  onClick?: () => void;
  onViewDetails?: () => void;
}

export const SessionItem = ({ session, onViewDetails }: SessionItemProps) => {
  const daysRemaining = Math.ceil(
    (new Date(session.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="border-b border-[#333] last:border-b-0 py-5 first:pt-0 last:pb-0">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-white">{session.title}</h3>
            <span className="ml-3 px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
              {session.status}
            </span>
          </div>
          <p className="text-[#B0B0B0]">
            {session.skills.join(", ")} • {session.location} • {session.jobType}
          </p>
        </div>

        <div className="md:text-right">
          <div className="flex items-center gap-4 text-[#B0B0B0] text-sm mb-4">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{session.candidates.length} candidates</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{daysRemaining} days remaining</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
             onClick={onViewDetails}
            className="hover:bg-[#B967FF]/10 hover:text-[#B967FF]"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};