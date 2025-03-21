import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom"; 

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-4">
          <SidebarTrigger className="mb-4" />
            <div className="px-2 md:px-10">
          <Outlet /> 
            </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
