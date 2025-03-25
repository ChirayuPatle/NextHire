import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Calendar, Clock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CandidateInterviews = () => {
  const navigate = useNavigate()
  const interviews = [
    {
      id: 1,
      position: "Frontend Developer",
      company: "TechCorp Inc.",
      type: "Technical Interview",
      date: "Today, 2:00 PM",
      duration: "45 mins",
      status: "Upcoming"
    },
    {
      id: 2,
      position: "UX Designer",
      company: "Creative Studio",
      type: "Design Review",
      date: "Tomorrow, 10:00 AM",
      duration: "1 hour",
      status: "Upcoming"
    }
  ];

  return (
    <div className="text-white animate-[fade-in_0.3s_ease-out]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Interview Schedule</h1>
          <p className="text-[#ABABAB]">Your upcoming and past interviews</p>
        </div>
        <Button>
          <Mail className="h-4 w-4 mr-2" />
          Schedule New Interview
        </Button>
      </div>

      <div className="space-y-4">
        {interviews.map((interview) => (
          <Card key={interview.id} className="text-white bg-[#252525] border-none p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold">{interview.position}</h3>
                  <span className="ml-3 px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400">
                    {interview.type}
                  </span>
                </div>
                <p className="text-[#ABABAB] mb-3">{interview.company}</p>
                <div className="flex items-center text-[#ABABAB] text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{interview.duration}</span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:text-right">
                <p className="text-[#B967FF] font-semibold">
                  {interview.date}
                </p>
                <p className="text-[#ABABAB] text-sm">{interview.status}</p>
                <Button variant="outline" onClick={() => navigate(`/room/${interview.company}`)} className="text-black mt-3">
                  Join Interview
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CandidateInterviews;