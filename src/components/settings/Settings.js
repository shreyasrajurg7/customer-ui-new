import { useState } from "react";
import "./Settings.css";
import UserAccess from "./userAccess/UserAccess";
import UserRoles from "./userRoles/UserRoles";

const Settings = () => {
  const [menu, setMenu] = useState("users");
  return (
    <div className="setting-root">
      <div className="setting-header">
        <span className="setting-header-name">User Selection</span>
        <span>Add User</span>
      </div>
      <div className="setting-content">
        <div className="setting-sidebar">
          <span
            className={
              menu === "users"
                ? "setting-sidebar-active-menu"
                : "setting-sidebar-in-active-menu"
            }
            onClick={() => setMenu("users")}
          >
            Manage User Access
          </span>
          <span
            className={
              menu === "roles"
                ? "setting-sidebar-active-menu"
                : "setting-sidebar-in-active-menu"
            }
            onClick={() => setMenu("roles")}
          >
            Manage User Roles
          </span>
          <span style={{ margin: "1vh" }}>Theme</span>
        </div>
        <div className="setting-inner-content">
          {menu === "users" ? <UserAccess /> : <UserRoles />}
        </div>
      </div>
    </div>
  );
};
export default Settings;
