import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";

interface VerifyOTPParams {
  email: string;
  otp: string;
}

export function useOTPVerification() {
  const verifyMutation = useMutation({
    mutationFn: (params: VerifyOTPParams) =>
      authService.verifyOTP(params.email, params.otp),
  });

  const resendMutation = useMutation({
    mutationFn: (email: string) => authService.resendOTP(email),
  });

  return {
    verify: verifyMutation.mutateAsync,
    resend: resendMutation.mutateAsync,
    isVerifying: verifyMutation.isPending,
    isResending: resendMutation.isPending,
  };
}
