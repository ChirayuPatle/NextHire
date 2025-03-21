import Menubar from "@/menubar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar with a fixed width */}
      <Menubar  />

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center items-center h-full w-full bg-neutral-950 ml-[14rem] ">
        <div className="w-full"> 
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
