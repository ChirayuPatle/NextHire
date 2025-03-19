import { useState } from "react";
import { Mail, Lock, Linkedin, LogIn } from "lucide-react";

const Login: React.FC = () => {
  // State for email and password
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Left Part (Image) */}
      <div className="md:w-1/2 hidden md:flex items-center justify-center">
        <img
          src="https://images.pexels.com/photos/3826678/pexels-photo-3826678.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Part (Login Form) */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-8">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-2">Create an account</h2>
          <p className="text-gray-400 mb-6">Enter your email below to create your account</p>

          {/* Social Login Buttons */}
          <div className="flex space-x-4">
            <button className="flex items-center justify-center border-2 text-white py-2 px-4 rounded-md w-1/2">
              <Linkedin size={20} className="mr-2" /> LinkedIn
            </button>
            <button className="flex items-center justify-center border-2 text-white py-2 px-4 rounded-md w-1/2">
              <Linkedin size={20} className="mr-2" /> Google
            </button>
          </div>

          <div className="my-6 text-center text-gray-500">OR</div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-gray-800 text-white px-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-gray-800 text-white px-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md flex items-center justify-center"
            >
              <LogIn size={20} className="mr-2" /> Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
