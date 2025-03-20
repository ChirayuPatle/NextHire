import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/ui/loader";
import Header from "./header";
import AiChat from "./pages/aiChat";
import Home from "./pages/home";
import Login from "./pages/login";
import Navbar from "./pages/navbar";
import Notifications from "./pages/notification";
import Settings from "./pages/setting";
import TeamChat from "./pages/teamChat";

import CodeEditor from "./pages/code/code-editor";
import FeedbackPage from "./pages/feedback";
import VideoRoom from "./pages/video/video-room";


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
        </Routes>
      </>   
  )
}

export default App;
