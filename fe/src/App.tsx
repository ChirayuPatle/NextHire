import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/ui/loader";
import AiChat from "./pages/aiChat";
import Home from "./pages/home";
import Header from "./header";
import Notifications from "./pages/notification";
import Navbar from "./pages/navbar";
import Login from "./pages/login";
import Settings from "./pages/setting";
import TeamChat from "./pages/teamChat";

import CodeEditor from "./pages/code/code-editor";
import VideoRoom from "./pages/video/video-room";
import Quiz from "./pages/interRound1";
import NextHire from "./pages/home";
import About from "./pages/about";
import FeedbackPage from "./pages/feedback";
import Dashboard from "./pages/dashboard";
import TeamDetails from "./pages/teamDetails";
import Analysis from "./pages/analysis";
import UserProfile from "./pages/userProfile";


const Feedback = lazy(() => import("./pages/feedback"));

function App() {
  return (
    <>
    <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}  />
          <Route path="/feedback" element={
            <Suspense fallback={<Loader />}>
              <Feedback />
            </Suspense>
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
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/teamdetail" element={<TeamDetails />}></Route>
            <Route path="/analysis" element={<Analysis />}></Route>
            <Route path="/create-profile" element={<UserProfile />}></Route>
        </Routes>
        </>
  )
}

export default App;
