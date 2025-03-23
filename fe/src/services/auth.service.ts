import axios from "axios";

// Update the API URL to point to your backend port
const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export interface RegisterCandidateRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  skills: string[];
  resume?: File;
}

export interface RegisterOrgRequest {
  email: string;
  password: string;
  name: string;
  industry: string;
  website?: string;
  address?: string;
  description?: string;
}

export interface AuthResponse {
  message: string;
  user: {
    id: string;
    email: string;
    role: "CANDIDATE" | "ORGANIZATION";
  };
}

const authApi = {
  registerCandidate: async (
    data: RegisterCandidateRequest,
  ): Promise<AuthResponse> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "skills") {
        formData.append(key, JSON.stringify(value));
      } else if (key === "resume" && value) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    });

    const response = await api.post("/auth/candidate/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  registerOrg: async (data: RegisterOrgRequest): Promise<AuthResponse> => {
    const response = await api.post("/auth/organization/register", data);
    return response.data;
  },

  login: async (
    email: string,
    password: string,
    role: "candidate" | "org",
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(`/auth/${role}/login`, {
      email,
      password,
    });
    return response.data;
  },

  logout: async (role: "candidate" | "org"): Promise<void> => {
    await api.get(`/auth/${role}/logout`);
  },

  refreshToken: async (): Promise<{ accessToken: string }> => {
    const response = await api.get<{ accessToken: string }>("/auth/refresh");
    return response.data;
  },

  verifyOTP: async (email: string, otp: string): Promise<void> => {
    await api.post("/auth/verify-otp", { email, otp });
  },

  resendOTP: async (email: string): Promise<void> => {
    await api.post("/auth/resend-otp", { email });
  },
};

export { authApi };
