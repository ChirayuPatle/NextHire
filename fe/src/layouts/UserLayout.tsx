import UserMenubar from "@/pages/user/userMenubar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar with a fixed width */}
      <UserMenubar  />

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center items-center h-full w-full bg-neutral-950 md:ml-[14rem] ">
        <div className="w-full"> 
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
