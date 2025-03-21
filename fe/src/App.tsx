import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/ui/loader";
import AiChat from "./pages/aiChat";
import Home from "./pages/home";
import Header from "./menubar";
import Notifications from "./pages/notification";
import Navbar from "./pages/navbar";
import Login from "./pages/login";
import Settings from "./pages/setting";
import TeamChat from "./pages/teamChat";
import Layout from "@/layouts/dashboard-layout";
import CodeEditor from "./pages/code/code-editor";
import VideoRoom from "./pages/video/video-room";
import Quiz from "./pages/interRound1";
import About from "./pages/about";
import FeedbackPage from "./pages/feedback";
import Dashboard from "./pages/dashboard/dashboard";
import TeamDetails from "./pages/teamDetails";
import Analysis from "./pages/analysis";
import UserProfile from "./pages/userProfile";

// Lazy-loaded components
const Feedback = lazy(() => import("./pages/feedback"));
const FeedbackPage = lazy(() => import("./pages/feedback"));

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          
          {/* Video Room Route with roomId parameter */}
          <Route path="/room/:roomId?" element={<VideoRoom />} />
          
          {/* Coding and Assessment Routes */}
          <Route path="/code" element={<CodeEditor />} />
          <Route path="/roundone" element={<Quiz />} />
          
          {/* Communication Routes */}
          <Route path="/aichat" element={<AiChat />} />
          <Route path="/teamchat" element={<TeamChat />} />
          
          {/* Utility Routes */}
          <Route path="/header" element={<Header />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="/create-profile" element={<UserProfile />} />
          
          {/* Lazy-loaded Routes */}
          <Route path="/feedback" element={
            <Suspense fallback={<Loader />}>
              <Feedback />
            </Suspense>
          } />
          
          {/* Team Routes */}
          <Route path="/teamdetail" element={<TeamDetails />} />
          <Route path="/analysis" element={<Analysis />} />
          
          {/* Dashboard Routes - Nested Routes */}
          <Route path="/dashboard/*" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="team" element={<TeamDetails />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
            } />
            <Route path="/header" element={<Header/>}></Route>
            <Route path="/notification" element={<Notifications/>}></Route>
            <Route path="/navbar" element={<Navbar/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/setting" element={<Settings/>}></Route>
            <Route path="/aichat" element={<AiChat/>}></Route>
            <Route path="/teamchat" element={<TeamChat/>}></Route>
            <Route path="/feedback" element={<FeedbackPage />}></Route>
            <Route path="/code" element={<CodeEditor />} ></Route>
            <Route path="/room/:roomId" element={<VideoRoom />} ></Route>
            <Route path="/roundone" element={<Quiz />}></Route>
            <Route path="/home" element={<NextHire />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/teamdetail" element={<TeamDetails />}></Route>
            <Route path="/analysis" element={<Analysis />}></Route>
            <Route path="/create-profile" element={<UserProfile />}></Route>

            {/* Dashboard Routes */}
             <Route path="/dashboard/*" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="settings" element={<Settings />} />
                <Route path="team" element={<TeamDetails />} />
                <Route path="analysis" element={<Analysis />} />
                <Route path="profile" element={<UserProfile />} />
            </Route>
            
              

        </Routes>
      </main>
    </>
  );
}

export default App;