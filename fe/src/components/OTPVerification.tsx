import { useState } from "react";
import Button from "@/components/ui-custom/button";

const OTPVerification = ({ onComplete }: { onComplete: () => void }) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="otp" className="block text-[#ABABAB] mb-2">
          Enter OTP
        </label>
        <input
          type="text"
          id="otp"
          className="w-full bg-[#2F2F2F] border border-[#2F2F2F] text-[#FFFFFF] rounded-md px-3 py-2"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
      </div>
      <Button type="submit" isLoading={isLoading}>
        Verify OTP
      </Button>
    </form>
  );
};

export default OTPVerification;