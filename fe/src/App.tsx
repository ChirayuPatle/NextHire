import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ManageAccount from "./pages/setting/manageSetting";

import AppLayout from "./layouts/dashboard-layout";
import UserLayout from "./layouts/UserLayout";
import SessionDetail from "./pages/admin/SessionDetail";
import Sessions from "./pages/admin/Sessions";
import AiChat from "./pages/aiChat";
import NextHireDashboard from "./pages/analysis";
import Login from "./pages/auth/page";
import CodeEditor from "./pages/code/code-editor";
import CreateProfile from "./pages/createProfile";
import Dashboard from "./pages/dashboard/dashboard";
import UserProfileCard from "./pages/display-profile";
import Home from "./pages/home";
import Quiz from "./pages/interRound1";
import Navbar from "./pages/navbar";
import Notifications from "./pages/notification";
import HelpPage from "./pages/setting/help";
import LocationSettings from "./pages/setting/location";
import PrivacySettings from "./pages/setting/privacy";
import Settings from "./pages/setting/setting";
import TeamChat from "./pages/teamChat";
import TeamDetails from "./pages/teamDetails";
import UserDashboard from "./pages/user/userDashboard";
import UserSession from "./pages/user/userSession";
import VideoRoom from "./pages/video/video-room";

import Registration from "./pages/registration";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CandidateRegistration from "./pages/CandidateRegistration";
import OrganizationRegistration from "./pages/OrganizationRegistration";

const Feedback = lazy(() => import("./pages/feedback"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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

        {/* Authentication Routes */}
        <Route path="/auth" element={<Login />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Registration />} />
        <Route path="/register/candidate" element={<CandidateRegistration />} />
        <Route path="/register/organization" element={<OrganizationRegistration />} />

        {/* Default pages */}
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/aichat" element={<AiChat />} />
        <Route path="/round/1" element={<Quiz />} />
        <Route path="/round/2" element={<CodeEditor />} />
        <Route path="/round/3" element={<VideoRoom />} />

        {/* Admin pages */}
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="team" element={<TeamDetails />} />
          <Route path="aichat" element={<AiChat />} />
          <Route path="analysis" element={<NextHireDashboard />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="teamchat" element={<TeamChat />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="sessions/:id" element={<SessionDetail />} />
        </Route>

        {/* Setting pages */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/manage-settings" element={<ManageAccount />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/privacy-settings" element={<PrivacySettings />} />
        <Route path="/location" element={<LocationSettings />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/view-profile" element={<UserProfileCard />} />

        {/* User pages */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="aichat" element={<AiChat />} />
          <Route path="user-session" element={<UserSession />} />
        </Route>

        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;