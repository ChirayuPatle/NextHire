import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, FileText } from "lucide-react";

const CandidateAssessments = () => {
  const assessments = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      category: "Frontend",
      progress: 75,
      duration: "30 min",
      status: "In Progress"
    },
    {
      id: 2,
      title: "System Design",
      category: "Backend",
      progress: 20,
      duration: "60 min",
      status: "Not Started"
    }
  ];

  return (
    <div className="text-white animate-[fade-in_0.3s_ease-out]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Skill Assessments</h1>
          <p className="text-[#ABABAB]">Test and improve your technical skills</p>
        </div>
        <Button className="text-black" variant="outline">
          <Briefcase className="h-4 w-4 mr-2" />
          Browse Assessments
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="bg-[#252525] text-white border-none hover:border-[#B967FF] transition-colors p-6">
            <div className="p-3 rounded-full bg-[#B967FF]/20 w-fit mb-4">
              <FileText className="h-6 w-6 text-[#B967FF]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{assessment.title}</h3>
            <p className="text-[#ABABAB] mb-1">{assessment.category} • {assessment.duration}</p>
            <p className="text-yellow-400 text-sm mb-4">
              {assessment.status}
            </p>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-[#ABABAB] mb-1">
                <span>Progress</span>
                <span>{assessment.progress}%</span>
              </div>
              <div className="w-full bg-[#3a3a3a] rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-[#B967FF]" 
                  style={{ width: `${assessment.progress}%` }}
                ></div>
              </div>
            </div>
            
            <Button variant="outline" className="text-black w-full">
              {assessment.status === "In Progress" ? "Continue" : "Start Assessment"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CandidateAssessments;