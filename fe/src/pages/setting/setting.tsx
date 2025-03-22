import { useState, FC, FormEvent } from "react";
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
    { key: "edit", label: "Edit Profile", icon: <Edit2 size={20} />, path: "/settings/edit" },
    { key: "location", label: "Location", icon: <MapPin size={20} />, path: "/settings/location" },
    { key: "notifications", label: "Notifications", icon: <Bell size={20} />, path: "/settings/notifications" },
    { key: "privacy", label: "Privacy", icon: <Shield size={20} />, path: "/settings/privacy" },
    { key: "visibility", label: "Visibility", icon: <Eye size={20} />, path: "/settings/visibility" },
    { key: "data", label: "Data Sharing", icon: <Share2 size={20} />, path: "/settings/data" },
    { key: "activity", label: "Activity Status", icon: <Activity size={20} />, path: "/settings/activity" },
    { key: "help", label: "Help Center", icon: <LifeBuoy size={20} />, path: "/settings/help" },
    { key: "manage", label: "Manage Account", icon: <SettingsIcon size={20} />, path: "/settings/manage" },
    { key: "logout", label: "Logout", icon: <LogOut size={20} />, path: "/logout" },
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
            <li
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                navigate(item.path);
              }}
              className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-700 transition ${
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
      <div className="flex-1 p-6">{/* Render Content */}</div>
    </div>
  );
};

export default Settings;
