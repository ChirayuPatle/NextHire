import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "@/layout";
import Home from "@/pages/home";
import Header from "@/menubar";
import Feedback from "@/pages/feedback";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route index element={<Header />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="header" element={<Header />} />
    </Route>
  )
);

export { Router };
