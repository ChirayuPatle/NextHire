import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LayoutDashboard, Users, MessageSquare, BarChart, Settings } from "lucide-react";

const Menubar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button (Mobile Only) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-[14.5rem] p-5 space-y-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-w-[14.5rem]"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className="flex flex-row space-x-4">
          <img src="" alt="" className="w-8 h-8" />
          <h2 className="text-xl font-semibold">NEXTHIRE</h2>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="space-y-4">
            <SidebarItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <SidebarItem to="/teamdetail" icon={<Users size={20} />} label="Team" />
            <SidebarItem to="/teamchat" icon={<MessageSquare size={20} />} label="Chat" />
            <SidebarItem to="/analysis" icon={<BarChart size={20} />} label="Analysis" />
            <SidebarItem to="/setting" icon={<Settings size={20} />} label="Settings" />
          </ul>
        </nav>
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
const SidebarItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({
  to,
  icon,
  label,
}) => (
  <li>
    <Link to={to} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700">
      {icon}
      <span>{label}</span>
    </Link>
  </li>
);

export default Menubar;
