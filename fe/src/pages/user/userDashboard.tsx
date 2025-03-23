import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User as UserIcon,
  Briefcase,
  Clock,
  CheckCircle,
  FileText,
  Bell,
  Search,
  ChevronRight,
  Play,
  Plus,
} from "lucide-react";
import Navbar from "@/components/layouts/navbar";
import Card from "@/components/ui-custom/card";
import Button from "@/components/ui-custom/button";
import { useApp } from "@/context/AppContext";

const UserDashboard = () => {
  const { userRole, isAuthenticated } = useApp();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar isAuthenticated userRole={userRole || "candidate"} />

      <div className="pt-20 px-4 md:px-8 pb-16 max-w-7xl mx-auto">
        <CandidateDashboard />
      </div>
    </div>
  );
};

const CandidateDashboard = () => {
  const { applications, interviews, assessments } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApplications = useMemo(() => {
    return applications.filter((application) =>
      application.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [applications, searchQuery]);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Candidate Dashboard</h1>
        <p className="text-gray-400">Manage your job applications and upcoming interviews.</p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ActionCard
          icon={<UserIcon className="h-6 w-6 text-purple-400" />}
          title="Complete Your Profile"
          description="Add your skills, experience, and education to stand out to recruiters."
          buttonText="Update Profile"
          onClick={() => console.log("Navigate to profile page")}
        />
        <ActionCard
          icon={<FileText className="h-6 w-6 text-purple-400" />}
          title="Upload Your Resume"
          description="Upload or create your resume to apply for job opportunities."
          buttonText="Manage Resume"
          onClick={() => console.log("Navigate to resume upload page")}
        />
        <ActionCard
          icon={<Briefcase className="h-6 w-6 text-purple-400" />}
          title="Browse Opportunities"
          description="Explore available positions and apply to those that match your skills."
          buttonText="Find Jobs"
          onClick={() => console.log("Navigate to job search page")}
        />
      </div>

      {/* Job Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Job Applications</h2>
            <Link to="/jobs">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Apply for Jobs
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {filteredApplications.slice(0, 3).map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}

            {filteredApplications.length === 0 && (
              <Card className="p-6 text-center">
                <p className="text-gray-400 mb-3">No job applications found.</p>
                <Link to="/jobs">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Apply for Jobs
                  </Button>
                </Link>
              </Card>
            )}
          </div>

          <div className="mt-4 flex justify-center">
            <Link to="/jobs">
              <Button variant="outline" size="sm">
                View All Applications
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Upcoming Interviews</h2>
            <Link to="/interviews">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>

          <Card>
            {interviews.slice(0, 2).map((interview) => (
              <InterviewItem key={interview.id} interview={interview} />
            ))}

            {interviews.length === 0 && (
              <div className="mt-4 text-center text-gray-400 text-sm">
                No upcoming interviews
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Skills Assessment */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Practice Assessments</h2>
          <Button variant="ghost" size="sm">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AssessmentCard
            icon={<Code className="h-6 w-6 text-purple-400" />}
            title="Frontend Development"
            description="Test your knowledge of HTML, CSS, JavaScript, React, and more."
          />
          <AssessmentCard
            icon={<ServerIcon className="h-6 w-6 text-purple-400" />}
            title="Backend Development"
            description="Demonstrate your skills in Node.js, Express, databases, and APIs."
          />
          <AssessmentCard
            icon={<Algorithm className="h-6 w-6 text-purple-400" />}
            title="Data Structures & Algorithms"
            description="Solve algorithmic challenges and optimize code performance."
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const ActionCard = ({ icon, title, description, buttonText, onClick }: { icon: React.ReactNode; title: string; description: string; buttonText: string; onClick: () => void }) => (
  <Card className="p-6 bg-gray-800 border-none hover:bg-gray-750 transition-colors">
    <div className="p-3 rounded-full bg-purple-400/10 w-fit mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 mb-4">{description}</p>
    <Button variant="outline" size="sm" onClick={onClick}>
      {buttonText}
      <ChevronRight className="h-4 w-4 ml-1" />
    </Button>
  </Card>
);

const ApplicationCard = ({ application }: { application: any }) => (
  <Card className="p-6 bg-gray-800 border-none hover:bg-gray-750 transition-colors">
    <div className="flex flex-col md:flex-row justify-between">
      <div>
        <h3 className="text-lg font-semibold text-white">{application.jobTitle}</h3>
        <p className="text-gray-400 mb-3">{application.company}</p>
        <div className="flex items-center text-gray-400 text-sm mb-4">
          <div className="flex items-center mr-4">
            <Clock className="h-4 w-4 mr-1" />
            <span>Applied on {new Date(application.appliedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center mr-4">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>{application.status}</span>
          </div>
        </div>
      </div>

      <div className="flex md:flex-col items-center md:items-end justify-between">
        <div className="flex items-center md:mb-3">
          <span className={`h-2 w-2 rounded-full ${application.status === "Interviewed" ? "bg-green-500" : "bg-yellow-500"} mr-2`}></span>
          <span className="text-gray-400 text-sm">{application.status}</span>
        </div>
        <Button variant="ghost" size="sm">
          View Details
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  </Card>
);

const InterviewItem = ({ interview }: { interview: any }) => (
  <div className="border-b border-gray-700 last:border-b-0 py-4 first:pt-0 last:pb-0">
    <div className="flex flex-col md:flex-row justify-between mb-2">
      <div>
        <h3 className="text-lg font-semibold text-white">{interview.jobTitle}</h3>
        <p className="text-gray-400">{interview.company}</p>
      </div>

      <div className="md:text-right mt-2 md:mt-0">
        <p className="text-purple-400 font-semibold">{new Date(interview.date).toLocaleString()}</p>
        <p className="text-gray-400 text-sm">{interview.duration} minutes</p>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-4 mt-4">
      <Button variant="primary" size="sm">
        <Play className="h-4 w-4 mr-1" />
        Join Interview
      </Button>
      <Button variant="outline" size="sm">Prepare</Button>
      <Button variant="ghost" size="sm">Reschedule</Button>
    </div>
  </div>
);

const AssessmentCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <Card className="p-6 bg-gray-800 border-none hover:bg-gray-750 transition-colors">
    <div className="p-3 rounded-full bg-purple-400/10 w-fit mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 mb-4">{description}</p>
    <Button variant="outline">Take Assessment</Button>
  </Card>
);

// Custom Icons
const Code = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ServerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 9H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 15H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 6H6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 12H6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 18H6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Algorithm = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H10V10H4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 4H20V10H14V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 14H10V20H4V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 17H20M17 14V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default UserDashboard;