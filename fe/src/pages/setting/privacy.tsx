import { useState } from "react";
import Switch from "@/components/ui/switch";
import { ShieldCheck, EyeOff, User, Globe, Lock } from "lucide-react";

const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    profileVisibility: true,
    searchEngineIndexing: false,
    twoFactorAuth: true,
    dataSharing: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-100 p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
          Privacy Settings
        </h1>

        {/* Settings Group: Account Privacy */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-200 mb-6 flex items-center space-x-3">
            <User className="text-white" size={24} />
            <span>Account Privacy</span>
          </h2>
          <div className="space-y-4">
            <SettingItem
              icon={<User size={20} className="text-white" />}
              title="Profile Visibility"
              description="Control who can see your profile information."
              isEnabled={settings.profileVisibility}
              toggle={() => toggleSetting("profileVisibility")}
            />
            <SettingItem
              icon={<Globe size={20} className="text-white" />}
              title="Search Engine Indexing"
              description="Allow search engines to index your profile."
              isEnabled={settings.searchEngineIndexing}
              toggle={() => toggleSetting("searchEngineIndexing")}
            />
          </div>
        </div>

        {/* Settings Group: Security */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-200 mb-6 flex items-center space-x-3">
            <ShieldCheck className="text-white" size={24} />
            <span>Security</span>
          </h2>
          <div className="space-y-4">
            <SettingItem
              icon={<ShieldCheck size={20} className="text-white" />}
              title="Two-Factor Authentication"
              description="Enhance security by requiring an additional authentication step."
              isEnabled={settings.twoFactorAuth}
              toggle={() => toggleSetting("twoFactorAuth")}
            />
          </div>
        </div>

        {/* Settings Group: Data & Privacy */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-200 mb-6 flex items-center space-x-3">
            <EyeOff className="text-white" size={24} />
            <span>Data & Privacy</span>
          </h2>
          <div className="space-y-4">
            <SettingItem
              icon={<EyeOff size={20} className="text-white" />}
              title="Data Sharing"
              description="Choose whether to share your data with third parties."
              isEnabled={settings.dataSharing}
              toggle={() => toggleSetting("dataSharing")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// SettingItem Component
const SettingItem = ({ icon, title, description, isEnabled, toggle }: any) => {
  return (
    <div
      className="flex items-center justify-between p-6 border-[1px] bg-neutral-800 rounded-lg hover:bg-gray-750 transition-colors duration-200 cursor-pointer"
      onClick={toggle}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => e.key === "Enter" && toggle()}
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <Switch checked={isEnabled} onChange={toggle} />
    </div>
  );
};

export default PrivacySettings;