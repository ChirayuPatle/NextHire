import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
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
  ArrowLeft,
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const menuItems: { key: Tab; label: string; icon: JSX.Element; path: string }[] = [
    { key: "profile", label: "Profile", icon: <User size={20} />, path: "/settings/profile" },
    // { key: "edit", label: "Edit Profile", icon: <Edit2 size={20} />, path: "/settings/edit" },
    // { key: "notifications", label: "Notifications", icon: <Bell size={20} />, path: "/settings/notifications" },
    { key: "location", label: "Location", icon: <MapPin size={20} />, path: "/location" },
    { key: "privacy", label: "Privacy", icon: <Shield size={20} />, path: "/privacy-settings" },
    // { key: "visibility", label: "Visibility", icon: <Eye size={20} />, path: "/settings/visibility" },
    // { key: "data", label: "Data Sharing", icon: <Share2 size={20} />, path: "/settings/data" },
    // { key: "activity", label: "Activity Status", icon: <Activity size={20} />, path: "/settings/activity" },
    { key: "help", label: "Help Center", icon: <LifeBuoy size={20} />, path: "/help" },
    { key: "manage", label: "Manage Account", icon: <SettingsIcon size={20} />, path: "/manage-settings" },
    // { key: "logout", label: "Logout", icon: <LogOut size={20} />, path: "/logout" },
  ];

  return (
    <div className="bg-neutral-950 text-white min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-neutral-900 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-md hover:bg-gray-700 transition"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-3xl font-bold">Settings</h2>
        </div>

        <ul className="space-y-4">
          {menuItems.map((item) => (
            <MenuItem
              key={item.key}
              item={item}
              activeTab={activeTab}
              onClick={() => {
                setActiveTab(item.key);
                navigate(item.path);
              }}
            />
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">{/* Render Content */}</div>
    </div>
  );
};

// MenuItem Component with Glow Effect
const MenuItem: FC<{
  item: { key: Tab; label: string; icon: JSX.Element; path: string };
  activeTab: Tab;
  onClick: () => void;
}> = ({ item, activeTab, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md transition-all duration-200 ${
        activeTab === item.key ? "bg-gray-700" : "hover:bg-gray-700"
      } ${isHovered ? "glow-effect" : ""}`}
    >
      {item.icon}
      <span>{item.label}</span>
    </li>
  );
};

export default Settings;

// Add this CSS in your global styles or in a CSS module
{/* <style>
  .glow-effect {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6);
    transition: box-shadow 0.3s ease-in-out;
  }
</style> */}