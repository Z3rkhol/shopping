import React, { createContext, useState, useContext, useEffect } from 'react';
import './slider.css'

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeSwitch = () => {
    const { theme, toggleTheme } = useTheme();
    const isToggled = theme === 'dark';

    return (
        <label className="switch">
            <input
                type="checkbox"
                checked={isToggled}
                onChange={toggleTheme}
            />
            <span className="slider round"></span>
        </label>
    );
};