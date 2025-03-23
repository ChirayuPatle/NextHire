import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi, RegisterOrgRequest } from "../services/auth.service";

const OrganizationRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterOrgRequest>({
    email: "",
    password: "",
    name: "",
    industry: "",
    website: "",
    address: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authApi.registerOrg(formData);
      console.log("Organization registration successful:", response);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Organization Registration
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
              placeholder="Organization Name"
              className="w-full bg-neutral-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Industry"
              className="w-full bg-neutral-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.industry}
              onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
              required
            />
          </div>

          <div>
            <input
              type="url"
              placeholder="Website (optional)"
              className="w-full bg-neutral-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Address (optional)"
              className="w-full bg-neutral-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>

          <div>
            <textarea
              placeholder="Description (optional)"
              className="w-full bg-neutral-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
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

export default OrganizationRegistration; 