import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Card from "@/components/ui-custom/card";
import OrganizationRegistration from "@/components/registration/OrganizationRegistration";
import CandidateRegistration from "@/components/registration/CandidateRegistration";
import OTPVerification from "@/components/OTPVerification"; // Assuming you have an OTP component

export type UserRole = "CANDIDATE" | "ORGANIZATION";

const Registration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState<UserRole>("CANDIDATE");
  const [showOTP, setShowOTP] = useState(false); // State to control OTP visibility

  useEffect(() => {
    const role = searchParams.get("role");

    console.log("USE-EFFECT", role)

    if (role === "ORGANIZATION" || role === "ORGANIZATION".toLowerCase()   ) {
      setUserRole("ORGANIZATION");
    } else {
      setUserRole("CANDIDATE");
    }
  }, [searchParams]);

  const handleBack = () => {
    navigate("/auth");
  };

  const handleOTPVerification = () => {
    // Simulate OTP verification
    setShowOTP(true);
  };

  const handleOTPComplete = () => {
    // After OTP verification, show the appropriate registration form
    setShowOTP(false);
  };

  const handleSubmit = (formData: {
    firstName?: string;
    lastName?: string;
    skills?: string[];
    resume?: File;
    name?: string;
    industry?: string;
    website?: string;
    address?: string;
    description?: string;
  }) => {
    console.log("Form Data:", formData);
    toast.success("Registration successful!");
    navigate("/dashboard");
  };

  console.log("ROLE: ", userRole)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#121212]">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8 animate-fade-in">
          <div
            className="flex items-center justify-center space-x-2 mb-6 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 7L16 20.5L7 34H14L23 20.5L14 7H7Z" fill="#B967FF" />
              <path d="M26 7L35 20.5L26 34H33L42 20.5L33 7H26Z" fill="#B967FF" />
            </svg>
            <span className="text-2xl font-bold text-[#FFFFFF]">NextHire</span>
          </div>
          <h1 className="text-2xl font-bold text-[#FFFFFF] mb-2">
            {userRole === "ORGANIZATION" ? "Organization Registration" : "Candidate Registration"}
          </h1>
          <p className="text-[#ABABAB]">
            {userRole === "ORGANIZATION"
              ? "Tell us more about your organization"
              : "Tell us more about yourself"}
          </p>
        </div>

        {showOTP ? (
          <OTPVerification onComplete={handleOTPComplete} />
        ) : (
          <Card variant="glass" className="animate-slide-in shadow-xl p-6">
            {userRole === "ORGANIZATION" || userRole === "ORGANIZATION".toLowerCase()  ? (
              <OrganizationRegistration
                onSubmit={handleSubmit}
                onBack={handleBack}
              />
            ) : (
              <CandidateRegistration
                onSubmit={handleSubmit}
                onBack={handleBack}
              />
            )}
          </Card>
        )}

        <div className="text-center mt-6 animate-fade-in">
          <p className="text-[#ABABAB]">
            Already have an account?{" "}
            <button
              type="button"
              className="text-[#B967FF] hover:text-[#D4A5FF]"
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

export default Registration;