import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const CandidateAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [authType, setAuthType] = useState("login");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "login" || type === "register") {
      setAuthType(type);
    }
  }, [searchParams]);

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
  
  const sendOTP = (email:string) => {
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
            navigate("/register?role=candidate");
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

  return (
    <div className="auth-container">{/* UI elements here */}</div>
  );
};

export default CandidateAuth;
