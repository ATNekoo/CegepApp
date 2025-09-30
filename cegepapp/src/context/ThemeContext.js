import React, { createContext, useState, useMemo, useCallback, useContext } from "react";

export const ThemeContext = createContext({
    theme: "dark",
    toggleTheme: () => { },
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
                textDim: "#706b5eff",
                accent: "#e9bb15ff",
                border: "#e9bb15ff",
                like: "#ff4c3bff"
            }
            : {
                background: "#323643",
                object: "#606470",
                text: "#f7f7f7",
                textDim: "#b3c6d7ff",
                accent: "#93deff",
                border: "#93deff",
                like: "#ff687fff"
            };
    }, [theme]);

    const value = useMemo(() => ({ theme, toggleTheme, colors }), [theme, toggleTheme, colors]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useStyleFactory = (stylaFactory) => {
    const theme = useContext(ThemeContext);
    return useMemo(() => stylaFactory(theme.colors), [theme.colors]);
}