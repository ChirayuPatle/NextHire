import { useState, FC, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Mail,
  User,
  Edit2,
  Check,
  X,
  Shield,
  Bell,
  Key,
  LifeBuoy,
} from "lucide-react";
import { JSX } from "react/jsx-runtime";

interface Profile {
  username: string;
  email: string;
  profilePicture: string;
}

interface AccountSettings {
  privacy: {
    showOnlineStatus: boolean;
    shareActivity: boolean;
    allowTracking: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    loginAlerts: boolean;
  };
}

const ManageAccount: FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile>({
    username: "",
    email: "",
    profilePicture: "https://via.placeholder.com/150",
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<
    Profile & { password: string; confirmPassword: string }
  >({
    ...profile,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [settings, setSettings] = useState<AccountSettings>({
    privacy: {
      showOnlineStatus: true,
      shareActivity: true,
      allowTracking: false,
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
    },
  });

  const [activePanel, setActivePanel] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData({
            ...formData,
            profilePicture: event.target.result as string,
          });
          setProfile({
            ...profile,
            profilePicture: event.target.result as string,
          });
          setSuccessMessage("Profile picture updated successfully!");
          setTimeout(() => setSuccessMessage(""), 3000);
          setIsEditMode(false);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setProfile({
          username: formData.username,
          email: formData.email,
          profilePicture: formData.profilePicture,
        });
        setSuccessMessage("Profile updated successfully!");
        setIsEditMode(false);
        setErrors({});
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSettingToggle = (category: string, field: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof AccountSettings],
        [field]:
          !prev[category as keyof AccountSettings][
            field as keyof (typeof prev)[keyof AccountSettings]
          ],
      },
    }));
  };

  const handleOptionClick = (panel: string) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const renderSettingsPanel = (panel: string) => {
    if (activePanel !== panel) return null;

    const panels: Record<string, JSX.Element> = {
      privacy: (
        <div className="mt-2 p-4 bg-neutral-800 rounded-lg">
          <div className="space-y-3">
            {Object.entries(settings.privacy).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span>{key.split(/(?=[A-Z])/).join(" ")}</span>
                <ToggleSwitch
                  checked={value}
                  onChange={() => handleSettingToggle("privacy", key)}
                />
              </div>
            ))}
          </div>
        </div>
      ),
      notifications: (
        <div className="mt-2 p-4 bg-neutral-800 rounded-lg">
          <div className="space-y-3">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span>{key.split(/(?=[A-Z])/).join(" ")}</span>
                <ToggleSwitch
                  checked={value}
                  onChange={() => handleSettingToggle("notifications", key)}
                />
              </div>
            ))}
          </div>
        </div>
      ),
      security: (
        <div className="mt-2 p-4 bg-neutral-800 rounded-lg">
          <div className="space-y-3">
            {Object.entries(settings.security).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span>{key.split(/(?=[A-Z])/).join(" ")}</span>
                <ToggleSwitch
                  checked={value}
                  onChange={() => handleSettingToggle("security", key)}
                />
              </div>
            ))}
          </div>
        </div>
      ),
      support: (
        <div className="mt-2 p-4 bg-neutral-800 rounded-lg">
          <div className="space-y-3">
            {["Contact Support", "FAQ", "Report a Problem"].map((item) => (
              <button
                key={item}
                className="w-full text-left py-2 px-3 bg-neutral-700 rounded hover:bg-neutral-600"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ),
    };

    return panels[panel];
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen flex justify-center items-center p-6">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">Manage Account</h2>

        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded-md mb-6 flex items-center space-x-2">
            <Check size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        {!isEditMode ? (
          <ProfileCard
            profile={profile}
            onEditClick={() => setIsEditMode(true)}
          />
        ) : (
          <EditForm
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onProfilePictureChange={handleProfilePictureChange}
            onSubmit={handleSubmit}
            onCancel={() => setIsEditMode(false)}
            isLoading={isLoading}
          />
        )}

        <div className="mt-8 space-y-4">
          {[
            {
              icon: <Shield size={20} />,
              title: "Privacy Settings",
              panel: "privacy",
            },
            {
              icon: <Bell size={20} />,
              title: "Notification Preferences",
              panel: "notifications",
            },
            {
              icon: <Key size={20} />,
              title: "Account Security",
              panel: "security",
            },
            {
              icon: <LifeBuoy size={20} />,
              title: "Help & Support",
              panel: "support",
            },
          ].map(({ icon, title, panel }) => (
            <div key={panel}>
              <OptionCard
                icon={icon}
                title={title}
                description={`Manage your ${title.toLowerCase()}`}
                onClick={() => handleOptionClick(panel)}
                isActive={activePanel === panel}
              />
              {renderSettingsPanel(panel)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ToggleSwitch: FC<{ checked: boolean; onChange: () => void }> = ({
  checked,
  onChange,
}) => (
  <button
    type="button"
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
      checked ? "bg-blue-600" : "bg-neutral-600"
    }`}
    onClick={onChange}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

const ProfileCard: FC<{ profile: Profile; onEditClick: () => void }> = ({
  profile,
  onEditClick,
}) => (
  <div className="bg-neutral-900 p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-50">
    <div className="flex items-center space-x-6">
      <div className="relative">
        <img
          src={profile.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-neutral-700"
        />
        <button
          onClick={onEditClick}
          className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition"
        >
          <Edit2 size={16} className="text-white" />
        </button>
      </div>
      <div>
        <h3 className="text-xl font-bold">{profile.username || "Username"}</h3>
        <p className="text-neutral-400">
          {profile.email || "user@example.com"}
        </p>
      </div>
    </div>
  </div>
);

const EditForm: FC<{
  formData: Profile & { password: string; confirmPassword: string };
  errors: { [key: string]: string };
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onProfilePictureChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
  isLoading: boolean;
}> = ({
  formData,
  errors,
  onInputChange,
  onProfilePictureChange,
  onSubmit,
  onCancel,
  isLoading,
}) => (
  <form
    onSubmit={onSubmit}
    className="bg-neutral-900 p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-50 space-y-6"
  >
    <div className="flex items-center space-x-6">
      <div className="relative">
        <img
          src={formData.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-neutral-700"
        />
        <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition cursor-pointer">
          <Edit2 size={16} className="text-white" />
          <input
            type="file"
            className="hidden"
            onChange={onProfilePictureChange}
          />
        </label>
      </div>
      <div>
        <h3 className="text-xl font-bold">Profile Picture</h3>
        <p className="text-neutral-400">Click to upload new photo</p>
      </div>
    </div>

    <div className="space-y-4">
      <div>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={onInputChange}
          className={`w-full bg-neutral-800 text-white p-3 rounded-md focus:outline-none ${
            errors.username
              ? "border-red-500"
              : "focus:ring-2 focus:ring-blue-500"
          }`}
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
          className={`w-full bg-neutral-800 text-white p-3 rounded-md focus:outline-none ${
            errors.email ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
          }`}
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onInputChange}
          className={`w-full bg-neutral-800 text-white p-3 rounded-md focus:outline-none ${
            errors.password
              ? "border-red-500"
              : "focus:ring-2 focus:ring-blue-500"
          }`}
          placeholder="New Password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onInputChange}
          className={`w-full bg-neutral-800 text-white p-3 rounded-md focus:outline-none ${
            errors.confirmPassword
              ? "border-red-500"
              : "focus:ring-2 focus:ring-blue-500"
          }`}
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>
    </div>

    <div className="flex space-x-4">
      <button
        type="button"
        onClick={onCancel}
        className="w-full bg-neutral-700 text-white p-3 rounded-md hover:bg-neutral-600 transition"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-500 transition flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  </form>
);

const OptionCard: FC<{
  icon: JSX.Element;
  title: string;
  description: string;
  onClick: () => void;
  isActive?: boolean;
}> = ({ icon, title, description, onClick, isActive = false }) => (
  <div
    onClick={onClick}
    className={`bg-neutral-900 p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-50 hover:bg-neutral-800 transition cursor-pointer ${
      isActive ? "ring-2 ring-blue-500" : ""
    }`}
  >
    <div className="flex items-center space-x-4">
      <div className="bg-blue-600 p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-neutral-400">{description}</p>
      </div>
    </div>
  </div>
);

export default ManageAccount;
