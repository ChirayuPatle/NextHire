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
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const handleNext = () => {
    if (!name || !industry) {
      toast.error("Please fill in all required fields");
      return;
    }

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
    <div>
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <button
            type="button"
            className="flex items-center text-[#ABABAB] hover:text-[#FFFFFF] mr-4"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
          <div className="flex-1 flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? "bg-[#B967FF]" : "bg-[#2F2F2F]"
              } mr-2`}
            >
              <span className="text-[#FFFFFF] text-sm">1</span>
            </div>
            <div
              className={`h-1 flex-1 ${
                step > 1 ? "bg-[#B967FF]" : "bg-[#2F2F2F]"
              }`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? "bg-[#B967FF]" : "bg-[#2F2F2F]"
              } ml-2`}
            >
              <span className="text-[#FFFFFF] text-sm">2</span>
            </div>
          </div>
        </div>
      </div>

      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
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
            <Button type="submit">Continue</Button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit}>
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

          <div className="flex justify-between mt-6">
            <Button type="button" variant="ghost" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Complete Registration
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default OrganizationRegistration;