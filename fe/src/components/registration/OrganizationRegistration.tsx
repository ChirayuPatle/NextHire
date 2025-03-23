import { useState } from "react";
import { toast } from "sonner";
import Button from "@/components/ui-custom/button";
import { ArrowLeft, BuildingIcon, Globe, MapPin, FileText } from "lucide-react";

interface OrganizationRegistrationProps {
  onSubmit: (formData: {
    name: string;
    industry: string;
    website?: string;
    address: string;
    description?: string;
  }) => void;
  onBack: () => void;
}

const OrganizationRegistration = ({ onSubmit, onBack }: OrganizationRegistrationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // State for errors

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = "Organization name is required";
    if (!industry) newErrors.industry = "Industry is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (!validateStep1()) return;
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      toast.error("Address is required");
      return;
    }

    setIsLoading(true);

    try {
      onSubmit({
        name,
        industry,
        website,
        address,
        description,
      });
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="text-white" onSubmit={handleSubmit}>
      <div className="mb-6">
        <button
          type="button"
          className="flex items-center text-[#ABABAB] hover:text-[#FFFFFF] mb-4"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
      </div>

      {step === 1 && (
        <>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <BuildingIcon className="h-4 w-4 mr-2 text-[#B967FF]" />
              <label htmlFor="name" className="text-[#ABABAB]">
                Organization Name
              </label>
            </div>
            <input
              type="text"
              id="name"
              className="w-full bg-[#2F2F2F] border border-[#2F2F2F] text-[#FFFFFF] rounded-md px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Acme Corporation"
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="industry" className="block text-[#ABABAB] mb-2">
              Industry
            </label>
            <select
              id="industry"
              className="w-full bg-[#2F2F2F] border border-[#2F2F2F] text-[#FFFFFF] rounded-md px-3 py-2"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            >
              <option value="">Select an industry</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Retail">Retail</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Media">Media</option>
              <option value="Consulting">Consulting</option>
              <option value="Other">Other</option>
            </select>
            {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Globe className="h-4 w-4 mr-2 text-[#B967FF]" />
              <label htmlFor="website" className="text-[#ABABAB]">
                Website (Optional)
              </label>
            </div>
            <input
              type="url"
              id="website"
              className="w-full bg-[#2F2F2F] border border-[#2F2F2F] text-[#FFFFFF] rounded-md px-3 py-2"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://www.example.com"
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button type="button" onClick={handleNextStep}>
              Next
            </Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <MapPin className="h-4 w-4 mr-2 text-[#B967FF]" />
              <label htmlFor="address" className="text-[#ABABAB]">
                Address
              </label>
            </div>
            <input
              type="text"
              id="address"
              className="w-full bg-[#2F2F2F] border border-[#2F2F2F] text-[#FFFFFF] rounded-md px-3 py-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Business St, City, Country"
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <FileText className="h-4 w-4 mr-2 text-[#B967FF]" />
              <label htmlFor="description" className="text-[#ABABAB]">
                Description (Optional)
              </label>
            </div>
            <textarea
              id="description"
              className="w-full bg-[#2F2F2F] border border-[#2F2F2F] text-[#FFFFFF] rounded-md px-3 py-2 min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell candidates about your organization..."
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button type="button" onClick={() => setStep(1)} className="mr-2">
              Previous
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Complete Registration
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default OrganizationRegistration;