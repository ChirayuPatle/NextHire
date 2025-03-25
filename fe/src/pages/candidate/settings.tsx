import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Settings, User } from "lucide-react";

const CandidateSettings = () => {
  const settingsSections = [
    {
      title: "Account Settings",
      icon: <User className="h-5 w-5 text-[#B967FF]" />,
      items: ["Personal Information", "Login & Security", "Email Preferences"]
    },
    {
      title: "Privacy",
      icon: <Settings className="h-5 w-5 text-[#B967FF]" />,
      items: ["Data Privacy", "Profile Visibility", "Communication Settings"]
    }
  ];

  return (
    <div className="text-white animate-[fade-in_0.3s_ease-out]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-[#ABABAB]">Manage your account preferences and privacy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsSections.map((section, index) => (
          <Card key={index} className="text-white bg-[#252525] border-none p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-[#B967FF]/20 p-2 rounded-full">
                {section.icon}
              </div>
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>
            
            <ul className="space-y-3">
              {section.items.map((item, i) => (
                <li key={i}>
                  <button className=" text-white w-full text-left p-3 rounded-md hover:bg-[#3a3a3a] transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card className="bg-[#252525] text-white  border-none p-6">
          <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
          <div className="flex flex-col space-y-4">
            <Button variant="destructive" className="w-full md:w-auto">
              Deactivate Account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CandidateSettings;