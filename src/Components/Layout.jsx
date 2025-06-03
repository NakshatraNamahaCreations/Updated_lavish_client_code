import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navabar from "./Navabar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";


const Layout = () => {
  const location = useLocation();

  return (
    <div className="w-full overflow-hidden">
      <ScrollToTop />
      <Navabar />

      <Outlet />

      {location.pathname !== "/profile" && <Footer />}
    </div>
  );
};

export default Layout;
