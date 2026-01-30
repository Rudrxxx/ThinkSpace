"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, Bell, Plus, User, Palette } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import CreatePostModal from "@/components/ui/CreatePostModal";

const Navbar = ({ onMenuClick, onPostCreated, onThemeClick }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <nav className="fixed top-4 left-4 right-4 z-50 rounded-2xl glass-panel border border-white/10 h-16 shadow-2xl shadow-primary/5">
            <div className="flex items-center justify-between h-full px-4 md:px-6">
                {/* Left: Logo & Menu */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onMenuClick}
                        className="p-2 hover:bg-white/10 rounded-full md:hidden transition-colors"
                    >
                        <Menu size={24} className="text-white" />
                    </button>
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            <img src="/logo.svg" alt="ThinkSpace" className="w-9 h-9 relative z-10 drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]" />
                        </div>
                        <span className="hidden md:block text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 group-hover:to-primary transition-all duration-300">
                            ThinkSpace
                        </span>
                    </Link>
                </div>

                {/* Center: Search Bar */}
                <div className="flex-1 max-w-2xl px-4 md:px-12">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-11 pr-4 py-2.5 rounded-full bg-black/20 border border-white/5 text-black placeholder-gray-400 focus:outline-none focus:bg-black/40 focus:border-primary/50 focus:shadow-[0_0_15px_rgba(0,243,255,0.1)] transition-all duration-300 backdrop-blur-md"
                            placeholder="Search the cosmos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 md:gap-6">
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/50 hover:border-primary hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] text-white font-medium transition-all duration-300 group"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span className="tracking-wide">Create</span>
                    </button>

                    <button onClick={onThemeClick} className="p-2.5 hover:bg-white/10 rounded-full text-gray-300 hover:text-white transition-all relative group">
                        <Palette size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                    </button>

                    <button className="p-2.5 hover:bg-white/10 rounded-full text-gray-300 hover:text-white transition-all relative group">
                        <Bell size={22} className="group-hover:animate-swing" />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_var(--color-accent)] animate-pulse"></span>
                    </button>

                    <div className="ml-2 pl-4 border-l border-white/10">
                        <UserButton
                            afterSignOutUrl="/sign-in"
                            appearance={{
                                elements: {
                                    avatarBox: "w-9 h-9 ring-2 ring-transparent hover:ring-primary transition-all duration-300"
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            <CreatePostModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onPostCreated={onPostCreated} />
        </nav>
    );
};

export default Navbar;
