import { useState, FC, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  Linkedin,
  Twitter,
  Github,
  Shield,
  Info,
  Plus,
  Check,
} from "lucide-react";

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
  privacySettings: string;
}

const CreateProfile: FC = () => {
  const navigate = useNavigate();
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
    privacySettings: "public",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ): void => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleProfilePictureChange = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setFormData({
            ...formData,
            profilePicture: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required.";
    if (!formData.username) newErrors.username = "Username is required.";
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

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (validateForm()) {
      setTimeout(() => {
        setSuccessMessage("Profile created successfully!");
        navigate("/profile");
      }, 1000);
    }
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen flex justify-center items-start p-6">
      <div className="w-full max-w-3xl bg-neutral-900 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Your Profile</h1>
          <p className="text-neutral-400">
            Fill in your details to get started
          </p>
        </div>

        {successMessage && (
          <div className="bg-green-600 text-white p-4 rounded-lg mb-6 flex items-center justify-center space-x-2">
            <Check size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <img
                src={formData.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-neutral-700 group-hover:border-blue-500 transition-all"
              />
              <label
                htmlFor="profilePicture"
                className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition cursor-pointer shadow-lg flex items-center justify-center w-8 h-8"
              >
                <Plus size={16} className="text-white" />
                <input
                  type="file"
                  id="profilePicture"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
              </label>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              icon={<User size={20} className="text-blue-400" />}
              type="text"
              name="fullName"
              label="Full Name"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleInputChange}
              error={errors.fullName}
            />
            <FormField
              icon={<User size={20} className="text-blue-400" />}
              type="text"
              name="username"
              label="Username"
              placeholder="johndoe123"
              value={formData.username}
              onChange={handleInputChange}
              error={errors.username}
            />
            <FormField
              icon={<Mail size={20} className="text-blue-400" />}
              type="email"
              name="email"
              label="Email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <FormField
              icon={<Lock size={20} className="text-blue-400" />}
              type="password"
              name="password"
              label="Password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
            />
            <FormField
              icon={<Lock size={20} className="text-blue-400" />}
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
            />
          </div>

          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              icon={<Phone size={20} className="text-blue-400" />}
              type="tel"
              name="phone"
              label="Phone Number"
              placeholder="+1 (123) 456-7890"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <FormField
              icon={<Calendar size={20} className="text-blue-400" />}
              type="date"
              name="dateOfBirth"
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
            <FormField
              icon={<User size={20} className="text-blue-400" />}
              type="select"
              name="gender"
              label="Gender"
              value={formData.gender}
              onChange={handleInputChange}
              options={[
                { value: "", label: "Select Gender" },
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />
            <FormField
              icon={<MapPin size={20} className="text-blue-400" />}
              type="text"
              name="address"
              label="Address"
              placeholder="123 Main St, City"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          {/* Professional Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              icon={<Briefcase size={20} className="text-blue-400" />}
              type="text"
              name="jobTitle"
              label="Job Title"
              placeholder="Software Engineer"
              value={formData.jobTitle}
              onChange={handleInputChange}
            />
            <FormField
              icon={<Briefcase size={20} className="text-blue-400" />}
              type="text"
              name="company"
              label="Company"
              placeholder="Tech Corp Inc."
              value={formData.company}
              onChange={handleInputChange}
            />
            <FormField
              icon={<Briefcase size={20} className="text-blue-400" />}
              type="text"
              name="industry"
              label="Industry"
              placeholder="Information Technology"
              value={formData.industry}
              onChange={handleInputChange}
            />
            <FormField
              icon={<Briefcase size={20} className="text-blue-400" />}
              type="text"
              name="skills"
              label="Skills"
              placeholder="JavaScript, React, Node.js"
              value={formData.skills}
              onChange={handleInputChange}
            />
          </div>

          {/* Bio */}
          <FormField
            icon={<Info size={20} className="text-blue-400" />}
            type="textarea"
            name="bio"
            label="Bio"
            placeholder="Tell us about yourself..."
            value={formData.bio}
            onChange={handleInputChange}
          />

          {/* Social Media */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              icon={<Linkedin size={20} className="text-blue-400" />}
              type="text"
              name="linkedin"
              label="LinkedIn"
              placeholder="linkedin.com/in/username"
              value={formData.linkedin}
              onChange={handleInputChange}
            />
            <FormField
              icon={<Twitter size={20} className="text-blue-400" />}
              type="text"
              name="twitter"
              label="Twitter"
              placeholder="twitter.com/username"
              value={formData.twitter}
              onChange={handleInputChange}
            />
            <FormField
              icon={<Github size={20} className="text-blue-400" />}
              type="text"
              name="github"
              label="GitHub"
              placeholder="github.com/username"
              value={formData.github}
              onChange={handleInputChange}
            />
          </div>

          {/* Privacy Settings */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              icon={<Shield size={20} className="text-blue-400" />}
              type="select"
              name="privacySettings"
              label="Privacy Settings"
              value={formData.privacySettings}
              onChange={handleInputChange}
              options={[
                { value: "public", label: "Public" },
                { value: "private", label: "Private" },
              ]}
            />
          </div>

          {/* Form Actions */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 bg-neutral-700 text-white py-3 rounded-lg hover:bg-neutral-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FormField: FC<{
  icon: JSX.Element;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string | boolean;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  error?: string;
  options?: { value: string; label: string }[];
}> = ({
  icon,
  type,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  options,
}) => (
  <div className="space-y-2">
    <label className="flex items-center space-x-2 text-neutral-300">
      {icon}
      <span>{label}</span>
    </label>

    {type === "textarea" ? (
      <textarea
        name={name}
        value={value as string}
        onChange={onChange}
        className="w-full bg-neutral-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder={placeholder}
        rows={4}
      />
    ) : type === "select" ? (
      <select
        name={name}
        value={value as string}
        onChange={onChange}
        className="w-full bg-neutral-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value as string}
        onChange={onChange}
        className={`w-full bg-neutral-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          error ? "border border-red-500" : ""
        }`}
        placeholder={placeholder}
      />
    )}

    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default CreateProfile;
