<<<<<<< HEAD

import { BarChart, LayoutDashboard, Menu, MessageCircleCode, MessageSquare, Settings, Users, X, ChartBar, User } from "lucide-react";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import chat from '../public/chat.png'
import logo from '../public/logo.png'
=======
import { BarChart, LayoutDashboard, Menu, MessageCircleCode, MessageSquare, Settings, Users, X, ChartBar, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../public/logo.png';
import chat from '../public/chat.png';
>>>>>>> a6ae3ed (WIP)

const Menubar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
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
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="flex flex-row items-center">
            <img src={logo} alt="" className="size-14 w-16" />
            <h2 className="text-xl font-semibold">NEXTHIRE</h2>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="space-y-4">
              <SidebarItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" isActive={location.pathname === "/dashboard"} />
              <SidebarItem to="/dashboard/team" icon={<Users size={20} />} label="Candidates" isActive={location.pathname === "/dashboard/team"} />
              <SidebarItem to="/dashboard/analysis" icon={<BarChart size={20} />} label="Analysis" isActive={location.pathname === "/dashboard/analysis"} />
              {/* <SidebarItem to="/dashboard/aichat" icon={<ChartBar size={20} />} label="Aichat" isActive={location.pathname === "/dashboard/aichat"} /> */}
              <SidebarItem to="/settings" icon={<Settings size={20} />} label="Settings" isActive={location.pathname === "/dashboard/settings"} />
            </ul>
          </nav>
        </div>

        {/* Profile & AI Chat Section */}
        <div className="space-y-4">
          {/* Profile Image */}
          <Link to={'/aichat'}>
<<<<<<< HEAD
          <div className="flex flex-col space-y-2">
            <img src={chat} alt="Profile" className="w-12 h-12" />
          </div>
          </Link>
          {/* Profile Section */}
          <SidebarItem to="/view-profile" icon={<User size={20} />} label="Profile" isActive={location.pathname === "/profile"} />
=======
          <div className="flex flex-col items-center space-y-2">
            <img src={chat} alt="Profile" className="w-16 h-16" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition">Next AI</button>
          </div>
          </Link>
          
          {/* Profile Section */}
          <SidebarItem to="/profile" icon={<User size={20} />} label="Profile" isActive={location.pathname === "/profile"} />
>>>>>>> a6ae3ed (WIP)
        </div>
      </aside>

      {/* Overlay (only for mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

// Sidebar Item Component
const SidebarItem: React.FC<{ to: string; icon: React.ReactNode; label: string; isActive: boolean }> = ({
  to,
  icon,
  label,
  isActive,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={to}
        className={`flex items-center space-x-3 p-2 rounded-md transition-all duration-200 ${
          isActive
            ? "bg-neutral-800 text-white font-semibold"
            : "text-neutral-300 hover:bg-neutral-700 hover:text-white focus:bg-neutral-700 focus:text-white"
        } ${isHovered ? "glow-effect" : ""}`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default Menubar;
