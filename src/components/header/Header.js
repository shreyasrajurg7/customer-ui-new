import React from "react";
import { useMenu } from "../common/menuContext/MenuContext";
import "./Header.css";

const Header = () => {
  const { selectedMenu } = useMenu();

  return (
    <div className="header-root">
      <div className="header-left">
        {selectedMenu} <hr className="gradient-line" />
      </div>
      <div className="header-right">
        Shreyas Raju
        <img className="header-user-icon" src="/icons/profile.svg" />
      </div>
    </div>
  );
};

export default Header;
