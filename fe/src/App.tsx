import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/ui/loader";
import Home from "./pages/home";

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
        </Routes>
      </Router>   
  )
}

export default App
