
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Card from "@/components/ui-custom/card";
import OrganizationRegistration from "@/components/registration/OrganizationRegistration";
import CandidateRegistration from "@/components/registration/CandidateRegistration";



export type UserRole = "CANDIDATE" | "ORGANIZATION";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  details?: Record<string, any>;
}

export interface Candidate {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  resume?: string;
  skills: string[];
  details?: Record<string, any>;
}

export interface Organization {
  id: string;
  userId: string;
  name: string;
  industry: string;
  website?: string;
  address?: string;
  description?: string;
  details?: Record<string, any>;
}



const Registration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [userRole, setUserRole] = useState<UserRole>("CANDIDATE");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const role = searchParams.get("role");
    if (role === "ORGANIZATION") {
      setUserRole("ORGANIZATION");
    } else {
      setUserRole("CANDIDATE");
    }
  }, [searchParams]);
  
  const handleInitialSubmit = (formData: { email: string; password: string }) => {
    setEmail(formData.email);
    setPassword(formData.password);
    setStep(1);
  };
  
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigate("/auth");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-nexthire-black">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8 animate-fade-in">
          <div 
            className="flex items-center justify-center space-x-2 mb-6 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 7L16 20.5L7 34H14L23 20.5L14 7H7Z" fill="#B967FF"/>
              <path d="M26 7L35 20.5L26 34H33L42 20.5L33 7H26Z" fill="#B967FF"/>
            </svg>
            <span className="text-2xl font-bold text-white">NextHire</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {step === 0 ? "Create your account" : userRole === "ORGANIZATION" ? "Complete Organization Profile" : "Complete Candidate Profile"}
          </h1>
          <p className="text-nexthire-text-gray">
            {step === 0 
              ? "Join NextHire to revolutionize your hiring process" 
              : userRole === "ORGANIZATION"
                ? "Tell us more about your organization"
                : "Tell us more about yourself"}
          </p>
        </div>
        
        <Card variant="glass" className="animate-slide-in shadow-xl">
          {step === 0 ? (
            <InitialForm 
              userRole={userRole} 
              setUserRole={setUserRole} 
              onSubmit={handleInitialSubmit}
              onBack={handleBack}
            />
          ) : userRole === "ORGANIZATION" ? (
            <OrganizationRegistration 
              email={email}
              password={password}
              onBack={handleBack}
            />
          ) : (
            <CandidateRegistration 
              email={email}
              password={password}
              onBack={handleBack}
            />
          )}
        </Card>
        
        <div className="text-center mt-6 animate-fade-in">
          <p className="text-nexthire-text-gray">
            Already have an account?{" "}
            <button 
              type="button"
              className="text-nexthire-purple hover:text-nexthire-light-purple"
              onClick={() => navigate("/auth?type=login")}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

interface InitialFormProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onSubmit: (formData: { email: string; password: string }) => void;
  onBack: () => void;
}

const InitialForm = ({ userRole, setUserRole, onSubmit, onBack }: InitialFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, you would validate the email doesn't already exist here
    setTimeout(() => {
      setIsLoading(false);
      onSubmit({ email, password });
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <div className="flex rounded-lg overflow-hidden mb-4">
          <button 
            type="button"
            className={`flex-1 py-2 text-center transition-colors ${
              userRole === "ORGANIZATION" 
                ? "bg-nexthire-purple text-white" 
                : "bg-nexthire-light-gray text-nexthire-text-gray"
            }`}
            onClick={() => setUserRole("ORGANIZATION")}
          >
            Organization
          </button>
          <button 
            type="button"
            className={`flex-1 py-2 text-center transition-colors ${
              userRole === "CANDIDATE" 
                ? "bg-nexthire-purple text-white" 
                : "bg-nexthire-light-gray text-nexthire-text-gray"
            }`}
            onClick={() => setUserRole("CANDIDATE")}
          >
            Candidate
          </button>
        </div>
        
        <p className="text-nexthire-text-gray text-sm mb-4">
          {userRole === "ORGANIZATION" 
            ? "Create an account to post jobs, conduct interviews, and find the best talent." 
            : "Create an account to apply for jobs, take interviews, and showcase your skills."}
        </p>
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-nexthire-text-gray mb-2">Email Address</label>
        <input
          type="email"
          id="email"
          className="input-field w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="password" className="block text-nexthire-text-gray mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="input-field w-full pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-nexthire-text-gray hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                <line x1="2" x2="22" y1="2" y2="22"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-nexthire-text-gray mb-2">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            className="input-field w-full pr-10"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-nexthire-text-gray hover:text-white"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                <line x1="2" x2="22" y1="2" y2="22"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-nexthire-text-gray hover:text-white"
        >
          Back
        </button>
        <button 
          type="submit" 
          className={`bg-nexthire-purple hover:bg-nexthire-dark-purple text-white px-6 py-2 rounded-md font-medium transition-all duration-300 inline-flex items-center justify-center ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </form>
  );
};

export default Registration;
