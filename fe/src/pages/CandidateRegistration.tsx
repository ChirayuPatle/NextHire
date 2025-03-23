import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi, RegisterCandidateRequest } from "../services/auth.service";

const CandidateRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterCandidateRequest>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    skills: [],
    resume: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authApi.registerCandidate(formData);
      console.log("Registration successful:", response);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkillInput = (value: string) => {
    const skillsArray = value.split(",").map(skill => skill.trim());
    setFormData(prev => ({ ...prev, skills: skillsArray }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData(prev => ({ ...prev, resume: file }));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Candidate Registration
        </h1>

        {error && (
          <div className="bg-red-500/20 text-red-500 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-neutral-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-neutral-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="First Name"
              className="w-full bg-neutral-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full bg-neutral-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Skills (comma-separated)"
              className="w-full bg-neutral-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleSkillInput(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="w-full bg-neutral-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 p-3 rounded-lg transition-all duration-200"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidateRegistration; 