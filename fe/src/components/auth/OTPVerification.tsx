import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useOTPVerification } from '@/hooks/auth/useOTPVerification';

interface OTPVerificationProps {
  email: string;
  onVerificationComplete: () => void;
  onBack: () => void;
}

export function OTPVerification({ email, onVerificationComplete, onBack }: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const { verify, resend, isVerifying, isResending } = useOTPVerification();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResend = async () => {
    try {
      await resend(email);
      setTimeLeft(60);
      toast.success('OTP resent successfully');
    } catch (error) {
      toast.error('Failed to resend OTP');
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    try {
      await verify({ email, otp: otpString });
      onVerificationComplete();
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-center">Verify your email</h2>
        <p className="text-sm text-muted-foreground text-center">
          We've sent a verification code to {email}
        </p>
      </div>

      <div className="flex justify-center space-x-2">
        {otp.map((digit, index) => (
          <Input
            key={index}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            className="w-12 h-12 text-center text-lg"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>

      <div className="space-y-4">
        <Button
          className="w-full"
          onClick={handleVerify}
          disabled={isVerifying || otp.join('').length !== 6}
        >
          {isVerifying ? 'Verifying...' : 'Verify Email'}
        </Button>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?
          </p>
          {timeLeft > 0 ? (
            <p className="text-sm">Resend in {timeLeft}s</p>
          ) : (
            <Button
              variant="ghost"
              disabled={isResending}
              onClick={handleResend}
            >
              Resend Code
            </Button>
          )}
        </div>

        <Button
          variant="ghost"
          className="w-full"
          onClick={onBack}
        >
          Back
        </Button>
      </div>
    </Card>
  );
} 