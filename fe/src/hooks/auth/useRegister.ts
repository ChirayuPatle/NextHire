import { useMutation } from "@tanstack/react-query";
import {
  authApi,
  RegisterCandidateRequest,
  RegisterOrgRequest,
} from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useRegisterCandidate = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterCandidateRequest) =>
      authApi.registerCandidate(data),
    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};

export const useRegisterOrg = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterOrgRequest) => authApi.registerOrg(data),
    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};
