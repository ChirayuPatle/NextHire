import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ManageAccount from "./pages/setting/manageSetting";

import AppLayout from "./layouts/dashboard-layout";
import AiChat from "./pages/aiChat";
import NextHireDashboard from "./pages/analysis";
import CodeEditor from "./pages/code/code-editor";
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/home";
import Quiz from "./pages/interRound1";
import Login from "./pages/auth/page";
import Navbar from "./pages/navbar";
import Notifications from "./pages/notification";
import Settings from "./pages/setting/setting";
import TeamChat from "./pages/teamChat";
import VideoRoom from "./pages/video/video-room";
import TeamDetails from "./pages/teamDetails";
import PrivacySettings from "./pages/setting/privacy";
import HelpPage from "./pages/setting/help";
import LocationSettings from "./pages/setting/location";
import Sessions from "./pages/admin/Sessions";
import SessionDetail from "./pages/admin/SessionDetail";
import UserLayout from "./layouts/UserLayout";
import UserSession from "./pages/user/userSession";
import CreateProfile from "./pages/createProfile";
import UserProfileCard from "./pages/display-profile";
import UserDashboard from "./pages/user/userDashboard";
import UserMenubar from "./pages/user/userMenubar";


const Feedback = lazy(() => import("./pages/feedback"));

function App() {
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<Home />} />
      <Route 
        path="/feedback" 
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <Feedback />
          </Suspense>
        } 
      />
      {/* Default pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/notification" element={<Notifications />} />
      <Route path="/setting" element={<Settings />} />
      <Route path="/aichat" element={<AiChat />} />
      <Route path="/round/1" element={<Quiz />} />
      <Route path="/round/2" element={<CodeEditor />} />
      <Route path="/round/3" element={<VideoRoom />} />

      {/* Admin pages */}
      <Route path="/dashboard" element={<AppLayout />} >
      <Route index  element={<Dashboard />} />
      <Route path="team" element={<TeamDetails />} />
        <Route path="aichat" element={<AiChat />} />
        <Route path="analysis" element={<NextHireDashboard />} />
        <Route path="notification" element={<Notifications />} />
        <Route path="teamchat" element={<TeamChat />} />
        <Route path="sessions" element={<Sessions />} ></Route>
        <Route path="sessions/:id" element={<SessionDetail />} ></Route>
      </Route>  
        <Route path="/settings" element={<Settings />} />
        <Route path="/manage-settings" element={<ManageAccount />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/privacy-settings" element={<PrivacySettings />} />
        <Route path="/location" element={<LocationSettings />} />

      {/* Setting pages */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/manage-settings" element={<ManageAccount />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/privacy-settings" element={<PrivacySettings />} />
        <Route path="/location" element={<LocationSettings />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/view-profile" element={<UserProfileCard />} />
        <Route path="/user-menubar" element={<UserMenubar />} />


        {/* User pages */}
        <Route path="/user" element={<UserLayout />} >
          <Route index  element={<UserDashboard />} />
          <Route path="aichat" element={<AiChat />} />
          <Route path="user-session" element={<UserSession />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Route> 

      <Route path="/user-dashboard" element={<UserDashboard />} ></Route>

      {/* Recruitment Session Route */}

      

    </Routes>
  );
}

export default App;
