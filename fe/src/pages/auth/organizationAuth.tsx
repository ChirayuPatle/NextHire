import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const OrganizationAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [authType, setAuthType] = useState<"login" | "register">("login");
  const [step, setStep] = useState<number>(1);
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationData>();

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "login" || type === "register") {
      setAuthType(type);
    }
  }, [searchParams]);

  const generateOTP = (): string =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const sendOTP = (email: string): void => {
    const generatedOtp = generateOTP();
    setOtp(generatedOtp);
    console.log(`OTP sent to ${email}: ${generatedOtp}`);
    toast.success("OTP sent to your email. Please check your inbox.");
  };

  interface RegistrationData {
    email?: string;
    password?: string;
    otp?: string;
  }

  const handleRegistration = async (data: RegistrationData): Promise<void> => {
    setIsLoading(true);
    if (step === 1) {
      if (!data.email || !data.password) {
        toast.error("Please fill in all required fields");
        setIsLoading(false);
        return;
      }
      setTimeout(() => {
        sendOTP(data.email!);
        setStep(2);
        setIsLoading(false);
      }, 1000);
    } else if (step === 2) {
      if (data.otp === otp) {
        toast.success("OTP verified successfully!");
        navigate("/register?role=organization");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
      setIsLoading(false);
    }
  };

  interface LoginData {
    email?: string;
    password?: string;
  }

  const handleLogin = (data: LoginData): void => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful!");
      navigate("/dashboard");
    }, 1500);
  };

  return <div className="auth-container">{/* UI elements here */}</div>;
};

export default OrganizationAuth;
