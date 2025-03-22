import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AppLayout from "./layouts/dashboard-layout";
import AiChat from "./pages/aiChat";
import NextHireDashboard from "./pages/analysis";
import CodeEditor from "./pages/code/code-editor";
import Dashboard, { CandidateDashboard } from "./pages/dashboard/dashboard";
import Home from "./pages/home";
import Quiz from "./pages/interRound1";
import Login from "./pages/auth/page";
import Navbar from "./pages/navbar";
import Notifications from "./pages/notification";
import Settings from "./pages/setting/setting";
import TeamChat from "./pages/teamChat";
import VideoRoom from "./pages/video/video-room";
import TeamDetails from "./pages/teamDetails";

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
      <Route path="/login" element={<Login />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/notification" element={<Notifications />} />
      <Route path="/setting" element={<Settings />} />
      <Route path="/aichat" element={<AiChat />} />
      <Route path="/round/1" element={<Quiz />} />
      <Route path="/round/2" element={<CodeEditor />} />
      <Route path="/round/3" element={<VideoRoom />} />

      {/* Dashboard Layout with Nested Routes */}
      {/* <Route path="/dashboard" element={<AppLayout />}>
        <Route index element={<TeamChat />} /> 
        <Route path="team" element={<TeamDetails />} />
        <Route path="settings" element={<Settings />} />
        <Route path="aichat" element={<AiChat />} />
        <Route path="analysis" element={<NextHireDashboard />} />
      </Route> */}


      <Route path="/dashboard" element={<AppLayout />} >
      <Route index  element={<Dashboard />} />
      <Route path="team" element={<TeamDetails />} />
        <Route path="aichat" element={<AiChat />} />
        <Route path="analysis" element={<NextHireDashboard />} />
        <Route path="notification" element={<Notifications />} />
        <Route path="teamchat" element={<TeamChat />} />
      </Route>  
        <Route path="/settings" element={<Settings />} />

      <Route path="/user-dashboard" element={<CandidateDashboard />} ></Route>

    </Routes>
  );
}

export default App;
