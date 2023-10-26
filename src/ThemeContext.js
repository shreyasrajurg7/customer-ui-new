// ThemeContext.js
import React, { createContext, useContext, useState } from "react";
import { darkTheme, lightTheme } from "./utils/Themes"; // Replace 'yourThemeFile' with the actual path to your theme file

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  
  const [batchId, setBatchId] = useState("");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const selectedTheme = theme === "light" ? lightTheme : darkTheme;

  const getSelectedTheme = () => {
    return selectedTheme;
  };

  const themeData = {
    theme,
    toggleTheme,
    getSelectedTheme,
    batchId,
    setBatchId
  };

  return (
    <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
  );
}
