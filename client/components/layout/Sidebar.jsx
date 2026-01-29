"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Zap, Compass, Users, User, Settings, LogOut, LogIn, UserPlus, MessageCircle, ChevronDown, ChevronRight, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { SignOutButton, useUser } from "@clerk/nextjs";

const SidebarSection = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest hover:text-primary transition-colors duration-300"
            >
                <span>{title}</span>
                {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-1"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SidebarItem = ({ icon: Icon, label, href, isActive }) => (
    <Link href={href}>
        <div className={cn(
            "group flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl transition-all duration-300 relative overflow-hidden",
            isActive
                ? "bg-primary/10 text-primary shadow-[inset_0_0_10px_rgba(0,243,255,0.05)] border border-primary/20"
                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
        )}>
            {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_var(--color-primary)]"></div>
            )}
            <Icon size={20} className={cn(
                "transition-colors duration-300",
                isActive ? "text-primary drop-shadow-[0_0_5px_var(--color-primary)]" : "text-gray-500 group-hover:text-white"
            )} />
            <span className={cn("font-medium relative z-10", isActive && "font-semibold")}>{label}</span>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
    </Link>
);

const Sidebar = ({ isOpen, onClose }) => {
    const pathname = usePathname();
    const { isSignedIn } = useUser();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={cn(
                "fixed left-4 top-24 bottom-4 w-[260px] rounded-2xl glass-panel border border-white/10 overflow-hidden z-40 transition-transform duration-300 ease-in-out md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-[120%]"
            )}>
                <div className="h-full overflow-y-auto py-6 px-3 scrollbar-hide">
                    <SidebarSection title="Feeds">
                        <SidebarItem icon={Home} label="Home" href="/" isActive={pathname === "/"} />
                        <SidebarItem icon={Zap} label="Sparks" href="/sparks" isActive={pathname === "/sparks"} />
                    </SidebarSection>

                    <SidebarSection title="Topics">
                        <SidebarItem icon={Compass} label="Explore" href="/explore" isActive={pathname === "/explore"} />
                        <SidebarItem icon={MessageCircle} label="Discussions" href="/messages" isActive={pathname === "/messages"} />
                        <SidebarItem icon={Users} label="Communities" href="/community" isActive={pathname === "/community"} />
                    </SidebarSection>

                    <SidebarSection title="Resources">
                        <SidebarItem icon={User} label="Profile" href="/profile" isActive={pathname === "/profile"} />
                        <SidebarItem icon={Settings} label="Settings" href="/settings" isActive={pathname === "/settings"} />
                    </SidebarSection>

                    <div className="mt-8 px-2 pt-6 border-t border-white/10">
                        {isSignedIn ? (
                            <SignOutButton>
                                <button className="group flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-red-500/10 rounded-xl transition-all duration-300">
                                    <LogOut size={20} className="group-hover:text-red-400 transition-colors" />
                                    <span>Log Out</span>
                                </button>
                            </SignOutButton>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Link href="/sign-in" className="w-full py-2.5 text-center text-sm font-bold text-black bg-primary rounded-xl hover:shadow-[0_0_15px_var(--color-primary)] transition-all duration-300">
                                    Log In
                                </Link>
                                <Link href="/sign-up" className="w-full py-2.5 text-center text-sm font-bold text-primary border border-primary/50 rounded-xl hover:bg-primary/10 transition-colors">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
