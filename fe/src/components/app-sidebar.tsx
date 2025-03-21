import {
  BarChart2,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users
} from "lucide-react";
import { useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavLink } from "react-router-dom";
import { useState } from "react";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Team", url: "/dashboard/team", icon: Users },
  { title: "Chat", url: "/dashboard/chat", icon: MessageSquare },
  { title: "Analysis", url: "/dashboard/analysis", icon: BarChart2 },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true); 

  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };
    
    return ( <Sidebar className={`h-screen w-64 text-white ${isOpen ? "block" : "hidden"} md:block`}>
      <SidebarContent className="p-4 bg-neutral-950">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg text-white font-semibold tracking-wide">
            NextHire
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4 space-y-2">
              {menuItems.map((item) => {
                const isActive = 
                  item.url === "/dashboard"
                    ? location.pathname === "/dashboard"
                    : location.pathname.startsWith(item.url) && item.url !== "/dashboard";

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url}
                        className={`flex items-center gap-3 p-2 rounded-lg transition-colors duration-300 
                          ${isActive ? "bg-gray-200 text-black font-semibold" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
                        onClick={handleMenuClick} // Close sidebar on mobile click
                      >
                        <item.icon className={`w-5 h-5 transition-colors duration-300 
                          ${isActive ? "text-black" : "text-gray-500 group-hover:text-white"}`} />
                        <span className="text-sm">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
