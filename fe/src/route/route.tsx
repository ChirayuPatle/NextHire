import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "@/layout";
import { Route } from "react-router-dom";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* <Route index element={<Home />} />{" "} */}
      {/* <Route path="menu" element={<Menu />} />
      <Route path="dashboard" element={<Dashboard />} /> */}
    </Route>,
  ),
);

export { Router };
