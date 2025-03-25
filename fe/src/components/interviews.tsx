import { CalendarDays, Clock, User, Video, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "../components/SectionHeader";
import { useNavigate } from "react-router-dom";

const interviews = [
  {
    id: 1,
    candidate: "Sarah Johnson",
    position: "Frontend Developer",
    date: "2023-06-15",
    time: "10:00 AM",
    duration: "45 mins",
    interviewer: "Alex Chen",
    status: "scheduled",
    round: "Technical"
  },
  {
    id: 2,
    candidate: "Michael Brown",
    position: "Backend Engineer",
    date: "2023-06-16",
    time: "2:30 PM",
    duration: "60 mins",
    interviewer: "Jamie Smith",
    status: "completed",
    round: "Final"
  },
  {
    id: 3,
    candidate: "Emily Wilson",
    position: "UX Designer",
    date: "2023-06-17",
    time: "11:15 AM",
    duration: "45 mins",
    interviewer: "Taylor Wong",
    status: "scheduled",
    round: "Portfolio Review"
  },
];

export const AdminInterviews = () => {
  return (
    <div className="animate-[fade-in_0.3s_ease-out] px-10 text-white">
      <SectionHeader 
        title="Interview Management" 
        actionText="Schedule New" 
        onAction={() => console.log("Schedule new interview")}
      />

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            value={interviews.length} 
            label="Total Interviews" 
            change="+2 from last week" 
          />
          <StatCard 
            value={interviews.filter(i => i.status === "scheduled").length} 
            label="Upcoming" 
            change="+1 from last week" 
          />
          <StatCard 
            value={interviews.filter(i => i.status === "completed").length} 
            label="Completed" 
            change="No change" 
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {interviews.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ value, label, change }: { value: number, label: string, change: string }) => (
  <Card className="bg-[#1E1E1E] border text-white border-[#333] p-4">
    <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
    <p className="text-[#B0B0B0] text-sm mb-1">{label}</p>
    <p className="text-[#B967FF] text-xs">{change}</p>
  </Card>
);

const InterviewCard = ({ interview }: { interview: any }) => {
  const navigate = useNavigate() ;
  return (
    <Card className="bg-[#1E1E1E] text-white border border-[#333] hover:border-[#B967FF] transition-colors">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold">{interview.candidate}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                interview.status === "scheduled" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"
              }`}>
                {interview.status === "scheduled" ? "Scheduled" : "Completed"}
              </span>
            </div>
            <p className="text-[#B0B0B0]">{interview.position}</p>
            <div className="flex flex-wrap gap-4 text-sm text-[#B0B0B0]">
              <div className="flex items-center space-x-1">
                <CalendarDays className="h-4 w-4" />
                <span>{new Date(interview.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{interview.time} ({interview.duration})</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{interview.interviewer}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-[#B967FF]">Round:</span>
                <span>{interview.round}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2  text-black ">
            {interview.status === "scheduled" ? (
              <>
                <Button onClick={() => navigate(`/room/${interview.interviewer}`)} variant="outline" className="bg-[#B967FF]/10  hover:bg-[#B967FF]/20 border-[#B967FF] text-[#B967FF]">
                  <Video className="h-4 w-4 mr-2" />
                  Start
                </Button>
                <Button variant="outline">
                  Reschedule
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="text-green-500 border-green-500">
                  <Check className="h-4 w-4 mr-2" />
                  Hired
                </Button>
                <Button variant="outline" className="text-red-500 border-red-500">
                  <X className="h-4 w-4 mr-2" />
                  Rejected
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};