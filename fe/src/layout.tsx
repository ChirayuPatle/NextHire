import { Outlet } from "react-router-dom";
import Header from "./menubar";
import Footer from "./footer";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
