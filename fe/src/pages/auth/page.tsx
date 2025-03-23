import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [authType, setAuthType] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"organization" | "candidate">("organization");
  const [step, setStep] = useState(1); // 1: Registration, 2: OTP Verification
  const [otp, setOtp] = useState(""); // Generated OTP
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const type = searchParams.get("type");
    const userRole = searchParams.get("role");

    if (type === "login" || type === "register") {
      setAuthType(type);
    }

    if (userRole === "organization" || userRole === "candidate") {
      setRole(userRole);
    }
  }, [searchParams]);

  const toggleAuthType = () => {
    setAuthType(authType === "login" ? "register" : "login");
    setStep(1);
  };

  const toggleRole = (newRole: "organization" | "candidate") => {
    setRole(newRole);
  };

  // Generate a random 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Simulate sending OTP to the user's email
  const sendOTP = (email: string) => {
    const otp = generateOTP();
    setOtp(otp); // Store the OTP for verification
    console.log(`OTP sent to ${email}: ${otp}`); // Simulate sending OTP
    toast.success("OTP sent to your email. Please check your inbox.");
  };

 const handleRegistration = async (data: any) => {
  setIsLoading(true);

  if (step === 1) {
    // Validate registration form
    if (!data.email || !data.password || !data.confirmPassword) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (data.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    // Simulate an API call to send OTP
    setTimeout(() => {
      sendOTP(data.email);
      setStep(2); // Move to OTP verification step
      setIsLoading(false);
    }, 1000);
  } else if (step === 2) {
    // Verify OTP
    if (data.otp === otp) {
      toast.success("OTP verified successfully!");
      navigate(`/register?role=${role}`); // Navigate to registration page with role
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
    setIsLoading(false);
  }
};

  // Handle login form submission
  const handleLogin = (data: any) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful!");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4 bg-[#121212]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div
            className="flex items-center justify-center space-x-2 mb-6 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 7L16 20.5L7 34H14L23 20.5L14 7H7Z" fill="#B967FF" />
              <path d="M26 7L35 20.5L26 34H33L42 20.5L33 7H26Z" fill="#B967FF" />
            </svg>
            <span className="text-2xl font-bold text-white">NextHire</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {authType === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-[#ABABAB]">
            {authType === "login"
              ? "Sign in to access your account"
              : "Join NextHire to revolutionize your hiring process"}
          </p>
        </div>

        <div className="bg-[#252525] rounded-lg p-6 shadow-xl animate-slide-in">
          {authType === "register" && step === 1 && (
            <div className="mb-6">
              <div className="flex rounded-lg overflow-hidden mb-4">
                <button
                  className={`flex-1 py-2 text-center transition-colors ${
                    role === "organization"
                      ? "bg-[#B967FF] text-white"
                      : "bg-[#2F2F2F] text-[#ABABAB]"
                  }`}
                  onClick={() => toggleRole("organization")}
                >
                  Organization
                </button>
                <button
                  className={`flex-1 py-2 text-center transition-colors ${
                    role === "candidate"
                      ? "bg-[#B967FF] text-white"
                      : "bg-[#2F2F2F] text-[#ABABAB]"
                  }`}
                  onClick={() => toggleRole("candidate")}
                >
                  Candidate
                </button>
              </div>

              <p className="text-[#ABABAB] text-sm mb-4">
                {role === "organization"
                  ? "Create an account to post jobs, conduct interviews, and find the best talent."
                  : "Create an account to apply for jobs, take interviews, and showcase your skills."}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(authType === "login" ? handleLogin : handleRegistration)}>
            {authType === "register" && step === 2 ? (
              <>
                <div className="mb-6">
                  <button
                    type="button"
                    className="flex items-center text-[#ABABAB] hover:text-white mb-4"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                  </button>

                  <h2 className="text-lg font-semibold text-white mb-4">Verify Your Email</h2>
                  <p className="text-[#ABABAB] text-sm mb-4">
                    We've sent a 6-digit OTP to your email. Please enter it below.
                  </p>
                </div>

                <div className="mb-4">
                  <label htmlFor="otp" className="block text-[#ABABAB] mb-2">OTP</label>
                  <input
                    type="text"
                    id="otp"
                    className="w-full p-2 rounded-lg bg-[#2F2F2F] text-white border border-[#2F2F2F] focus:outline-none focus:border-[#B967FF]"
                    {...register("otp", { required: "OTP is required" })}
                  />
                  {errors.otp && (
                    <p className="text-red-500 text-sm mt-1">{errors.otp?.message as string}</p>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full p-3 rounded-lg bg-[#B967FF] text-white font-semibold hover:bg-[#8344B8] transition-colors flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-[#ABABAB] mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 rounded-lg bg-[#2F2F2F] text-white border border-[#2F2F2F] focus:outline-none focus:border-[#B967FF]"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email?.message as string}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-[#ABABAB] mb-2">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      className="w-full p-2 rounded-lg bg-[#2F2F2F] text-white border border-[#2F2F2F] focus:outline-none focus:border-[#B967FF] pr-10"
                      {...register("password", { required: "Password is required" })}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password?.message as string}</p>
                  )}
                </div>

                {authType === "register" && (
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-[#ABABAB] mb-2">Confirm Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        id="confirmPassword"
                        className="w-full p-2 rounded-lg bg-[#2F2F2F] text-white border border-[#2F2F2F] focus:outline-none focus:border-[#B967FF] pr-10"
                        {...register("confirmPassword", { required: "Confirm Password is required" })}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message as string}</p>
                    )}
                  </div>
                )}

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full p-3 rounded-lg bg-[#B967FF] text-white font-semibold hover:bg-[#8344B8] transition-colors flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      authType === "login" ? "Sign In" : "Continue"
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        <div className="text-center mt-6 animate-fade-in">
          <p className="text-[#ABABAB]">
            {authType === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              className="text-[#B967FF] hover:text-[#D4A5FF]"
              onClick={toggleAuthType}
            > 
              {authType === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;