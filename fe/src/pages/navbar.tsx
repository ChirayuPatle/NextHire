import { Bell, Menu, Search, User, X } from "lucide-react";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <nav className="bg-neutral-950 text-white p-4 px-14 flex items-center justify-between">
      {/* Left: Brand Title */}
      <a href="/" className="flex items-center" >
      <img src="./logo.png" className="w-26" alt="NextHire Logo" />
      <h1 className="text-2xl font-bold">NextHire</h1>
      </a>

      {/* Right: Search Bar, Icons (Hidden on Mobile) */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-neutral-900 text-white px-4 py-2 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        {/* Notification & Profile Icons */}
      <a href="/notification">
        <Bell className="cursor-pointer hover:text-gray-400" size={24} />
      </a>
        <User className="cursor-pointer hover:text-gray-400" size={24} />
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setMenuOpen((prev) => !prev)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 text-white p-4 flex flex-col items-center space-y-4 md:hidden">
          <div className="relative w-full px-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <Search className="absolute left-7 top-2.5 text-gray-400" size={18} />
          </div>
          <a href="/notification">
          <Bell  className="cursor-pointer hover:text-gray-400" size={24} />
          </a>
          <User className="cursor-pointer hover:text-gray-400" size={24} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
