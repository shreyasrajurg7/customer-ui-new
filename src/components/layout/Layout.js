import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import "./Layout.css";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import Content from "../content/Content";
import Footer from "../footer/Footer";

const Layout = () => {
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Check if the current route is "/"
  const isHomeRoute = location.pathname === "/";

  return (
    <div className="layout-root">
      {!isHomeRoute && <Sidebar setIsAuthenticated={setIsAuthenticated} />}
      <div className="layout-content">
        {!isHomeRoute && <Header />}
        <Content isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        {!isHomeRoute && <Footer />}
      </div>
    </div>
  );
};

export default Layout;
