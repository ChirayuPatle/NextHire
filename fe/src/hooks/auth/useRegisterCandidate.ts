import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import authService, {
  type CandidateRegistrationData,
} from "@/services/auth.service";
import { useAuth } from "@/hooks/auth/useAuth";

export const useRegisterCandidate = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: (data: CandidateRegistrationData) =>
      authService.registerCandidate(data),
    onSuccess: (response) => {
      // Set auth state
      setUser({
        id: response.user.id,
        email: response.user.email,
        role: "CANDIDATE",
      });

      // Store tokens in secure httpOnly cookies (handled by backend)

      // Store user data in localStorage
      localStorage.setItem("userRole", "CANDIDATE");
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: response.user.id,
          email: response.user.email,
          role: "CANDIDATE",
        }),
      );

      toast.success("Registration successful!");
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Registration failed. Please try again.");
    },
  });
};
