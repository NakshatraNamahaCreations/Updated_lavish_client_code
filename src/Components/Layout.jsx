import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navabar from "./Navabar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

// import GlobalPurchasePopups from "./GlobalPurchasePopups"; // Import popups

const Layout = () => {
  const location = useLocation();

  return (
    <div className="w-full overflow-hidden">
      <ScrollToTop />
      <Navabar />

      {/* All page content will be rendered here */}
      <Outlet />

      {location.pathname !== "/profile" && <Footer />}
    </div>
  );
};

export default Layout;
