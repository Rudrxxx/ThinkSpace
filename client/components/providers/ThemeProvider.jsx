"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const themeBackgrounds = {
  space: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  ocean: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  sunset: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  forest: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  mountain: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  city: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  desert: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  aurora: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
  minimal: null
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('space');

  useEffect(() => {
    const saved = localStorage.getItem('thinkspace-theme');
    if (saved) setCurrentTheme(saved);
  }, []);

  const changeTheme = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem('thinkspace-theme', themeId);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themeBackgrounds }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};