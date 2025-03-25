import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Edit, FileText, Briefcase } from "lucide-react";

const CandidateProfile = () => {
  return (
    <div className="animate-[fade-in_0.3s_ease-out] text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-[#ABABAB]">Manage your personal information and resume</p>
        </div>
        <Button className="text-black" variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 text-white lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#252525] border-none p-6">
            <div className="flex items-center text-white space-x-4 mb-6">
              <div className="bg-[#B967FF]/20 p-3 rounded-full">
                <User className="h-6 w-6 text-[#B967FF]" />
              </div>
              <h2 className="text-xl font-semibold">Personal Information</h2>
            </div>
            
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[#ABABAB] text-sm">Full Name</p>
                <p className="text-white">John Doe</p>
              </div>
              <div>
                <p className="text-[#ABABAB] text-sm">Email</p>
                <p className="text-white">john.doe@example.com</p>
              </div>
              <div>
                <p className="text-[#ABABAB] text-sm">Phone</p>
                <p className="text-white">+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="text-[#ABABAB] text-sm">Location</p>
                <p className="text-white">San Francisco, CA</p>
              </div>
            </div>
          </Card>

          <Card className="bg-[#252525] text-white  border-none p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-[#B967FF]/20 p-3 rounded-full">
                <Briefcase className="h-6 w-6 text-[#B967FF]" />
              </div>
              <h2 className="text-xl font-semibold">Work Experience</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-b border-[#3a3a3a] pb-4">
                <h3 className="font-medium text-white">Frontend Developer at TechCorp</h3>
                <p className="text-[#ABABAB] text-sm">Jan 2020 - Present</p>
                <p className="text-[#ABABAB] mt-2">Developed and maintained web applications using React and TypeScript</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#252525] text-white  border-none p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-[#B967FF]/20 p-3 rounded-full">
                <FileText className="h-6 w-6 text-[#B967FF]" />
              </div>
              <h2 className="text-xl font-semibold">Resume</h2>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#3a3a3a] rounded-lg">
              <FileText className="h-10 w-10 text-[#ABABAB] mb-2" />
              <p className="text-[#ABABAB] text-center mb-4">Upload your resume to apply for jobs</p>
              <Button variant="outline" className="w-full">
                Upload Resume
              </Button>
            </div>
          </Card>

          <Card className="bg-[#252525] text-white  border-none p-6">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {['JavaScript', 'React', 'TypeScript', 'HTML', 'CSS', 'Node.js'].map(skill => (
                <span key={skill} className="px-3 py-1 bg-[#3a3a3a] rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;