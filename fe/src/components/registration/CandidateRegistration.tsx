
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "@/components/ui-custom/button";
import { useApp } from "@/context/AppContext";
import { ArrowLeft, User, BookOpen, FileText } from "lucide-react";

interface CandidateRegistrationProps {
  email: string;
  password: string;
  onBack: () => void;
}

const CandidateRegistration = ({ email, password, onBack }: CandidateRegistrationProps) => {
  const navigate = useNavigate();
  const { login } = useApp();
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  
  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!firstName || !lastName) {
      toast.error("First name and last name are required");
      return;
    }
    
    if (skills.length === 0) {
      toast.error("Please add at least one skill");
      return;
    }
    
    setIsLoading(true);
    
    // In a real app with Supabase, you would register the user and upload the resume here
    // For now, we'll simulate the registration process with a timeout
    setTimeout(async () => {
      try {
        // Create candidate object based on schema
        const candidateData = {
          firstName,
          lastName,
          skills,
          resume: resume ? resume.name : null,
          details: {}
        };
        
        // Log the data that would be sent to Supabase
        console.log("Candidate registration data:", {
          email,
          password,
          role: "CANDIDATE",
          candidate: candidateData
        });
        
        // Simulate a successful registration
        const success = await login(email, password, "candidate");
        
        if (success) {
          toast.success("Registration successful! Welcome to NextHire.");
          navigate("/dashboard");
        } else {
          throw new Error("Failed to log in after registration");
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <button 
          type="button"
          className="flex items-center text-nexthire-text-gray hover:text-white mb-4"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center mb-2">
            <User className="h-4 w-4 mr-2 text-nexthire-purple" />
            <label htmlFor="firstName" className="text-nexthire-text-gray">First Name</label>
          </div>
          <input
            type="text"
            id="firstName"
            className="input-field w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <User className="h-4 w-4 mr-2 text-nexthire-purple" />
            <label htmlFor="lastName" className="text-nexthire-text-gray">Last Name</label>
          </div>
          <input
            type="text"
            id="lastName"
            className="input-field w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <BookOpen className="h-4 w-4 mr-2 text-nexthire-purple" />
          <label htmlFor="skills" className="text-nexthire-text-gray">Skills</label>
        </div>
        <div className="flex">
          <input
            type="text"
            id="skills"
            className="input-field flex-grow"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a skill and press Enter"
          />
          <button
            type="button"
            className="ml-2 px-4 py-2 bg-nexthire-dark-gray text-white rounded-md hover:bg-nexthire-light-gray"
            onClick={handleAddSkill}
          >
            Add
          </button>
        </div>
        
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="bg-nexthire-purple bg-opacity-20 text-nexthire-purple px-3 py-1 rounded-full flex items-center"
              >
                {skill}
                <button
                  type="button"
                  className="ml-2 text-nexthire-purple hover:text-white focus:outline-none"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <FileText className="h-4 w-4 mr-2 text-nexthire-purple" />
          <label htmlFor="resume" className="text-nexthire-text-gray">Resume (Optional)</label>
        </div>
        <input
          type="file"
          id="resume"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
        <div className="flex items-center">
          <div className="flex-1 bg-nexthire-dark-gray bg-opacity-50 border border-nexthire-light-gray border-dashed rounded-md p-3 text-nexthire-text-gray">
            {resume ? resume.name : "No file selected"}
          </div>
          <label 
            htmlFor="resume" 
            className="ml-2 cursor-pointer bg-nexthire-dark-gray hover:bg-nexthire-light-gray text-white px-4 py-2 rounded-md"
          >
            Browse
          </label>
        </div>
        <p className="text-nexthire-text-gray text-xs mt-1">Supported formats: PDF, DOC, DOCX</p>
      </div>
      
      <div className="flex justify-end mt-6">
        <Button 
          type="submit"
          isLoading={isLoading}
        >
          Complete Registration
        </Button>
      </div>
    </form>
  );
};

export default CandidateRegistration;
