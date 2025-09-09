import React, {createContext,useState,useMemo,useCallback} from "react";


export const ThemeContext =  createContext(
    {theme : 'light',
    toggleTheme: () => {} 
});

export function ThemeProvider({ children }){
 const [theme, setTheme] = useState('light');
 const toggleTheme = useCallback(() => {
setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
 }, []);


const value = useMemo( () =>({theme,toggleTheme}), [theme,toggleTheme]);



 return <ThemeContext.Provider value={value} >{children}</ThemeContext.Provider>

}