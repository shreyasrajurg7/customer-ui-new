// MenuContext.js
import React, { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export function useMenu() {
  return useContext(MenuContext);
}

export function MenuProvider({ children }) {
  const [selectedMenu, setSelectedMenu] = useState("Home");

  const selectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <MenuContext.Provider value={{ selectedMenu, selectMenu }}>
      {children}
    </MenuContext.Provider>
  );
}
