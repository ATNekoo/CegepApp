import React, { createContext, useState, useMemo, useCallback } from "react";

export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
  colors: {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const colors = useMemo(() => {
    return theme === "light"
      ? {
          background: "#faf6e9",
          object: "#ece8d9",
          text: "#494949",
          accent: "#fffdf6",
          border: "#fffdf6",
        }
      : {
          background: "#323643",
          object: "#606470",
          text: "#f7f7f7",
          accent: "#93deff",
          border: "#93deff",
        };
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme, colors }), [theme, toggleTheme, colors]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
