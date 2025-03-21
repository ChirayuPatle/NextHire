import { useState, FC, FormEvent } from "react";
import {
  Lock,
  Mail,
  User,
  Bell,
  MapPin,
  Shield,
  Eye,
  Share2,
  Activity,
  LifeBuoy,
  Settings as SettingsIcon,
  LogOut,
  Edit2,
} from "lucide-react";
import { JSX } from "react/jsx-runtime";

type Tab =
  | "profile"
  | "edit"
  | "location"
  | "notifications"
  | "privacy"
  | "visibility"
  | "data"
  | "activity"
  | "help"
  | "manage"
  | "logout";

const Settings: FC = () => {
  // Profile and account states
  const [username, setUsername] = useState<string>("John Doe");
  const [email, setEmail] = useState<string>("john@example.com");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [location, setLocation] = useState<string>("New York, USA");

  // Notification states
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);

  // Active tab state
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    console.log("Updated Settings:", {
      username,
      email,
      newPassword,
      location,
      pushNotifications,
      emailNotifications,
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold">
                {username.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{username}</h3>
                <p className="text-gray-400">{email}</p>
              </div>
            </div>
          </div>
        );
      case "edit":
        return (
          <form onSubmit={handleSave} className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
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
            {/* Password change section */}
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
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md flex items-center justify-center"
            >
              Save Changes
            </button>
          </form>
        );
      case "location":
        return (
          <form onSubmit={handleSave} className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <div className="relative mb-4">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                className="w-full bg-gray-700 text-white px-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md flex items-center justify-center"
            >
              Save Location
            </button>
          </form>
        );
      case "notifications":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Notification Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Push Notifications</span>
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  checked={pushNotifications}
                  onChange={() => setPushNotifications(!pushNotifications)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                />
              </div>
            </div>
          </div>
        );
      case "privacy":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Privacy</h2>
            <p className="text-gray-400">Privacy settings go here.</p>
          </div>
        );
      case "visibility":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Visibility</h2>
            <p className="text-gray-400">Visibility options go here.</p>
          </div>
        );
      case "data":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Data Sharing</h2>
            <p className="text-gray-400">Manage your data sharing preferences here.</p>
          </div>
        );
      case "activity":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Activity Status</h2>
            <p className="text-gray-400">Activity status settings go here.</p>
          </div>
        );
      case "help":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Help Center</h2>
            <p className="text-gray-400">Help and support information can be found here.</p>
          </div>
        );
      case "manage":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Manage Account</h2>
            <p className="text-gray-400">Account management options go here.</p>
          </div>
        );
      case "logout":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Logout</h2>
            <p className="text-gray-400">Are you sure you want to logout?</p>
            <button
              onClick={() => console.log("Logging out...")}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md flex items-center justify-center mt-4"
            >
              Confirm Logout
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  // Sidebar items in a typical commercial order
  const menuItems: { key: Tab; label: string; icon: JSX.Element }[] = [
    { key: "profile", label: "Profile", icon: <User size={20} /> },
    { key: "edit", label: "Edit Profile", icon: <Edit2 size={20} /> },
    { key: "location", label: "Location", icon: <MapPin size={20} /> },
    { key: "notifications", label: "Notifications", icon: <Bell size={20} /> },
    { key: "privacy", label: "Privacy", icon: <Shield size={20} /> },
    { key: "visibility", label: "Visibility", icon: <Eye size={20} /> },
    { key: "data", label: "Data Sharing", icon: <Share2 size={20} /> },
    { key: "activity", label: "Activity Status", icon: <Activity size={20} /> },
    { key: "help", label: "Help Center", icon: <LifeBuoy size={20} /> },
    { key: "manage", label: "Manage Account", icon: <SettingsIcon size={20} /> },
    { key: "logout", label: "Logout", icon: <LogOut size={20} /> },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6">
        <h2 className="text-3xl font-bold mb-6">Settings</h2>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-700 ${
                activeTab === item.key ? "bg-gray-700" : ""
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};

export default Settings;
