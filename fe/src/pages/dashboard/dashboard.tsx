import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Users, 
  BarChart2, 
  CheckCircle, 
  XCircle, 
  Play,
  Plus,
  ChevronRight,
  Search,
  Briefcase,
  User,
  Mail
} from "lucide-react";
import Navbar from "@/components/layouts/navbar";
import Card from "@/components/ui-custom/card";
import Button from "@/components/ui-custom/button";
import { useApp } from "@/context/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const { userRole, isAuthenticated } = useApp();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar isAuthenticated userRole={userRole || "admin"} />
      
      <div className="pt-20 px-4 md:px-8 pb-16 max-w-7xl mx-auto">
        {userRole === "candidate" ? <CandidateDashboard /> : <AdminDashboard />}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { sessions, analytics } = useApp();
  const navigate = useNavigate();
  
  return (
    <div className="animate-fade-in text-white mt-[20rem] ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-[#ABABAB]">Manage your recruitment process and track candidates.</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card variant="glass" padding="lg" className="flex bg-neutral-800 border-none items-center">
          <div className="p-3 rounded-full bg-[#B967FF]/20 mr-4">
            <Calendar className="h-6 w-6 text-[#B967FF]" />
          </div>
          <div>
            <p className="text-[#ABABAB] text-sm">Active Sessions</p>
            <p className="text-2xl font-bold text-white">{analytics?.activeSessionsCount || 0}</p>
          </div>
        </Card>
        
        <Card variant="glass" padding="lg" className="flex bg-neutral-800 border-none items-center">
          <div className="p-3 rounded-full bg-[#B967FF]/20 mr-4">
            <Users className="h-6 w-6 text-[#B967FF]" />
          </div>
          <div>
            <p className="text-[#ABABAB] text-sm">Total Candidates</p>
            <p className="text-2xl font-bold text-white">{analytics?.totalCandidatesCount || 0}</p>
          </div>
        </Card>
        
        <Card variant="glass" padding="lg" className="flex bg-neutral-800 border-none items-center">
          <div className="p-3 rounded-full bg-[#B967FF]/20 mr-4">
            <CheckCircle className="h-6 w-6 text-[#B967FF]" />
          </div>
          <div  >
            <p className="text-[#ABABAB] text-sm">Tests Completed</p>
            <p className="text-2xl font-bold text-white">{analytics?.testsCompletedCount || 0}</p>
          </div>
        </Card>
        
        <Card variant="glass" padding="lg" className="flex bg-neutral-800 border-none items-center">
          <div className="p-3 rounded-full bg-[#B967FF]/20 mr-4">
            <Clock className="h-6 w-6 text-[#B967FF]" />
          </div>
          <div>
            <p className="text-[#ABABAB] text-sm">Pending Interviews</p>
            <p className="text-2xl font-bold text-white">{analytics?.interviewsCompletedCount || 0}</p>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Sessions */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Active Sessions</h2>
            <Link to="/sessions" className="bg-neutral-800 border-none" >
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Session
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {sessions
              .filter(session => session.status === "active")
              .slice(0, 3)
              .map((session) => (
                <Card key={session.id} isHoverable className="transition-all bg-neutral-800 duration-300">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-white">{session.title}</h3>
                        <span className="ml-3 px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">Active</span>
                      </div>
                      <p className="text-[#ABABAB] mb-3">
                        {session.skills.join(", ")} • {session.location} • {session.jobType}
                      </p>
                      <div className="flex items-center text-[#ABABAB] text-sm mb-4">
                        <div className="flex items-center mr-4">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{session.candidates.length} Candidates</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            Ends in {Math.ceil((new Date(session.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex md:flex-col items-center md:items-end justify-between">
                      <div className="flex items-center md:mb-3">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        <span className="text-[#ABABAB] text-sm">
                          {session.candidates.filter(c => c.status === "interviewed").length} Interviewed
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/session/${session.id}`)}
                      >
                        View Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              
              {sessions.filter(session => session.status === "active").length === 0 && (
                <Card className="p-6 text-center">
                  <p className="text-[#ABABAB] mb-3">No active sessions found.</p>
                  <Link to="/sessions">
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Session
                    </Button>
                  </Link>
                </Card>
              )}
          </div>
          
          <div className="mt-4 flex justify-center">
            <Link to="/sessions">
              <Button variant="outline" size="sm">
                View All Sessions
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Recent Candidates */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Candidates</h2>
            <Link to="/candidates">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          
          <Card>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ABABAB] h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search candidates" 
                className="w-full pl-10 bg-transparent border border-[#5e5e5e] rounded-lg p-2 text-white"
              />
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((candidate) => (
                <div 
                  key={candidate}
                  className="flex items-center p-3 rounded-lg hover:bg-[#2F2F2F]/30 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-[#2F2F2F] flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-[#ABABAB]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">Sarah Johnson</h4>
                    <p className="text-[#ABABAB] text-sm">Frontend Developer</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`h-2 w-2 rounded-full ${
                      candidate % 2 === 0 ? 'bg-green-500' : 'bg-yellow-500'
                    } mr-2`}></span>
                    <span className="text-[#ABABAB] text-sm">
                      {candidate % 2 === 0 ? 'Interviewed' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      
      {/* Performance Insights */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Performance Insights</h2>
          <Link to="/analytics">
            <Button variant="ghost" size="sm">View Analytics</Button>
          </Link>
        </div>
        
        <Card className="h-64 flex items-center justify-center">
          <div className="text-center">
            <BarChart2 className="h-10 w-10 text-[#B967FF] mx-auto mb-4" />
            <p className="text-[#ABABAB] mb-3">Analytics dashboard will be displayed here</p>
            <Link to="/analytics">
              <Button variant="outline" size="sm">
                View Detailed Analytics
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const CandidateDashboard = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Candidate Dashboard</h1>
        <p className="text-[#ABABAB]">Manage your applications and upcoming interviews.</p>
      </div>
      
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="relative overflow-hidden border border-[#5a5959]">
          <div className="absolute top-0 right-0 w-24 h-24 -mt-10 -mr-10 bg-[#B967FF]/10 rounded-full"></div>
          <div className="absolute top-0 right-0 w-16 h-16 -mt-4 -mr-4 bg-[#B967FF]/20 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="p-3 rounded-full bg-[#B967FF]/20 w-fit mb-4">
              <User className="h-6 w-6 text-[#B967FF]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Complete Your Profile</h3>
            <p className="text-[#ABABAB] mb-4">
              Add your skills, experience, and education to stand out to recruiters.
            </p>
            <Button variant="outline" size="sm">
              Update Profile
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </Card>
        
        <Card className="relative overflow-hidden border border-[#5a5959]">
          <div className="absolute top-0 right-0 w-24 h-24 -mt-10 -mr-10 bg-[#B967FF]/10 rounded-full"></div>
          <div className="absolute top-0 right-0 w-16 h-16 -mt-4 -mr-4 bg-[#B967FF]/20 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="p-3 rounded-full bg-[#B967FF]/20 w-fit mb-4">
              <Mail className="h-6 w-6 text-[#B967FF]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Upload Your Resume</h3>
            <p className="text-[#ABABAB] mb-4">
              Upload or create your resume to apply for job opportunities.
            </p>
            <Button variant="outline" size="sm">
              Manage Resume
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </Card>
        
        <Card className="relative overflow-hidden border border-[#5a5959]">
          <div className="absolute top-0 right-0 w-24 h-24 -mt-10 -mr-10 bg-[#B967FF]/10 rounded-full"></div>
          <div className="absolute top-0 right-0 w-16 h-16 -mt-4 -mr-4 bg-[#B967FF]/20 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="p-3 rounded-full bg-[#B967FF]/20 w-fit mb-4">
              <Briefcase className="h-6 w-6 text-[#B967FF]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Browse Opportunities</h3>
            <p className="text-[#ABABAB] mb-4">
              Explore available positions and apply to those that match your skills.
            </p>
            <Button variant="outline" size="sm">
              Find Jobs
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Interviews */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Upcoming Interviews</h2>
            <Link to="/interviews">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          
          <Card>
            {[1, 2].map((interview) => (
              <div 
                key={interview}
                className="border-b border-[#5a5959] last:border-b-0 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold text-white">Frontend Developer Interview</h3>
                      <span className="ml-3 px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400">Technical</span>
                    </div>
                    <p className="text-[#ABABAB]">TechCorp Inc.</p>
                  </div>
                  
                  <div className="md:text-right mt-2 md:mt-0">
                    <p className="text-[#B967FF] font-semibold">Tomorrow, 2:00 PM</p>
                    <p className="text-[#ABABAB] text-sm">45 minutes</p>
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
            ))}
            
            <div className="mt-4 text-center text-[#ABABAB] text-sm">
              No more upcoming interviews
            </div>
          </Card>
        </div>
        
        {/* Application Status */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Application Status</h2>
          </div>
          
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[#ABABAB] text-sm">Total Applications</p>
                <p className="text-2xl font-bold text-white">5</p>
              </div>
              <div className="space-x-1">
                <span className="inline-block h-3 w-10 bg-green-500 rounded-full"></span>
                <span className="inline-block h-3 w-6 bg-yellow-500 rounded-full"></span>
                <span className="inline-block h-3 w-4 bg-red-500 rounded-full"></span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-[#2F2F2F]/30 rounded-lg">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium text-white">Senior UX Designer</h4>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">In Progress</span>
                </div>
                <p className="text-[#ABABAB] text-sm mb-1">DesignCraft Studios</p>
                <p className="text-[#ABABAB] text-xs">Technical Interview Scheduled</p>
              </div>
              
              <div className="p-3 bg-[#2F2F2F]/30 rounded-lg">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium text-white">React Developer</h4>
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">Under Review</span>
                </div>
                <p className="text-[#ABABAB] text-sm mb-1">WebTech Solutions</p>
                <p className="text-[#ABABAB] text-xs">Application Under Review</p>
              </div>
              
              <div className="p-3 bg-[#2F2F2F]/30 rounded-lg">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium text-white">Product Manager</h4>
                  <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400">Rejected</span>
                </div>
                <p className="text-[#ABABAB] text-sm mb-1">Innovate Inc.</p>
                <p className="text-[#ABABAB] text-xs">Not selected for interview</p>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                View All Applications
              </Button>
            </div>
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
          <Card isHoverable>
            <div className="p-3 rounded-full bg-[#B967FF]/20 w-fit mb-4">
              <Code className="h-6 w-6 text-[#B967FF]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Frontend Development</h3>
            <p className="text-[#ABABAB] mb-4">
              Test your knowledge of HTML, CSS, JavaScript, React, and more.
            </p>
            <Button variant="outline">Take Assessment</Button>
          </Card>
          
          <Card isHoverable>
            <div className="p-3 rounded-full bg-[#B967FF]/20 w-fit mb-4">
              <ServerIcon className="h-6 w-6 text-[#B967FF]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Backend Development</h3>
            <p className="text-[#ABABAB] mb-4">
              Demonstrate your skills in Node.js, Express, databases, and APIs.
            </p>
            <Button variant="outline">Take Assessment</Button>
          </Card>
          
          <Card isHoverable>
            <div className="p-3 rounded-full bg-[#B967FF]/20 w-fit mb-4">
              <Algorithm className="h-6 w-6 text-[#B967FF]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Data Structures & Algorithms</h3>
            <p className="text-[#ABABAB] mb-4">
              Solve algorithmic challenges and optimize code performance.
            </p>
            <Button variant="outline">Take Assessment</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Custom icons
const Code = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ServerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 9H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 15H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6H6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 12H6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 18H6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Algorithm = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H10V10H4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 4H20V10H14V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 14H10V20H4V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 17H20M17 14V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Dashboard;