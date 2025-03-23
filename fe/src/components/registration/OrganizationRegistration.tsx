
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "@/components/ui-custom/button";
import { useApp } from "@/context/AppContext";
import { ArrowLeft, BuildingIcon, Globe, MapPin, FileText } from "lucide-react";

interface OrganizationRegistrationProps {
  email: string;
  password: string;
  onBack: () => void;
}

const OrganizationRegistration = ({ email, password, onBack }: OrganizationRegistrationProps) => {
  const navigate = useNavigate();
  const { login } = useApp();
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Step 1 data
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  
  // Step 2 data
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
    // Validate step 1
    if (step === 1) {
      if (!name || !industry) {
        toast.error("Organization name and industry are required");
        return;
      }
      setStep(2);
      return;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate step 2
    if (!address) {
      toast.error("Address is required");
      return;
    }
    
    setIsLoading(true);
    
    // In a real app with Supabase, you would register the user here
    // For now, we'll simulate the registration process with a timeout
    setTimeout(async () => {
      try {
        // Create org object based on schema
        const orgData = {
          name,
          industry,
          website: website || null,
          address,
          description: description || null,
          details: {}
        };
        
        // Log the data that would be sent to Supabase
        console.log("Organization registration data:", {
          email,
          password,
          role: "ORGANIZATION",
          organization: orgData
        });
        
        // Simulate a successful registration
        const success = await login(email, password, "admin");
        
        if (success) {
          toast.success("Registration successful! Welcome to NextHire.");
          navigate("/dashboard");
        } else {
          throw new Error("Failed to log in after registration");
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };
  
  return (
    <div>
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <button 
            type="button"
            className="flex items-center text-nexthire-text-gray hover:text-white mr-4"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
          
          <div className="flex-1 flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-nexthire-purple" : "bg-nexthire-light-gray"
            } mr-2`}>
              <span className="text-white text-sm">1</span>
            </div>
            <div className={`h-1 flex-1 ${
              step > 1 ? "bg-nexthire-purple" : "bg-nexthire-light-gray"
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-nexthire-purple" : "bg-nexthire-light-gray"
            } ml-2`}>
              <span className="text-white text-sm">2</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Step 1: Basic Information */}
      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <BuildingIcon className="h-4 w-4 mr-2 text-nexthire-purple" />
              <label htmlFor="name" className="text-nexthire-text-gray">Organization Name</label>
            </div>
            <input
              type="text"
              id="name"
              className="input-field w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Acme Corporation"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="industry" className="block text-nexthire-text-gray mb-2">Industry</label>
            <select
              id="industry"
              className="input-field w-full"
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
              <Globe className="h-4 w-4 mr-2 text-nexthire-purple" />
              <label htmlFor="website" className="text-nexthire-text-gray">Website (Optional)</label>
            </div>
            <input
              type="url"
              id="website"
              className="input-field w-full"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://www.example.com"
            />
          </div>
          
          <div className="flex justify-end mt-6">
            <Button type="submit">
              Continue
            </Button>
          </div>
        </form>
      )}
      
      {/* Step 2: Additional Information */}
      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <MapPin className="h-4 w-4 mr-2 text-nexthire-purple" />
              <label htmlFor="address" className="text-nexthire-text-gray">Address</label>
            </div>
            <input
              type="text"
              id="address"
              className="input-field w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Business St, City, Country"
              required
            />
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <FileText className="h-4 w-4 mr-2 text-nexthire-purple" />
              <label htmlFor="description" className="text-nexthire-text-gray">Description (Optional)</label>
            </div>
            <textarea
              id="description"
              className="input-field w-full min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell candidates about your organization..."
            />
          </div>
          
          <div className="flex justify-between mt-6">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={handleBack}
            >
              Back
            </Button>
            <Button 
              type="submit"
              isLoading={isLoading}
            >
              Complete Registration
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default OrganizationRegistration;
