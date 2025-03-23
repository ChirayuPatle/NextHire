import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfileCard = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const toggleCard = () => {
    setIsCardVisible(!isCardVisible);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100 p-8">
      {/* Toggle Button */}
      <button
        onClick={toggleCard}
        className="fixed top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isCardVisible ? "Hide Profile" : "Show Profile"}
      </button>

      {/* Profile Card */}
      {isCardVisible && (
        <div className="fixed top-16 left-8 bg-gray-800 rounded-lg shadow-lg w-80 overflow-hidden">
          {/* Card Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/50" // Replace with user image URL
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-100">John Doe</h2>
                <p className="text-sm text-gray-400">john.doe@example.com</p>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            <p className="text-sm text-gray-400">
              This is a brief description of the user's profile. You can add more details here if needed.
            </p>
          </div>

          {/* Card Footer */}
          <div className="p-4 bg-gray-750">
            <button
              onClick={() => navigate("/create-profile")} // Use navigate for redirection
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;