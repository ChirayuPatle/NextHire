import { BookOpen, Briefcase, FileText, LayoutDashboard, Menu, Settings, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const CandidateMenubar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-neutral-800 text-white p-2 rounded-md hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-neutral-900 text-white w-[14.5rem] p-5 space-y-6 flex flex-col justify-between transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="flex flex-row items-center space-x-2 mb-8">
            <div className="p-2 rounded-lg">
              <img src="./logo.png" className="size-12" alt="" />
            </div>
            <h2 className="text-xl font-semibold">NextHire</h2>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="space-y-2">
              <SidebarItem 
                to="/candidate" 
                icon={<LayoutDashboard size={20} />} 
                label="Dashboard" 
                isActive={location.pathname === "/candidate"} 
              />
              <SidebarItem 
                to="/candidate/profile" 
                icon={<User size={20} />} 
                label="Profile" 
                isActive={location.pathname.includes("/candidate/profile")} 
              />
              <SidebarItem 
                to="/candidate/applications" 
                icon={<FileText size={20} />} 
                label="Applications" 
                isActive={location.pathname.includes("/candidate/applications")} 
              />
              <SidebarItem 
                to="/candidate/interviews" 
                icon={<Briefcase size={20} />} 
                label="Interviews" 
                isActive={location.pathname.includes("/candidate/interviews")} 
              />
              <SidebarItem 
                to="/candidate/assessments" 
                icon={<BookOpen size={20} />} 
                label="Assessments" 
                isActive={location.pathname.includes("/candidate/assessments")} 
              />
              <SidebarItem 
                to="/candidate/settings" 
                icon={<Settings size={20} />} 
                label="Settings" 
                isActive={location.pathname.includes("/candidate/settings")} 
              />
            </ul>
          </nav>
        </div>

        {/* Profile Section */}
        <div className="pb-4">
          <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-neutral-800 transition-colors">
            <div className="bg-[#B967FF]/20 p-2 rounded-full">
              <User className="h-5 w-5 text-[#B967FF]" />
            </div>
            <span className="text-sm">My Account</span>
          </div>
        </div>
      </aside>

      {/* Overlay (only for mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

// Sidebar Item Component
const SidebarItem = ({ to, icon, label, isActive }: { 
  to: string; 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean 
}) => {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center space-x-3 p-3 rounded-md transition-all duration-200 ${
          isActive
            ? "bg-[#B967FF]/10 text-[#B967FF] font-medium"
            : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
        }`}
      >
        <div className={`p-1 rounded-full ${isActive ? "text-[#B967FF]" : "text-neutral-400"}`}>
          {icon}
        </div>
        <span className="text-sm">{label}</span>
      </Link>
    </li>
  );
};

export default CandidateMenubar;