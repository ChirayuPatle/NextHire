import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "@/layout";
import Home from "@/pages/home";
import Feedback from "@/pages/feedback";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="feedback" element={<Feedback />} />
    </Route>
  )
);

export { Router };
