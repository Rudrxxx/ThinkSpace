"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../providers/ThemeProvider";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ThemeSelector from "../ui/ThemeSelector";

const MainLayout = ({ children, onPostCreated }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
    const { currentTheme, changeTheme, themeBackgrounds } = useTheme();

    return (
        <div className="min-h-screen relative">
            {/* Theme-based Background */}
            {themeBackgrounds[currentTheme] && (
                <div 
                    className="fixed inset-0 z-[-10] bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${themeBackgrounds[currentTheme]})`,
                    }}
                />
            )}
            
            {/* Dark Overlay */}
            <div className="fixed inset-0 z-[-9] bg-black/60" />

            {/* Simplified Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
                <motion.div 
                    className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,0,255,0.1) 0%, transparent 70%)',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                
                <motion.div 
                    className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[100px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%)',
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.08, 0.15, 0.08],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />
            </div>

            <Navbar 
                onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                onPostCreated={onPostCreated}
                onThemeClick={() => setIsThemeSelectorOpen(true)}
            />

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <ThemeSelector
                isOpen={isThemeSelectorOpen}
                onClose={() => setIsThemeSelectorOpen(false)}
                onThemeChange={changeTheme}
            />

            <main className="pt-20 md:pl-[280px] min-h-screen transition-all duration-300 relative z-10">
                <div className="max-w-[1280px] mx-auto p-4 md:p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default MainLayout;