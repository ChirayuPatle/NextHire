
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Award,
  BarChart2,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronRight,
  Code,
  Cpu,
  FileText,
  Play,
  Server,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CandidateDashboard = () => {
  const navigate = useNavigate();
  // Mock data
  const applications = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp Inc.",
      status: "interview",
      date: "2023-06-15",
      type: "Technical Interview"
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Creative Studio",
      status: "review",
      date: "2023-06-10",
      type: "Design Challenge"
    }
  ];

  const stats = {
    applied: 8,
    interviews: 3,
    offers: 1,
    skillsCompleted: 5
  };

  return (
    <div className="animate-[fade-in_0.3s_ease-out] text-white px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, Candidate!</h1>
        <p className="text-[#B0B0B0] text-lg">Track your applications and prepare for interviews.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard 
          icon={<FileText className="h-6 w-6 text-[#B967FF]" />} 
          label="Applications" 
          value={stats.applied} 
          className="bg-[#1E1E1E]"
        />
        <StatCard 
          icon={<Calendar className="h-6 w-6 text-[#B967FF]" />} 
          label="Interviews" 
          value={stats.interviews} 
          className="bg-[#1E1E1E]"
        />
        <StatCard 
          icon={<Award className="h-6 w-6 text-[#B967FF]" />} 
          label="Offers" 
          value={stats.offers} 
          className="bg-[#1E1E1E]"
        />
        <StatCard 
          icon={<CheckCircle className="h-6 w-6 text-[#B967FF]" />} 
          label="Skills Completed" 
          value={stats.skillsCompleted} 
          className="bg-[#1E1E1E]"
        />
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <ActionCard 
          icon={<User className="h-6 w-6 text-[#B967FF]" />}
          title="Complete Your Profile"
          description="Add your skills, experience, and education to stand out to recruiters."
          buttonText="Update Profile"
          onClick={() => navigate("/candidate/profile")}
        />
        <ActionCard 
          icon={<FileText className="h-6 w-6 text-[#B967FF]" />}
          title="Upload Your Resume"
          description="Upload or create your resume to apply for job opportunities."
          buttonText="Manage Resume"
          onClick={() => navigate("/create-profile")}
        />
        <ActionCard 
          icon={<Briefcase className="h-6 w-6 text-[#B967FF]" />}
          title="Browse Opportunities"
          description="Explore available positions and apply to those that match your skills."
          buttonText="Find Jobs"
          onClick={() => navigate("/jobs")}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Upcoming Interviews */}
        <div className="xl:col-span-2 space-y-6">
          <SectionHeader 
            title="Upcoming Interviews" 
            actionText="View All" 
            onAction={() => navigate("/candidate/interviews")}
          />
          
          <Card className="bg-[#1E1E1E] border border-[#333] p-6">
            {applications.filter(app => app.status === "interview").length > 0 ? (
              applications.filter(app => app.status === "interview").map((interview) => (
                <InterviewItem key={interview.id} interview={interview} />
              ))
            ) : (
              <EmptyState 
                message="No upcoming interviews scheduled."
                actionText="Browse Jobs"
                onAction={() => navigate("/jobs")}
              />
            )}
          </Card>
        </div>

        {/* Application Status */}
        <div className="space-y-6">
          <SectionHeader 
            title="Application Status" 
            actionText="View All" 
            onAction={() => navigate("/candidate/applications")}
          />
          
          <Card className="bg-[#1E1E1E] border border-[#333] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[#B0B0B0] text-sm">Total Applications</p>
                <p className="text-2xl font-bold text-white">{applications.length}</p>
              </div>
              <div className="flex space-x-2">
                <div className="h-3 w-10 bg-green-500 rounded-full"></div>
                <div className="h-3 w-6 bg-yellow-500 rounded-full"></div>
                <div className="h-3 w-4 bg-red-500 rounded-full"></div>
              </div>
            </div>

            <div className="space-y-4">
              {applications.slice(0, 3).map((app) => (
                <ApplicationItem 
                  key={app.id} 
                  application={app} 
                  onClick={() => navigate(`/candidate/applications/${app.id}`)}
                />
              ))}
            </div>

            <Button 
              variant="outline" 
              className="w-full mt-6"
              onClick={() => navigate("/candidate/applications")}
            >
              View All Applications
            </Button>
          </Card>
        </div>
      </div>

      {/* Skills Assessment */}
      <div className="mt-12">
        <SectionHeader 
          title="Recommended Assessments" 
          actionText="View All" 
          onAction={() => navigate("/candidate/assessments")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AssessmentCard 
            icon={<Code className="h-6 w-6 text-[#B967FF]" />}
            title="JavaScript Fundamentals"
            category="Frontend"
            progress={75}
            duration="30 min"
            status="In Progress"
          />
          <AssessmentCard 
            icon={<Server className="h-6 w-6 text-[#B967FF]" />}
            title="System Design"
            category="Backend"
            progress={20}
            duration="60 min"
            status="Not Started"
          />
          <AssessmentCard 
            icon={<Cpu className="h-6 w-6 text-[#B967FF]" />}
            title="Data Structures"
            category="Algorithms"
            progress={45}
            duration="45 min"
            status="In Progress"
          />
        </div>
      </div>

      {/* Learning Resources */}
      <div className="mt-12">
        <SectionHeader 
          title="Learning Resources" 
          actionText="View All" 
          onAction={() => navigate("/resources")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ResourceCard 
            icon={<BookOpen className="h-6 w-6 text-[#B967FF]" />}
            title="Interview Preparation Guide"
            description="Comprehensive guide to ace your technical and behavioral interviews."
          />
          <ResourceCard 
            icon={<Code className="h-6 w-6 text-[#B967FF]" />}
            title="React Patterns"
            description="Learn advanced React patterns and best practices for production apps."
          />
          <ResourceCard 
            icon={<BarChart2 className="h-6 w-6 text-[#B967FF]" />}
            title="Salary Negotiation"
            description="Master the art of negotiating your compensation package."
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const StatCard = ({ icon, label, value, className }: { icon: React.ReactNode, label: string, value: number, className?: string }) => (
  <Card className={`flex items-center p-5 ${className}`}>
    <div className="p-3 rounded-full bg-[#B967FF]/20 mr-4">
      {icon}
    </div>
    <div>
      <p className="text-[#B0B0B0] text-sm">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </Card>
);

const ActionCard = ({ icon, title, description, buttonText, onClick }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  buttonText: string,
  onClick: () => void
}) => (
  <Card className="relative overflow-hidden bg-[#1E1E1E] border border-[#333] p-6 hover:border-[#B967FF] transition-colors">
    <div className="absolute top-0 right-0 w-24 h-24 -mt-10 -mr-10 bg-[#B967FF]/10 rounded-full"></div>
    <div className="absolute top-0 right-0 w-16 h-16 -mt-4 -mr-4 bg-[#B967FF]/20 rounded-full"></div>

    <div className="relative z-10">
      <div className="p-3 rounded-full bg-[#B967FF]/20 w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <p className="text-[#B0B0B0] mb-6">
        {description}
      </p>
      <Button variant="outline" size="sm" onClick={onClick}>
        {buttonText}
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  </Card>
);

const SectionHeader = ({ title, actionText, onAction }: { title: string, actionText: string, onAction: () => void }) => (
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-white">{title}</h2>
    <Button variant="ghost" size="sm" onClick={onAction}>
      {actionText}
    </Button>
  </div>
);




const InterviewItem = ({ interview }: { interview: any }) => {
  const navigate = useNavigate();

  const roomJoinHandler = () => {
    const uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    navigate(`/room/${uuid}`);
  };

  return (
    <div className="border-b border-[#333] last:border-b-0 py-5 first:pt-0 last:pb-0">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-white">{interview.title}</h3>
            <span className="ml-3 px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400">
              {interview.type}
            </span>
          </div>
          <p className="text-[#B0B0B0]">{interview.company}</p>
        </div>

        <div className="md:text-right">
          <p className="text-[#B967FF] font-semibold">
            {new Date(interview.date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <p className="text-[#B0B0B0] text-sm mb-4">45 minutes</p>
          
          <div className="flex flex-wrap gap-3">
            <Button onClick={roomJoinHandler} className="hover:bg-white hover:text-black" size="sm">
              <Play className="h-4 w-4 mr-1" />
              Join Interview
            </Button>
            <Button variant="outline" size="sm">
              Prepare
            </Button>
            <Button variant="ghost" size="sm">
              Reschedule
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplicationItem = ({ application, onClick }: { application: any, onClick: () => void }) => (
  <div 
    className="p-4 bg-[#252525] rounded-lg hover:bg-[#2E2E2E] transition-colors cursor-pointer"
    onClick={onClick}
  >
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-medium text-white mb-1">{application.title}</h4>
        <p className="text-[#B0B0B0] text-sm mb-2">{application.company}</p>
      </div>
      <span className={`px-2 py-1 text-xs rounded-full ${
        application.status === "interview" 
          ? "bg-green-500/20 text-green-400" 
          : application.status === "review" 
            ? "bg-yellow-500/20 text-yellow-400"
            : "bg-blue-500/20 text-blue-400"
      }`}>
        {application.status === "interview" ? "Interview" : "Under Review"}
      </span>
    </div>
    <p className="text-[#B0B0B0] text-xs mt-2">
      Applied on {new Date(application.date).toLocaleDateString()}
    </p>
  </div>
);

const AssessmentCard = ({ icon, title, category, progress, duration, status }: { 
  icon: React.ReactNode, 
  title: string, 
  category: string, 
  progress: number,
  duration: string,
  status: string
}) => (
  <Card className="bg-[#1E1E1E] border border-[#333] hover:border-[#B967FF] transition-colors p-6">
    <div className="p-3 rounded-full bg-[#B967FF]/20 w-fit mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-[#B0B0B0] mb-1">{category} • {duration}</p>
    <p className={`text-sm mb-4 ${
      status === "Completed" ? "text-green-400" :
      status === "In Progress" ? "text-yellow-400" :
      "text-gray-400"
    }`}>
      {status}
    </p>
    
    <div className="mb-6">
      <div className="flex justify-between text-sm text-[#B0B0B0] mb-1">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-[#333] rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${
            progress === 100 ? "bg-green-500" : "bg-[#B967FF]"
          }`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
    
    <Button variant="outline" className="w-full">
      {status === "Completed" ? "View Results" : 
       status === "In Progress" ? "Continue" : "Start Assessment"}
    </Button>
  </Card>
);

const ResourceCard = ({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string
}) => (
  <Card className="bg-[#1E1E1E] border border-[#333] hover:border-[#B967FF] transition-colors p-6">
    <div className="p-3 rounded-full bg-[#B967FF]/20 w-fit mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
    <p className="text-[#B0B0B0] mb-6">
      {description}
    </p>
    <Button variant="outline" className="w-full">
      Start Learning
    </Button>
  </Card>
);

const EmptyState = ({ message, actionText, onAction }: { 
  message: string, 
  actionText: string,
  onAction: () => void
}) => (
  <div className="p-6 text-center">
    <p className="text-[#B0B0B0] mb-4">{message}</p>
    <Button variant="outline" size="sm" onClick={onAction}>
      {actionText}
    </Button>
  </div>
);

export default CandidateDashboard;