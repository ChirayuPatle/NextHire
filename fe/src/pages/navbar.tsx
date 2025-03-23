import { useState } from "react";
import { Bell, Menu, Search, User, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const loc = useLocation();

  console.log(loc)

  if(loc.pathname.includes("/")) {
    return null;
  }

  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <Link to={'/dashboard'}>
      <h1 className="text-2xl font-bold">NEXTHIRE</h1>
      </Link>

      <div className="hidden md:flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-white px-4 py-2 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        <Link to={'/notification'}>
        <Bell className="cursor-pointer hover:text-gray-400" size={24} />
        </Link>
        <Link to={'/create-profile'}>
        <User className="cursor-pointer hover:text-gray-400" size={24} />
        </Link>
      </div>

      <button className="md:hidden" onClick={() => setMenuOpen((prev) => !prev)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

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
          <Bell className="cursor-pointer hover:text-gray-400" size={24} />
          <User className="cursor-pointer hover:text-gray-400" size={24} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
