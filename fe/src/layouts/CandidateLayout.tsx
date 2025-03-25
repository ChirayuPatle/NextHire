import { Outlet } from "react-router-dom";
import CandidateMenubar from "@/components/candidate/menubar";

const CandidateLayout = () => {
  return (
    <div className="flex h-screen w-full text-white bg-neutral-950">
      {/* Candidate Sidebar */}
      <CandidateMenubar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full w-full overflow-y-auto md:ml-[14rem]">
        <div className="w-full p-4 md:p-8"> 
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default CandidateLayout;