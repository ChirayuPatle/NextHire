
import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarInset
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  CalendarDays, 
  BarChart3, 
  Settings, 
  LogOut, 
  Code, 
  VideoIcon,
  HelpCircle,
  Home,
  Mail
} from "lucide-react";
import { useApp } from '@/context/AppContext';
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useApp();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center px-2 py-4">
              <img src="/logo.svg" alt="NextHire Logo" className="h-10 w-10" />
              <span className="ml-2 text-xl font-bold text-white">NextHire</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive("/dashboard")} 
                  onClick={() => navigate("/dashboard")}
                  tooltip="Dashboard"
                  className={cn(
                    "transition-all duration-200 hover:bg-nexthire-purple/20",
                    isActive("/dashboard") && "bg-nexthire-purple/20 text-nexthire-purple"
                  )}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive("/sessions")} 
                  onClick={() => navigate("/sessions")}
                  tooltip="Sessions"
                  className={cn(
                    "transition-all duration-200 hover:bg-nexthire-purple/20",
                    isActive("/sessions") && "bg-nexthire-purple/20 text-nexthire-purple"
                  )}
                >
                  <CalendarDays className="h-5 w-5" />
                  <span>Sessions</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive("/candidates")} 
                  onClick={() => navigate("/candidates")}
                  tooltip="Candidates"
                  className={cn(
                    "transition-all duration-200 hover:bg-nexthire-purple/20",
                    isActive("/candidates") && "bg-nexthire-purple/20 text-nexthire-purple"
                  )}
                >
                  <Users className="h-5 w-5" />
                  <span>Candidates</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive("/analytics")} 
                  onClick={() => navigate("/analytics")}
                  tooltip="Analytics"
                  className={cn(
                    "transition-all duration-200 hover:bg-nexthire-purple/20",
                    isActive("/analytics") && "bg-nexthire-purple/20 text-nexthire-purple"
                  )}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive("/interviews")} 
                  onClick={() => navigate("/interviews")}
                  tooltip="Interviews"
                  className={cn(
                    "transition-all duration-200 hover:bg-nexthire-purple/20",
                    isActive("/interviews") && "bg-nexthire-purple/20 text-nexthire-purple"
                  )}
                >
                  <VideoIcon className="h-5 w-5" />
                  <span>Interviews</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive("/coding")} 
                  onClick={() => navigate("/coding")}
                  tooltip="Coding"
                  className={cn(
                    "transition-all duration-200 hover:bg-nexthire-purple/20",
                    isActive("/coding") && "bg-nexthire-purple/20 text-nexthire-purple"
                  )}
                >
                  <Code className="h-5 w-5" />
                  <span>Coding Tests</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive("/about")} 
                  onClick={() => navigate("/about")}
                  tooltip="About"
                  className={cn(
                    "transition-all duration-200 hover:bg-nexthire-purple/20",
                    isActive("/about") && "bg-nexthire-purple/20 text-nexthire-purple"
                  )}
                >
                  <HelpCircle className="h-5 w-5" />
                  <span>About</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive("/pricing")} 
                  onClick={() => navigate("/pricing")}
                  tooltip="Pricing"
                  className={cn(
                    "transition-all duration-200 hover:bg-nexthire-purple/20",
                    isActive("/pricing") && "bg-nexthire-purple/20 text-nexthire-purple"
                  )}
                >
                  <Home className="h-5 w-5" />
                  <span>Pricing</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive("/contact")} 
                  onClick={() => navigate("/contact")}
                  tooltip="Contact"
                  className={cn(
                    "transition-all duration-200 hover:bg-nexthire-purple/20",
                    isActive("/contact") && "bg-nexthire-purple/20 text-nexthire-purple"
                  )}
                >
                  <Mail className="h-5 w-5" />
                  <span>Contact</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate("/settings")}
                  tooltip="Settings"
                  className="transition-all duration-200 hover:bg-nexthire-purple/20"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  tooltip="Logout"
                  className="transition-all duration-200 hover:bg-red-500/20"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-nexthire-black overflow-auto">
          <div className="p-4">
            <SidebarTrigger className="mb-4" />
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
