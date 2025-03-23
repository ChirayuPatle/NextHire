import { Route, Routes } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import CandidateRegistration from "@/pages/auth/CandidateRegistration";
import OrganizationRegistration from "@/pages/auth/OrganizationRegistration";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="register/candidate" element={<CandidateRegistration />} />
        <Route path="register/organization" element={<OrganizationRegistration />} />
      </Route>
    </Routes>
  );
}; 