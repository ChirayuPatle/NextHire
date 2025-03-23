import React, { useState, FC, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, Calendar, MapPin, Briefcase, Linkedin, Twitter, Github, Bell, Shield, Info, Edit2, Check } from "lucide-react";

// Define types for profile data
interface Profile {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture: string;
  bio: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  jobTitle: string;
  company: string;
  industry: string;
  skills: string;
  linkedin: string;
  twitter: string;
  github: string;
  notificationsEnabled: boolean;
  privacySettings: string;
}

const CreateProfile: FC = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState<Profile>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: "https://via.placeholder.com/150",
    bio: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    jobTitle: "",
    company: "",
    industry: "",
    skills: "",
    linkedin: "",
    twitter: "",
    github: "",
    notificationsEnabled: true,
    privacySettings: "public",
  });

  // State for validation and feedback
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle profile picture upload (simulated)
  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setFormData({ ...formData, profilePicture: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required.";
    }

    if (!formData.username) {
      newErrors.username = "Username is required.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate API call for creating profile
      setTimeout(() => {
        setSuccessMessage("Profile created successfully!");
        navigate("/profile"); // Redirect to profile page
      }, 1000);
    }
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-neutral-900 p-8 rounded-lg shadow-lg backdrop-blur-md bg-opacity-50">
        <h2 className="text-2xl font-bold mb-6">Create Your Profile</h2>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded-md mb-6 flex items-center space-x-2">
            <Check size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Profile Creation Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={formData.profilePicture}
                alt="Profile"
                className="w-24 h-24 border-2 rounded-full object-cover"
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
                  onChange={handleProfilePictureChange}
                />
              </label>
            </div>
            <div>
              <h3 className="text-xl font-bold">Upload Profile Picture</h3>
              <p className="text-neutral-400">Click the icon to upload a photo.</p>
            </div>
          </div>

          {/* Full Name */}
          <FormField
            icon={<User size={20} />}
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />

          {/* Username */}
          <FormField
            icon={<User size={20} />}
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            error={errors.username}
          />

          {/* Email */}
          <FormField
            icon={<Mail size={20} />}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
          />

          {/* Password */}
          <FormField
            icon={<Lock size={20} />}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
          />

          {/* Confirm Password */}
          <FormField
            icon={<Lock size={20} />}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
          />

          {/* Bio */}
          <FormField
            icon={<Info size={20} />}
            type="textarea"
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleInputChange}
          />

          {/* Phone Number */}
          <FormField
            icon={<Phone size={20} />}
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
          />

          {/* Date of Birth */}
          <FormField
            icon={<Calendar size={20} />}
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />

          {/* Gender */}
          <FormField
            icon={<User size={20} />}
            type="select"
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select Gender" },
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />

          {/* Address */}
          <FormField
            icon={<MapPin size={20} />}
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
          />

          {/* Job Title */}
          <FormField
            icon={<Briefcase size={20} />}
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleInputChange}
          />

          {/* Company */}
          <FormField
            icon={<Briefcase size={20} />}
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleInputChange}
          />

          {/* Industry */}
          <FormField
            icon={<Briefcase size={20} />}
            type="text"
            name="industry"
            placeholder="Industry"
            value={formData.industry}
            onChange={handleInputChange}
          />

          {/* Skills */}
          <FormField
            icon={<Briefcase size={20} />}
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={formData.skills}
            onChange={handleInputChange}
          />

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Social Media Links</h3>
            <FormField
              icon={<Linkedin size={20} />}
              type="text"
              name="linkedin"
              placeholder="LinkedIn Profile"
              value={formData.linkedin}
              onChange={handleInputChange}
            />
            <FormField
              icon={<Twitter size={20} />}
              type="text"
              name="twitter"
              placeholder="Twitter Profile"
              value={formData.twitter}
              onChange={handleInputChange}
            />
            <FormField
              icon={<Github size={20} />}
              type="text"
              name="github"
              placeholder="GitHub Profile"
              value={formData.github}
              onChange={handleInputChange}
            />
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Preferences</h3>
            <FormField
              icon={<Bell size={20} />}
              type="checkbox"
              name="notificationsEnabled"
              label="Enable Notifications"
              value={formData.notificationsEnabled}
              onChange={handleInputChange}
            />
            <FormField
              icon={<Shield size={20} />}
              type="select"
              name="privacySettings"
              placeholder="Privacy Settings"
              value={formData.privacySettings}
              onChange={handleInputChange}
              options={[
                { value: "public", label: "Public" },
                { value: "private", label: "Private" },
              ]}
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full bg-neutral-700 text-white p-3 rounded-md hover:bg-neutral-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-500 transition"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Form Field Component
const FormField: FC<{
  icon: JSX.Element;
  type: string;
  name: string;
  placeholder?: string;
  value: string | boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  options?: { value: string; label: string }[];
  label?: string;
}> = ({ icon, type, name, placeholder, value, onChange, error, options, label }) => (
  <div className="relative">
    <div className="flex items-center space-x-3">
      <div className="text-neutral-400">{icon}</div>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value as string}
          onChange={onChange}
          className={`w-full bg-neutral-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
          placeholder={placeholder}
          rows={4}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value as string}
          onChange={onChange}
          className={`w-full bg-neutral-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "checkbox" ? (
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name={name}
            checked={value as boolean}
            onChange={onChange}
            className="w-5 h-5 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-neutral-400">{label}</span>
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value as string}
          onChange={onChange}
          className={`w-full bg-neutral-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
          placeholder={placeholder}
        />
      )}
    </div>
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
  </div>
);

export default CreateProfile;
