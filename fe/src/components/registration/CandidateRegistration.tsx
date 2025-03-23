import { useState } from "react";
import { toast } from "sonner";
import Button from "@/components/ui-custom/button";
import { ArrowLeft, User, BookOpen, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CandidateRegistrationProps {
  onSubmit: (formData: {
    firstName: string;
    lastName: string;
    skills: string[];
    resume?: File;
  }) => void;
  onBack: () => void;
}

const CandidateRegistration = ({ onSubmit, onBack }: CandidateRegistrationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

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
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleNextStep = () => {
    if (!firstName || !lastName) {
      toast.error("Please fill in all required fields");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (skills.length === 0) {
      toast.error("Please add at least one skill");
      return;
    }

    setIsLoading(true);

    try {
      onSubmit({
        firstName,
        lastName,
        skills,
        resume: resume || undefined,
      });
      toast.success("Registration successful!");
      navigate("/dashboard"); // Redirect to dashboard after successful registration
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="text-white" onSubmit={handleSubmit}>
      <div className="mb-6">
        <button
          type="button"
          className="flex items-center text-[#ABABAB] hover:text-[#FFFFFF] mb-4"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
      </div>

      {step === 1 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex items-center mb-2">
                <User className="h-4 w-4 mr-2 text-[#B967FF]" />
                <label htmlFor="firstName" className="text-[#ABABAB]">
                  First Name
                </label>
              </div>
              <input
                type="text"
                id="firstName"
                className="w-full bg-[#2F2F2F] border border-[#2F2F2F] text-[#FFFFFF] rounded-md px-3 py-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex items-center mb-2">
                <User className="h-4 w-4 mr-2 text-[#B967FF]" />
                <label htmlFor="lastName" className="text-[#ABABAB]">
                  Last Name
                </label>
              </div>
              <input
                type="text"
                id="lastName"
                className="w-full bg-[#2F2F2F] border border-[#2F2F2F] text-[#FFFFFF] rounded-md px-3 py-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button type="button" onClick={handleNextStep}>
              Next
            </Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <BookOpen className="h-4 w-4 mr-2 text-[#B967FF]" />
              <label htmlFor="skills" className="text-[#ABABAB]">
                Skills
              </label>
            </div>
            <div className="flex">
              <input
                type="text"
                id="skills"
                className="flex-grow bg-[#2F2F2F] border border-[#2F2F2F] text-[#FFFFFF] rounded-md px-3 py-2"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a skill and press Enter"
              />
              <button
                type="button"
                className="ml-2 px-4 py-2 bg-[#2F2F2F] text-[#FFFFFF] rounded-md hover:bg-[#252525]"
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
                    className="bg-[#8344B8] bg-opacity-20 text-[#B967FF] px-3 py-1 rounded-full flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      className="ml-2 text-[#B967FF] hover:text-[#FFFFFF] focus:outline-none"
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
              <FileText className="h-4 w-4 mr-2 text-[#B967FF]" />
              <label htmlFor="resume" className="text-[#ABABAB]">
                Resume (Optional)
              </label>
            </div>
            <input
              type="file"
              id="resume"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <div className="flex items-center">
              <div className="flex-1 bg-[#2F2F2F] bg-opacity-50 border border-[#2F2F2F] border-dashed rounded-md p-3 text-[#ABABAB]">
                {resume ? resume.name : "No file selected"}
              </div>
              <label
                htmlFor="resume"
                className="ml-2 cursor-pointer bg-[#2F2F2F] hover:bg-[#252525] text-[#FFFFFF] px-4 py-2 rounded-md"
              >
                Browse
              </label>
            </div>
            <p className="text-[#ABABAB] text-xs mt-1">Supported formats: PDF, DOC, DOCX</p>
          </div>

          <div className="flex justify-end mt-6">
            <Button type="button" onClick={() => setStep(1)} className="mr-2">
              Previous
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Complete Registration
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default CandidateRegistration;