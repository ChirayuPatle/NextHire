import { useState, FC, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, User, Edit2, Check, X, Shield, Bell, Key, LifeBuoy } from "lucide-react";
import { JSX } from "react/jsx-runtime";

// Define types for profile data
interface Profile {
  username: string;
  email: string;
  profilePicture: string;
}

const ManageAccount: FC = () => {
  const navigate = useNavigate();

  // State for profile data
  const [profile, setProfile] = useState<Profile>({
    username: "JohnDoe",
    email: "john.doe@example.com",
    profilePicture: "https://via.placeholder.com/150",
  });

  // State for edit mode
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // State for form fields
  const [formData, setFormData] = useState<Profile & { password: string; confirmPassword: string }>({
    ...profile,
    password: "",
    confirmPassword: "",
  });

  // State for validation and feedback
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle profile picture upload (simulated)
  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setFormData({ ...formData, profilePicture: event.target.result as string });
          setProfile({ ...profile, profilePicture: event.target.result as string });
          setSuccessMessage("Profile picture updated successfully!");
          setTimeout(() => setSuccessMessage(""), 3000);
          setIsEditMode(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username) {
      newErrors.username = "Username is required.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call for updating profile
      setTimeout(() => {
        setProfile({ username: formData.username, email: formData.email, profilePicture: formData.profilePicture });
        setSuccessMessage("Your profile has been updated successfully!");
        setIsEditMode(false);
        setErrors({});
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen flex justify-center items-center p-6">
      {/* Manage Account Content */}
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">Manage Account</h2>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded-md mb-6 flex items-center space-x-2">
            <Check size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* View Profile */}
        {!isEditMode ? (
          <ProfileCard profile={profile} onEditClick={() => setIsEditMode(true)} />
        ) : (
          /* Edit Profile Form */
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

        {/* Additional Options */}
        <div className="mt-8 space-y-4">
          <OptionCard
            icon={<Shield size={20} />}
            title="Privacy Settings"
            description="Manage your privacy and data sharing preferences."
            onClick={() => alert("Privacy settings clicked")}
          />
          <OptionCard
            icon={<Bell size={20} />}
            title="Notification Preferences"
            description="Customize how you receive notifications."
            onClick={() => alert("Notification preferences clicked")}
          />
          <OptionCard
            icon={<Key size={20} />}
            title="Account Security"
            description="Enhance your account security with two-factor authentication."
            onClick={() => alert("Account security clicked")}
          />
          <OptionCard
            icon={<LifeBuoy size={20} />}
            title="Help & Support"
            description="Get help and support for your account."
            onClick={() => alert("Help & support clicked")}
          />
        </div>
      </div>
    </div>
  );
};

// Profile Card Component
const ProfileCard: FC<{ profile: Profile; onEditClick: () => void }> = ({ profile, onEditClick }) => (
  <div className="bg-neutral-900 p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-50">
    <div className="flex items-center space-x-6">
      <div className="relative">
        <img
          src={profile.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2"
        />
        <button
          onClick={onEditClick}
          className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition"
        >
          <Edit2 size={16} className="text-white" />
        </button>
      </div>
      <div>
        <h3 className="text-xl font-bold">{profile.username}</h3>
        <p className="text-neutral-400">{profile.email}</p>
      </div>
    </div>
  </div>
);

// Edit Form Component
const EditForm: FC<{
  formData: Profile & { password: string; confirmPassword: string };
  errors: { [key: string]: string };
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onProfilePictureChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
  isLoading: boolean;
}> = ({ formData, errors, onInputChange, onProfilePictureChange, onSubmit, onCancel, isLoading }) => (
  <form onSubmit={onSubmit} className="bg-neutral-900 p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-50 space-y-6">
    {/* Profile Picture Upload */}
    <div className="flex items-center space-x-6">
      <div className="relative">
        <img
          src={formData.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <label
          htmlFor="profilePicture"
          className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition cursor-pointer"
        >
          <Edit2 size={16} className="text-white" />
          <input
            type="file"
            id="profilePicture"
            className="hidden"
            onChange={onProfilePictureChange}
          />
        </label>
      </div>
      <div>
        <h3 className="text-xl font-bold">Update Profile Picture</h3>
        <p className="text-neutral-400">Click the icon to upload a new photo.</p>
      </div>
    </div>

    {/* Username Field */}
    <div className="relative">
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={onInputChange}
        className={`w-full bg-neutral-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 ${
          errors.username ? "focus:ring-red-500" : "focus:ring-blue-500"
        }`}
        placeholder=" "
      />
      <label className="absolute left-3 top-2 text-neutral-400 text-sm transition-all pointer-events-none">
        Username
      </label>
      {errors.username && <p className="text-red-500 text-sm mt-2">{errors.username}</p>}
    </div>

    {/* Email Field */}
    <div className="relative">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={onInputChange}
        className={`w-full bg-neutral-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 ${
          errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
        }`}
        placeholder=" "
      />
      <label className="absolute left-3 top-2 text-neutral-400 text-sm transition-all pointer-events-none">
        Email
      </label>
      {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
    </div>

    {/* Password Field */}
    <div className="relative">
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={onInputChange}
        className={`w-full bg-neutral-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 ${
          errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
        }`}
        placeholder=" "
      />
      <label className="absolute left-3 top-2 text-neutral-400 text-sm transition-all pointer-events-none">
        Password
      </label>
      {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
    </div>

    {/* Confirm Password Field */}
    <div className="relative">
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={onInputChange}
        className={`w-full bg-neutral-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 ${
          errors.confirmPassword ? "focus:ring-red-500" : "focus:ring-blue-500"
        }`}
        placeholder=" "
      />
      <label className="absolute left-3 top-2 text-neutral-400 text-sm transition-all pointer-events-none">
        Confirm Password
      </label>
      {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>}
    </div>

    {/* Buttons */}
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

// Option Card Component
const OptionCard: FC<{
  icon: JSX.Element;
  title: string;
  description: string;
  onClick: () => void;
}> = ({ icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    className="bg-neutral-900 p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-50 hover:bg-neutral-800 transition cursor-pointer"
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