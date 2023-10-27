import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

import { useMenu } from "../common/menuContext/MenuContext";
import { useTheme } from "../../ThemeContext";
import Button from "../common/button/Button";
import { useLogout } from "../../utils/hooks";
const Sidebar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedMenu, selectMenu } = useMenu();

  const navigateTo = (route, menu) => {
    navigate(route);
    selectMenu(menu);
  };

  const logout = useLogout();
  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  const { getSelectedTheme, toggleTheme } = useTheme();
  const theme = getSelectedTheme();

  return (
    <div
      className="sidebar-root"
      style={{ backgroundColor: theme.sidebar, color: theme.textColor }}
    >
      <img
        className="sidebar-logo"
        src="/icons/voice-care-logo.svg"
        onClick={() => toggleTheme()}
      />
      <span className="sidebar-menu-text">Menu</span>
      <div className="sidebar-menu-items">
        <div
          className={
            location.pathname === "/home"
              ? "sidebar-active-menu"
              : "sidebar-in-active-menu"
          }
          onClick={() => navigateTo("/home", "Home")}
        >
          <img className="sidebar-home-icon" src="/icons/home-icon.svg" />
          Home
        </div>
        <div
          className={
            location.pathname === "/call-automation"
              ? "sidebar-active-menu"
              : "sidebar-in-active-menu"
          }
          onClick={() => navigateTo("/call-automation", "Call Automation")}
        >
          <img className="sidebar-home-icon" src="/icons/call-automation.svg" />
          Call Automation
        </div>
        <div
          className={
            location.pathname === "/call-history"
              ? "sidebar-active-menu"
              : "sidebar-in-active-menu"
          }
          onClick={() => navigateTo("/call-history", "Call History")}
        >
          <img className="sidebar-home-icon" src="/icons/call-history.svg" />
          Call History
        </div>
        <div
          className={
            location.pathname === "/analytics"
              ? "sidebar-active-menu"
              : "sidebar-in-active-menu"
          }
          onClick={() => navigateTo("/analytics", "Analytics")}
        >
          <img className="sidebar-home-icon2" src="/icons/analytics.svg" />
          Analytics
        </div>
        <div
          className={
            location.pathname === "/settings"
              ? "sidebar-active-menu"
              : "sidebar-in-active-menu"
          }
          onClick={() => navigateTo("/settings", "Settings")}
        >
          <img className="sidebar-home-icon2" src="/icons/settings.svg" />
          Settings
        </div>
        <div style={{ marginTop: "42vh", marginLeft: "2vh" }}>
          <Button
            label="Log Out"
            color={"#ff4e3a"}
            width={"20vh"}
            height={"4vh"}
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
