import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, FileText, List, X } from "lucide-react";

const CandidateApplications = () => {
  const applications = [
    {
      id: 1,
      position: "Frontend Developer",
      company: "TechCorp Inc.",
      status: "Under Review",
      date: "2023-06-15",
      icon: <FileText className="text-blue-400" />
    },
    {
      id: 2,
      position: "UX Designer",
      company: "Creative Studio",
      status: "Interview Scheduled",
      date: "2023-06-18",
      icon: <Check className="text-green-400" />
    },
    {
      id: 3,
      position: "Backend Engineer",
      company: "DataSystems",
      status: "Rejected",
      date: "2023-06-10",
      icon: <X className="text-red-400" />
    }
  ];

  return (
    <div className="text-white animate-[fade-in_0.3s_ease-out]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Applications</h1>
          <p className="text-[#ABABAB]">Track your job applications and status</p>
        </div>
        <Button className="text-black" variant="outline">
          <List className="h-4 w-4 mr-2" />
          Application History
        </Button>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id} className="bg-[#252525] text-white  border-none p-4 hover:bg-[#2e2e2e] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-[#B967FF]/10 p-3 rounded-full">
                  {app.icon}
                </div>
                <div>
                  <h3 className="font-medium text-lg">{app.position}</h3>
                  <p className="text-[#ABABAB]">{app.company}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  app.status === "Under Review" ? "text-yellow-400" :
                  app.status === "Interview Scheduled" ? "text-green-400" :
                  "text-red-400"
                }`}>
                  {app.status}
                </p>
                <p className="text-[#ABABAB] text-sm">{app.date}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CandidateApplications;