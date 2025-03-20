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
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col p-8 overflow-hidden">
      {/* Header with Title */}
      <div className="w-full flex items-center space-x-3 text-white text-3xl font-bold mb-10 lg:ml-10">
        <span className="text-4xl">⚡</span>
        <h1 className="tracking-wide">NextHire</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-row justify-center items-center">
        {/* Left Side (Image) */}
        <div className="w-1/2 flex justify-center items-center lg:ml-10 h-[500px] rounded-lg overflow-hidden shadow-2xl">
          <img
            src="https://images.pexels.com/photos/3826678/pexels-photo-3826678.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side (Login Form) */}
        <div className="w-1/2 flex flex-col justify-center items-center h-[500px]">
          <div className="w-full max-w-lg border border-gray-700 rounded-xl p-10 shadow-xl bg-gray-800">
            <h2 className="text-3xl font-bold mb-4 text-center">Create an Account</h2>
            <p className="text-gray-400 mb-6 text-center">Enter your email below to get started</p>

            {/* Social Login Buttons */}
            <div className="flex space-x-4 mb-6">
              <button className="flex items-center justify-center border border-gray-600 text-white py-3 px-4 rounded-md w-1/2 hover:bg-gray-700 transition">
                <Linkedin size={20} className="mr-2" /> LinkedIn
              </button>
              <button className="flex items-center justify-center border border-gray-600 text-white py-3 px-4 rounded-md w-1/2 hover:bg-gray-700 transition">
                <Linkedin size={20} className="mr-2" /> Google
              </button>
            </div>

            <div className="my-4 text-center text-gray-500">OR</div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-gray-700 text-white pl-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-gray-700 text-white pl-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center transition shadow-md hover:shadow-lg"
              >
                <LogIn size={20} className="mr-2" /> Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;