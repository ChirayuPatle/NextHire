import { useState } from "react";
import { Lock, Mail, User, Bell } from "lucide-react";

const Settings: React.FC = () => {
  const [username, setUsername] = useState<string>("John Doe");
  const [email, setEmail] = useState<string>("john@example.com");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [notifications, setNotifications] = useState<boolean>(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Settings:", { username, email, newPassword, notifications });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Settings</h2>

        {/* Profile Section */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold">
            JD
          </div>
          <div>
            <h3 className="text-xl font-semibold">{username}</h3>
            <p className="text-gray-400">{email}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Account Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
            <div className="relative mb-4">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                className="w-full bg-gray-700 text-white px-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                className="w-full bg-gray-700 text-white px-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Change */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Change Password</h3>
            <div className="relative mb-4">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="New Password"
                className="w-full bg-gray-700 text-white px-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-gray-700 text-white px-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Notification Toggle */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <Bell size={20} className="text-gray-400" />
              <span>Enable Notifications</span>
            </label>
            <input
              type="checkbox"
              className="w-6 h-6"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md flex items-center justify-center"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
