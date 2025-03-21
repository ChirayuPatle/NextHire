
import Navbar from "@/components/layout/Navbar";
import ResumeParser from "@/components/features/ResumeParser";

const Resume = () => {
  return (
    <div className="min-h-screen bg-nexthire-black">
      <Navbar isAuthenticated userRole="candidate" />
      
      <div className="pt-28 px-4 md:px-8 pb-16 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Resume Builder</h1>
          <p className="text-nexthire-text-gray">Upload or create your professional resume.</p>
        </div>
        
        <ResumeParser />
      </div>
    </div>
  );
};

export default Resume;
