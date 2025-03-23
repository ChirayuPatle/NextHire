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
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // State for errors

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const navigate = useNavigate();
  const handleNextStep = () => {
    if (!validateStep1()) return;
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
      navigate("/dashboard");
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
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
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
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
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
          {/* Step 2 form fields */}
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