
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isAuthenticated?: boolean;
  userRole?: "admin" | "candidate";
  userImage?: string;
}

const Navbar = ({ 
  isAuthenticated = false, 
  userRole = "candidate",
  userImage = "" 
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const loc = useLocation();

  if(loc.pathname.includes("/dashboard")){
    return null;
  }
  
  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8",
        isScrolled || isAuthenticated 
          ? "bg-nexthire-black py-3 shadow-md" 
          : "bg-transparent py-5"
      )}
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <img src="./logo.png" alt="" className="w-14 h-14"/>
          <span className="text-xl font-bold text-white">NextHire</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {isAuthenticated ? (
            <>
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="bg-nexthire-light-gray rounded-full py-2 pl-10 pr-4 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-nexthire-purple"
                />
              </div>
              
              {/* Nav Links based on role */}
              <div className="flex items-center space-x-6">
                {userRole === "admin" ? (
                  <>
                    <Link to="/dashboard" className={cn("nav-link", location.pathname === "/dashboard" && "text-nexthire-purple")}>Dashboard</Link>
                    <Link to="/sessions" className={cn("nav-link", location.pathname === "/sessions" && "text-nexthire-purple")}>Sessions</Link>
                    <Link to="/candidates" className={cn("nav-link", location.pathname === "/candidates" && "text-nexthire-purple")}>Candidates</Link>
                    <Link to="/analytics" className={cn("nav-link", location.pathname === "/analytics" && "text-nexthire-purple")}>Analytics</Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className={cn("nav-link", location.pathname === "/dashboard" && "text-nexthire-purple")}>Dashboard</Link>
                    <Link to="/interviews" className={cn("nav-link", location.pathname === "/interviews" && "text-nexthire-purple")}>Interviews</Link>
                    <Link to="/tests" className={cn("nav-link", location.pathname === "/tests" && "text-nexthire-purple")}>Tests</Link>
                    <Link to="/resume" className={cn("nav-link", location.pathname === "/resume" && "text-nexthire-purple")}>Resume</Link>
                  </>
                )}
              </div>
              
              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <button className="relative">
                  <Bell className="h-5 w-5 text-white hover:text-nexthire-purple transition-colors" />
                  <span className="absolute -top-1 -right-1 bg-nexthire-purple text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">3</span>
                </button>
                
                <span className="text-white">{userRole === "admin" ? "Admin" : "User"}</span>
                
                <Link to="/profile">
                  {userImage ? (
                    <img 
                      src={userImage} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full border-2 border-nexthire-purple object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-nexthire-purple flex items-center justify-center text-white font-medium">
                      {userRole === "admin" ? "A" : "U"}
                    </div>
                  )}
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="button-primary border-[1px] p-2 px-4 border-zinct-600 rounded-lg hover:opacity-[.7] text-center hover:bg-[#B967FF]/20 hover:border-transparent cursor-pointer ">Login</Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-nexthire-dark-gray py-4 px-6 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            {isAuthenticated ? (
              <>
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="bg-nexthire-light-gray rounded-full py-2 pl-10 pr-4 w-full text-sm focus:outline-none focus:ring-2 focus:ring-nexthire-purple"
                  />
                </div>
                
                {userRole === "admin" ? (
                  <>
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <Link to="/sessions" className="nav-link">Sessions</Link>
                    <Link to="/candidates" className="nav-link">Candidates</Link>
                    <Link to="/analytics" className="nav-link">Analytics</Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <Link to="/interviews" className="nav-link">Interviews</Link>
                    <Link to="/tests" className="nav-link">Tests</Link>
                    <Link to="/resume" className="nav-link">Resume</Link>
                  </>
                )}
                
                <div className="pt-4 border-t border-nexthire-light-gray">
                  <div className="flex items-center space-x-3">
                    {userImage ? (
                      <img 
                        src={userImage} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full border-2 border-nexthire-purple object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-nexthire-purple flex items-center justify-center text-white font-medium">
                        {userRole === "admin" ? "A" : "U"}
                      </div>
                    )}
                    <span className="text-white">{userRole === "admin" ? "Admin" : "User"}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/features" className="nav-link">Features</Link>
                <Link to="/pricing" className="nav-link">Pricing</Link>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/contact" className="nav-link">Contact</Link>
                <div className="pt-4 flex flex-col space-y-2">
                  <Link to="/login" className="button-secondary w-full text-center">Login</Link>
                  <Link to="/login" className="button-primary w-full text-center">Sign Up</Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
