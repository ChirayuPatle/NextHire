import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/ui/loader";
import Home from "./pages/home";
import Header from "./header";
import Notifications from "./pages/notification";
import Navbar from "./pages/navbar";
import Login from "./pages/login";
import Settings from "./pages/setting";
import AiChat from "./pages/aiChat";
import TeamChat from "./pages/teamChat";

const Feedback = lazy(() => import("./pages/feedback"));

function App() {
  return (
      <Router>
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
        </Routes>
      </Router>   
  )
}

export default App
